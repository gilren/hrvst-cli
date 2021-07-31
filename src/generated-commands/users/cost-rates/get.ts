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
    path: ["v2", "users", ":user_id", "cost_rates", ":cost_rate_id"],
    variable: [
      {
        key: "user_id",
        value: "",
        description:
          "The ID of the user whose billable rate you're retrieving.",
      },
      {
        key: "cost_rate_id",
        value: "",
        description: "The ID of the cost rate you're retrieving.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "get",
    describe: "Retrieves the cost rate with the given ID",
    request,
  });
