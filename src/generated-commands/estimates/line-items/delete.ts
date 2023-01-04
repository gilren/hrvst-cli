/**
 * This file was generated by running `npm run generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../../utils/postman-request-command";

export const request: Request = {
  method: "PATCH",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "estimates", ":estimate_id"],
    query: [
      {
        key: "line_items[0]id",
        value: "",
        description: "The ID of the line item you want to delete.",
      },
      {
        key: "line_items[0]_destroy",
        value: "",
        description: "Gives the command to delete the line item.",
      },
    ],
    variable: [
      {
        key: "estimate_id",
        value: "",
        description:
          "The ID of the estimate that contains the line item you're deleting.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "delete",
    describe: "Update an exisitng line item on an estimate",
    request,
  });
