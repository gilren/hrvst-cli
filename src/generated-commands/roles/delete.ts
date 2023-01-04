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
    path: ["v2", "roles", ":role_id"],
    variable: [
      {
        key: "role_id",
        value: "",
        description: "The ID of the role you're updating.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "delete",
    describe: "Delete a role",
    request,
  });
