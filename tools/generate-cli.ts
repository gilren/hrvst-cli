import fs from "fs";
import _ from "lodash";
import path from "path";
import postman from "postman-collection";
import type {
  CollectionDefinition,
  ItemDefinition,
  ItemGroupDefinition,
  QueryParamDefinition,
  RequestDefinition,
  UrlDefinition,
  VariableDefinition,
} from "postman-collection";
import { format } from "prettier";
import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";
import { urlArgOptions } from "../src/utils/postman-request-command.js";
import descriptions from "./descriptions.js";

type CommandDictionary = Record<string, string>;

const commandsDir = path.join("src", "generated-commands");
const docsDir = path.join("docs", "generated-commands");
const readmeTemplate = path.join("tools", "README-template.md");

const FILE_HEADER = `/**
 * This file was generated by running \`npm run generate\` and should NOT be modified.
 */`;

yargs(hideBin(process.argv))
  .command<Arguments<{ postmanExportFile: string }>>(
    "$0 <postman-export-file>",
    "Generate yargs commands from a Postman Collection v2.1 export",
    (yargs) => {
      return yargs.positional("postman-export-file", {
        demandOption: true,
        description: "Path to Postman Collection v2.1 export file",
      });
    },
    async ({ postmanExportFile }) => {
      // Parse Postman export file
      const exportContent = await fs.promises.readFile(
        postmanExportFile,
        "utf-8"
      );
      const collection: CollectionDefinition = JSON.parse(exportContent);

      // Store command -> docs link
      const commandDictionary: CommandDictionary = {
        // These are custom commands
        "hrvst alias create &lt;alias&gt;":
          "docs/commands/Alias.md#create-an-alias",
        "hrvst alias delete &lt;alias&gt;":
          "docs/commands/Alias.md#delete-an-alias",
        "hrvst alias list": "docs/commands/Alias.md#list-all-aliases",
        "hrvst completion": "docs/commands/Completion.md",
        "hrvst log &lt;hours&gt; [alias]":
          "docs/commands/TimeTracking.md#log-time",
        "hrvst login": "docs/commands/Login.md",
        "hrvst note": "docs/commands/TimeTracking.md#update-notes-for-a-timer",
        "hrvst open": "docs/commands/Open.md",
        "hrvst open accounts": "docs/commands/Open.md#accounts",
        "hrvst open api": "docs/commands/Open.md#api-documentation",
        "hrvst open expenses": "docs/commands/Open.md#expenses",
        "hrvst open profile": "docs/commands/Open.md#profile",
        "hrvst open reports": "docs/commands/Open.md#reports",
        "hrvst open time": "docs/commands/Open.md#time",
        "hrvst start [alias]": "docs/commands/TimeTracking.md#start-a-timer",
        "hrvst stop": "docs/commands/TimeTracking.md#stop-a-timer",
        // Generated commands will be added to this object below
      };

      // Clean and recreate directories for generated docs and commands
      for (const dir of [commandsDir, docsDir]) {
        await fs.promises.rm(dir, { force: true, recursive: true });
        await mkdir(dir);
      }
      await fs.promises.rm("README.md", { force: true });

      if (collection.item) {
        for (const item of collection.item) {
          // Generate commands
          await createCommandModule(item);

          // Generate docs
          Object.assign(commandDictionary, await createDocs(item));
        }
      }

      // Update the main readme to include the command dictionary
      await updateReadme(commandDictionary);

      await createCommandBarrels(path.join("src", "commands"));
      await createCommandBarrels(commandsDir);
    }
  )
  .demandCommand()
  .strict()
  .version(false).argv;

/**
 * Creates an `index.ts` file export all commands in a directory. This is
 * needed to support the ESM pattern needed for yargs.
 *
 * @param dir Directory to recursively create barrels
 */
async function createCommandBarrels(dir: string) {
  const files = await fs.promises.readdir(dir);

  const commands = [];
  for (const file of files) {
    if (file.match(/\.ts$/)) {
      if (file !== "index.ts") {
        commands.push(file.replace(/\.ts$/, ""));
      }
    } else {
      await createCommandBarrels(path.join(dir, file));
    }
  }

  await writeFile(
    path.resolve(dir, "index.ts"),
    `${FILE_HEADER}
      ${commands.map((c, i) => `import * as c${i} from "./${c}"`).join("\n")}
      export const commands = [${commands.map((c, i) => `c${i}`).join()}];`,
    true
  );
}

/**
 * Generates yargs command modules for a Postman collection item
 *
 * @param item Postman item
 * @param parentItem Parent of `item`
 * @param currentDir Current command path
 */
