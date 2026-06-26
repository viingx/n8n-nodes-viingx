import type { INodeProperties } from "n8n-workflow";
import { createShareLinkDescription } from "./createShareLink";
import { deleteShareLinkDescription } from "./deleteShareLink";

const showWhen = {
  resource: ["shareLink"],
};

export const shareLinkDescription: INodeProperties[] = [
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
        name: "Create Share Link",
        value: "createShareLink",
        action: "Create share link",
      },
      {
        name: "Delete Share Link",
        value: "deleteShareLink",
        action: "Delete share link",
      },
    ],
    default: "createShareLink",
  },
  ...createShareLinkDescription,
  ...deleteShareLinkDescription,
];
