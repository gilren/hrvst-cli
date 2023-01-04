/**
 * This file was generated by running `npm run generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../utils/postman-request-command";

export const request: Request = {
  method: "PATCH",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "time_entries", ":time_entry_id", "restart"],
    variable: [
      {
        key: "time_entry_id",
        value: "",
        description: "The ID of the time entry you're restarting.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "restart",
    describe:
      "Restarting a time entry is only possible if it isn’t currently running",
    request,
  });