async function createCommandModule(
  item: ItemDefinition | ItemGroupDefinition,
  parentItem?: ItemDefinition | ItemGroupDefinition,
  currentDir: string = commandsDir
): Promise<void> {
  const name = commandName(item, parentItem);
  const commandPath = path.join(currentDir, name);

  if ("request" in item && item.request) {
    // Create command module for endpoint
    await writeFile(
      path.join(currentDir, `${name}.ts`),
      commandModule(name, item.request, path.relative(currentDir, "src"))
    );
  } else if ("item" in item && item.item?.length) {
    // Create command directory
    await mkdir(commandPath);

    // Create command module that registers the command directory
    await writeFile(
      path.join(currentDir, `${name}.ts`),
      commandDirModule(name, item.description as string)
    );

    // Recursively generate commands for nested endpoints
    for (const i of item.item) {
      await createCommandModule(i, item, commandPath);
    }
  }
}

/**
 * Generates CLI documentation for a Postman collection item
 *
 * @param item Postman item
 * @param parentItem Parent of `item`
 * @param commands Parent command names in hierarchical order
 * @param currentDir Current command path
 */
async function createDocs(
  item: ItemDefinition | ItemGroupDefinition,
  parentItem?: ItemDefinition | ItemGroupDefinition,
  commands: string[] = [],
  currentDir: string = docsDir
): Promise<CommandDictionary> {
  const name = commandName(item, parentItem);
  const commandPath = path.join(currentDir, name);
  const filename = (name: string) => `${_.upperFirst(_.camelCase(name))}.md`;
  const commandDictionary: CommandDictionary = {};
  const itemCommands: Record<string, ItemDefinition> = {};

  if ("item" in item && item.item?.length) {
    let content = `# ${item.name}\n${item.description}`;

    commands.push(name);

    for (const i of item.item) {
      if ("request" in i && i.request) {
        const options = urlArgOptions(new postman.Url(i.request.url));
        const cmd = `hrvst ${commands.join(" ")} ${commandName(i, item)}`;
        itemCommands[cmd] = i;

        content += `\n## ${i.name}\n${i.request.description}`;
        content += `\n\`\`\`\n${cmd}\n\`\`\``;

        if (Object.keys(options).length) {
          content += markdownTable(
            ["Option", "Description", "Required"],
            Object.keys(options).map((key) => [
              `\`--${key}\``,
              options[key].describe?.trim(),
              !!options[key].demandOption,
            ])
          );
        }
      } else {
        await mkdir(commandPath);
        Object.assign(
          commandDictionary,
          await createDocs(i, item, [...commands], commandPath)
        );
      }
    }

    if (content.length) {
      const docsPath = path.join(currentDir, filename(name));
      for (const command in itemCommands) {
        commandDictionary[command] = `${docsPath}#${_.kebabCase(
          itemCommands[command].name
        )}`;
      }
      await writeFile(docsPath, content);
    }
  }

  return commandDictionary;
}

/**
 * Substitute variables in tools/README-template.md and copy to the root of the
 * projects as README.md
 *
 * @param dictionary Map of command to documentation link
 */
async function updateReadme(dictionary: CommandDictionary): Promise<void> {
  const sortedCommands = Object.keys(dictionary).sort((a, b) => {
    const aParts = a.split(" ");
    const bParts = b.split(" ");
    const aLastPositional = aParts.length > 2 ? aParts.pop() || "" : "";
    const bLastPositional = bParts.length > 2 ? bParts.pop() || "" : "";
    const aLength = aParts.length;
    const bLength = bParts.length;

    if (aLength == bLength) {
      for (let i = 1; i < aLength; i++) {
        const compare = aParts[i].localeCompare(bParts[i]);
        if (compare != 0) {
          return compare;
        }
      }
    }

    return (
      aParts.join().localeCompare(bParts.join()) ||
      aLastPositional.localeCompare(bLastPositional)
    );
  });

  const content = sortedCommands
    .map((c) => `<a href="/${dictionary[c]}">${c}</a>`)
    .join("\n");
  const readme = await fs.promises.readFile(readmeTemplate, "utf-8");
  await writeFile(
    "README.md",
    readme.replace("{{COMMAND_DICTIONARY}}", content)
  );
}

/**
 * Returns file content for command module that registers a command directory
 *
 * @param name Command name
 * @param description  Command description
 * @returns File content
 */
