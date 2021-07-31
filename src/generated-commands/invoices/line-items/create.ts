/**
 * This file was generated by running `yarn generate` and should NOT be modified.
 */
import postmanRequestCommand, {
  Request,
} from "../../../util/postman-request-command";

export const request: Request = {
  method: "PATCH",
  url: {
    protocol: "https",
    host: ["api", "harvestapp", "com"],
    path: ["v2", "invoices", ":invoice_id"],
    query: [
      {
        key: "line_items[0]kind",
        value: "",
        description: "The name of an invoice item category. ",
      },
      {
        key: "line_items[0]description",
        value: "",
        description: "Text description of the line item.",
      },
      {
        key: "line_items[0]unit_price",
        value: "",
        description: "The individual price per unit.",
      },
      {
        key: "line_items[0]quantity",
        value: "",
        description: "The unit quantity of the item.",
      },
      {
        key: "line_items[0]taxed",
        value: "",
        description:
          "Whether the invoice’s tax percentage applies to this line item. Defaults to false.",
      },
      {
        key: "line_items[0]taxed2",
        value: "",
        description:
          "Whether the invoice’s tax2 percentage applies to this line item. Defaults to false.",
      },
    ],
    variable: [
      {
        key: "invoice_id",
        value: "",
        description: "The ID of the invoice you're creating the line item for.",
      },
    ],
  },
};
export const { command, aliases, describe, builder, handler } =
  postmanRequestCommand({
    command: "create",
    describe: "Create a new line item on an invoice",
    request,
  });
