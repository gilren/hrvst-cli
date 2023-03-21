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
    path: ["v2", "users", ":user_id", "teammates"],
    query: [
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
    ],
    variable: [
      {
        key: "user_id",
        value: "",
        description: "The ID of the manager you are listing teammates for.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "list-by-user",
    describe:
      "Returns a list of assigned teammates for the user identified by `USER_ID`",
    request,
  });
