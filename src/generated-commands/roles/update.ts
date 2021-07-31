/**
 * This file was generated by running `yarn generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../util/postman-request-command";

export const request: Request = {
  method: "PATCH",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "roles", ":role_id"],
    query: [
      {
        key: "name",
        value: "",
        description: "The name of the role.",
        disabled: true,
      },
    ],
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
    command: "update",
    describe:
      "Updates the specific role by setting the values of the parameters passed",
    request,
  });
