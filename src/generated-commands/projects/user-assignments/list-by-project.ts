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
    path: ["v2", "projects", ":project_id", "user_assignments"],
    query: [
      {
        key: "user_id",
        value: "",
        description:
          "Only return user assignments belonging to the user with the given ID.",
        disabled: true,
      },
      {
        key: "is_active",
        value: "",
        description:
          "Pass true to only return active user assignments and false to return inactive user assignments.",
        disabled: true,
      },
      {
        key: "updated_since",
        value: "",
        description:
          "Only return user assignments that have been updated since the given date and time.",
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
        key: "project_id",
        value: "",
        description:
          "The ID of the project whose user assignments you're retrieving.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "list-by-project",
    describe:
      "Returns a list of user assignments for the project identified by PROJECT_ID",
    request,
  });
