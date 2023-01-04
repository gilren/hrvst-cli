/**
 * This file was generated by running `npm run generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../utils/postman-request-command";

export const request: Request = {
  method: "DELETE",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "clients", ":client_id"],
    variable: [
      {
        key: "client_id",
        value: "",
        description: "The ID of the client you're deleting.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "delete",
    describe: "Delete a client",
    request,
  });
