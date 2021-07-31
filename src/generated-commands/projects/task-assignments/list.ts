/**
 * This file was generated by running `yarn generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../../util/postman-request-command";

export const request: Request = {
  method: "GET",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "task_assignments"],
    query: [
      {
        key: "is_active",
        value: "",
        description:
          "Pass true to only return active task assignments and false to return inactive task assignments.",
        disabled: true,
      },
      {
        key: "updated_since",
        value: "",
        description:
          "Only return task assignments that have been updated since the given date and time.",
        disabled: true,
      },
      {
        key: "page",
        value: "",
        description:
          "The page number to use in pagination. For instance, if you make a list request and receive 100 records, your subsequent call can include page=2 to retrieve the next page of the list.",
        disabled: true,
      },
      {
        key: "per_page",
        value: "",
        description:
          "The number of records to return per page. Can range between 1 and 100.",
        disabled: true,
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "list",
    describe: "Returns a list of your task assignments",
    request,
  });
