/**
 * This file was generated by running `yarn generate` and should NOT be modified.
 */
import { CommandBuilder } from "yargs";
export const command = "billable-rates <command>";
export const description = `Admin permissions required.`;
export const builder: CommandBuilder = (yargs) =>
  yargs
    .commandDir("billable-rates")
    .demandCommand()
    .recommendCommands()
    .strictCommands()
    .version(false);
