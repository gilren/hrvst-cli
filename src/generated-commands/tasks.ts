/**
 * This file was generated by running `yarn generate` and should NOT be modified.
 */
import { Argv } from "yargs";
export const command = "tasks <command>";
export const description = `Information pertaining to retrieving, creating, editing, and deleting tasks. Admin permissions required.`;
export const builder = (yargs: Argv) =>
  yargs.commandDir("tasks").version(false);
export const handler = () => {};
