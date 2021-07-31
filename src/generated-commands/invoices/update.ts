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
    path: ["v2", "invoices", ":invoice_id"],
    query: [
      {
        key: "client_id",
        value: "",
        description: "The ID of the client this invoice belongs to.",
        disabled: true,
      },
      {
        key: "retainer_id",
        value: "",
        description: "The ID of the retainer associated with this invoice.",
        disabled: true,
      },
      {
        key: "estimate_id",
        value: "",
        description: "The ID of the estimate associated with this invoice.",
        disabled: true,
      },
      {
        key: "number",
        value: "",
        description:
          "If no value is set, the number will be automatically generated.",
        disabled: true,
      },
      {
        key: "purchase_order",
        value: "",
        description: "The purchase order number.",
        disabled: true,
      },
      {
        key: "tax",
        value: "",
        description:
          "This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.",
        disabled: true,
      },
      {
        key: "tax2",
        value: "",
        description:
          "This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.",
        disabled: true,
      },
      {
        key: "discount",
        value: "",
        description:
          "This percentage is subtracted from the subtotal. Example: use 10.0 for 10.0%.",
        disabled: true,
      },
      {
        key: "subject",
        value: "",
        description: "The invoice subject.",
        disabled: true,
      },
      {
        key: "notes",
        value: "",
        description: "Any additional notes to include on the invoice.",
        disabled: true,
      },
      {
        key: "currency",
        value: "",
        description:
          "The currency used by the invoice. If not provided, the client’s currency will be used. See a list of supported currencies",
        disabled: true,
      },
      {
        key: "issue_date",
        value: "",
        description: "Date the invoice was issued. Defaults to today’s date.",
        disabled: true,
      },
      {
        key: "due_date",
        value: "",
        description: "Date the invoice is due.",
        disabled: true,
      },
      {
        key: "payment_term",
        value: "",
        description:
          "The timeframe in which the invoice should be paid. Options: upon receipt, net 15, net 30, net 45, or net 60.",
        disabled: true,
      },
    ],
    variable: [
      {
        key: "invoice_id",
        value: "",
        description: "The ID of the invoice you're updating.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "update",
    describe:
      "Updates the specific invoice by setting the values of the parameters passed",
    request,
  });
