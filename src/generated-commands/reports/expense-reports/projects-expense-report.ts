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
    path: ["v2", "reports", "expenses", "projects"],
    query: [
      {
        key: "from",
        value: "",
        description:
          "Only report on expenses with a spent_date on or after the given date.",
      },
      {
        key: "to",
        value: "",
        description:
          "Only report on expenses with a spent_date on or before the given date.",
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
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "projects-expense-report",
    describe:
      "Projects Expense Report shows expense totals for each project where expenses are present for a given timeframe",
    request,
  });