const commandDirModule = (
  name: string,
  description = ""
): string => `${FILE_HEADER}
import { CommandBuilder } from 'yargs';
import { commands } from './${name}/index';
export const command = '${name} <command>';
export const description = \`${description.split("\n")[0]}\`;
export const builder: CommandBuilder = (yargs) =>
  yargs
    .command(commands)
    .demandCommand()
    .recommendCommands()
    .strictCommands()
    .version(false);
`;

/**
 * Returns file content for command module to make an API request
 *
 * @param name Command name
 * @param request Postman request definition
 * @param relativeSrc Relative path to src to use for imports
 * @returns File content
 */
const commandModule = (
  name: string,
  request: RequestDefinition & { url: UrlDefinition },
  relativeSrc: string
): string => `${FILE_HEADER}
import postmanRequestCommand, { Request } from "${relativeSrc}/utils/postman-request-command";

export const request: Request = ${JSON.stringify({
  method: request.method,
  url: ((r) => {
    const prepareParams = (
      variables?: QueryParamDefinition[] | VariableDefinition[]
    ) =>
      variables?.forEach((v: QueryParamDefinition | VariableDefinition) => {
        // Remove dummy values
        v.value = "";

        // Override description
        if (v.key && v.key in descriptions) {
          v.description = descriptions[v.key];
        }
      });
    prepareParams(r.url.query as QueryParamDefinition[]);
    prepareParams(r.url.variable);
    return _.omit(r.url, "raw");
  })(request),
})};
export const { command, aliases, describe, builder, handler } = postmanRequestCommand({
  command: '${name}',
  describe: '${(request.description as string).split(".")[0]}',
  request,
});
`;

/**
 * Returns the verb from the Postman item name
 *
 * @param itemName Name of Postman item
 * @returns Shorter version of itemName or itemName
 */
const commandName = (
  item: ItemDefinition | ItemGroupDefinition,
  parentItem?: ItemDefinition | ItemGroupDefinition
): string => {
  let name = _.kebabCase(item.name) || "";

  if ("request" in item) {
    if (name.match(/^(create|delete|list|restart|retrieve|stop|update)-/i)) {
      const url = item.request?.url as UrlDefinition;
      const path = Array.isArray(url?.path) ? url.path : [];

      name = name.split("-")[0].replace("retrieve", "get");

      // The "me" endpoints can conflict with other command names so just use
      // "me" as the command name
      if (path.indexOf("me") >= 0) {
        name = "me";
      }

      // Handle extra "list" endpoints that contain path variables that will
      // conflict with the standard list commmand
      const idPath = path.findIndex((p) => p.charAt(0) === ":");
      if (name === "list" && idPath !== -1) {
        name += `-by-${_.kebabCase(
          path[idPath].substring(1, path[idPath].lastIndexOf("_"))
        )}`;
      }

      // Handle extra "delete" endpoints where path variable is not the last
      // element. For example, /time_entries/:time_entry_id/external_reference
      else if (name === "delete" && path[path.length - 1].charAt(0) !== ":") {
        name += `-${_.kebabCase(path[path.length - 1])}`;
      }

      return name;
    }
  }

  if (parentItem) {
    const parentName = commandName(parentItem);
    const prefix = name.split("-")[0];

    if (parentName.match(new RegExp(`^${prefix}`))) {
      name = name.substring(name.indexOf("-") + 1, name.length);
    }
  }

  // Remove "a" and "an" from command names
  return name.replace(/-an?-/g, "-");
};

/**
 * Create a markdown table for the given column names and values
 *
 * @param head Name of table head columns
 * @param body Array of array of body column values
 * @returns Markdown format for table
 */
function markdownTable(
  head: string[],
  body: (boolean | string | undefined)[][]
): string {
  const separators = head.map(() => "---");
  const bodyRows = body.map((row) => `| ${row.join(" | ")} |`);
  return `
| ${head.join(" | ")} |
| ${separators.join(" | ")} |
${bodyRows.join("\n")}`;
}

/**
 * Create directory if it does not already exist
 *
 * @param dir Directory path
 */
async function mkdir(dir: string): Promise<void> {
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir);
  }
}

/**
 * Write contents to file and format using prettier
 *
 * @param filepath Path to file (also used to infer parser for prettier)
 * @param content File content
 */
async function writeFile(
  filepath: string,
  content: string,
  overwrite = false
): Promise<void> {
  if (!overwrite && fs.existsSync(filepath)) {
    console.warn(`Skipped overwriting ${filepath}`);
    return;
  }
  await fs.promises.writeFile(
    filepath,
    format(content, {
      filepath,
    })
  );
}
