/**
 * This file was generated by running `npm run generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../../utils/postman-request-command";

export const request: Request = {
  method: "GET",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "users", ":user_id", "project_assignments"],
    query: [
      {
        key: "updated_since",
        value: "",
        description:
          "Only return project assignments that have been updated since the given date and time.",
        disabled: true,
      },
      {
        key: "page",
        value: "",
        description:
          "The page number to use in pagination. Use `all` to retrieve all pages.",
        disabled: true,
      },
      {
        key: "per_page",
        value: "",
        description:
          "The number of records to return per page. Can range between 1 and 2000.",
        disabled: true,
      },
      { key: "", value: "" },
    ],
    variable: [
      {
        key: "user_id",
        value: "",
        description:
          "The ID of the user whose project assignments you're listing.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "list-by-user",
    describe:
      "Returns a list of active project assignments for the user identified by `USER_ID`",
    request,
  });
