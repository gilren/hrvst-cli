/**
 * This file was generated by running `yarn generate` and should NOT be modified.
 */
import { Argv } from "yargs";
export const command = "clients <command>";
export const description = `Information pertaining to retrieving, created, editing, and deleting clients.`;
export const builder = (yargs: Argv) =>
  yargs.commandDir("clients").version(false);
export const handler = () => {};
