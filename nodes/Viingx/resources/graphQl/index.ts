import type { INodeProperties } from "n8n-workflow";
import { executeGraphQlDescription } from "./executeGraphQl";

const showWhen = {
  resource: ["graphQl"],
};

export const graphQlDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showWhen,
    },
    options: [
      {
        name: "Execute GraphQL",
        value: "executeGraphQl",
        // eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
        action: "Execute GraphQL",
      },
    ],
    default: "executeGraphQl",
  },
  ...executeGraphQlDescription,
];
