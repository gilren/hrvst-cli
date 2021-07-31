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
    path: ["v2", "users", ":user_id"],
    query: [
      {
        key: "first_name",
        value: "",
        description: "The first name of the user.",
        disabled: true,
      },
      {
        key: "last_name",
        value: "",
        description: "The last name of the user.",
        disabled: true,
      },
      {
        key: "email",
        value: "",
        description: "The email address of the user.",
        disabled: true,
      },
      {
        key: "telephone",
        value: "",
        description: "The telephone number for the user.",
        disabled: true,
      },
      {
        key: "timezone",
        value: "",
        description: "The user’s timezone. Defaults to the company’s timezone.",
        disabled: true,
      },
      {
        key: "has_access_to_all_future_projects",
        value: "",
        description:
          "Whether the user should be automatically added to future projects.",
        disabled: true,
      },
      {
        key: "is_contractor",
        value: "",
        description: "Whether the user is a contractor or an employee.",
        disabled: true,
      },
      {
        key: "is_admin",
        value: "",
        description: "Whether the user has admin permissions. ",
        disabled: true,
      },
      {
        key: "is_project_manager",
        value: "",
        description:
          "Whether the user has project manager permissions. Defaults to false.",
        disabled: true,
      },
      {
        key: "can_see_rates",
        value: "",
        description:
          "Whether the user can see billable rates on projects. Only applicable to project managers.",
        disabled: true,
      },
      {
        key: "can_create_projects",
        value: "",
        description:
          "Whether the user can create projects. Only applicable to project managers.",
        disabled: true,
      },
      {
        key: "can_create_invoices",
        value: "",
        description:
          "Whether the user can create invoices. Only applicable to project managers.",
        disabled: true,
      },
      {
        key: "is_active",
        value: "",
        description: "Whether the user is active or archived.",
        disabled: true,
      },
      {
        key: "weekly_capacity",
        value: "",
        description:
          "The number of hours per week this person is available to work in seconds.",
        disabled: true,
      },
      {
        key: "default_hourly_rate",
        value: "",
        description:
          "The billable rate to use for this user when they are added to a project. ",
        disabled: true,
      },
      {
        key: "cost_rate",
        value: "",
        description:
          "The cost rate to use for this user when calculating a project’s costs vs billable amount. ",
        disabled: true,
      },
    ],
    variable: [
      {
        key: "user_id",
        value: "",
        description: "The ID of the user you're updating.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "update",
    describe:
      "Updates the specific user by setting the values of the parameters passed",
    request,
  });
