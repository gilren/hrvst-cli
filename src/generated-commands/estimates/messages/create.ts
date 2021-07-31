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
    path: ["v2", "estimates", ":estimate_id", "messages"],
    query: [
      {
        key: "recipients[0]email",
        value: "",
        description: "Email of the message recipient.",
      },
      {
        key: "recipients[0]name",
        value: "",
        description: "Name of the message recipient.",
      },
      {
        key: "subject",
        value: "",
        description: "The message subject.",
        disabled: true,
      },
      {
        key: "body",
        value: "",
        description: "The message body.",
        disabled: true,
      },
      {
        key: "send_me_a_copy",
        value: "",
        description:
          "Whether to email a copy of the message to the current user.",
        disabled: true,
      },
      {
        key: "event_type",
        value: "",
        description:
          "If provided, runs an event against the estimate. Options: “accept”, “decline”, “re-open”, or “send”.",
        disabled: true,
      },
    ],
    variable: [
      {
        key: "estimate_id",
        value: "",
        description:
          "The ID of the invoice that you're creating the message for.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "create",
    describe: "Creates a new estimate message object",
    request,
  });
