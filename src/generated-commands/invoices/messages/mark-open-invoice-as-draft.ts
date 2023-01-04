/**
 * This file was generated by running `npm run generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../../utils/postman-request-command";

export const request: Request = {
  method: "POST",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "invoices", ":invoice_id", "messages"],
    query: [
      {
        key: "event_type",
        value: "",
        description: "Pass “draft” to mark the invoice as a draft.",
      },
    ],
    variable: [
      {
        key: "invoice_id",
        value: "",
        description: "The ID of the invoice you're marking as a draft.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "mark-open-invoice-as-draft",
    describe:
      "Creates a new invoice message object and marks an open invoice as a draft",
    request,
  });
