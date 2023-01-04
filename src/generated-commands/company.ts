/**
 * This file was generated by running `npm run generate` and should NOT be modified.
 */
import { CommandBuilder } from "yargs";
export const command = "company <command>";
export const description = `Requests pertaining to companies.`;
export const builder: CommandBuilder = (yargs) =>
  yargs
    .commandDir("company")
    .demandCommand()
    .recommendCommands()
    .strictCommands()
    .version(false);
