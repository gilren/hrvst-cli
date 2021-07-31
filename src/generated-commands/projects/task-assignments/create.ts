/**
 * This file was generated by running `yarn generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../../util/postman-request-command";

export const request: Request = {
  method: "POST",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "projects", ":project_id", "task_assignments"],
    query: [
      {
        key: "task_id",
        value: "",
        description: "The ID of the task to associate with the project.",
      },
      {
        key: "is_active",
        value: "",
        description:
          "Whether the task assignment is active or archived. Defaults to true.",
        disabled: true,
      },
      {
        key: "billable",
        value: "",
        description:
          "Whether the task assignment is billable or not. Defaults to false.",
        disabled: true,
      },
      {
        key: "hourly_rate",
        value: "",
        description:
          "Rate used when the project’s bill_by is Tasks. Defaults to null when billing by task hourly rate, otherwise 0.",
        disabled: true,
      },
      {
        key: "budget",
        value: "",
        description:
          "Budget used when the project’s budget_by is task or task_fees.",
        disabled: true,
      },
    ],
    variable: [
      {
        key: "project_id",
        value: "",
        description:
          "The ID of the project that you're creating the task assignment for.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "create",
    describe: "Creates a new task assignment object",
    request,
  });
