import type { INodeProperties } from "n8n-workflow";
import { getSystemSettingsDescription } from "./getSystemSettings";
import { getUserSettingsDescription } from "./getUserSettings";

const showWhen = {
  resource: ["setting"],
};

export const settingDescription: INodeProperties[] = [
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
        name: "Get System Settings",
        value: "getSystemSettings",
        action: "Get system settings",
      },
      {
        name: "Get User Settings",
        value: "getUserSettings",
        action: "Get user settings",
      },
    ],
    default: "getSystemSettings",
  },
  ...getSystemSettingsDescription,
  ...getUserSettingsDescription,
];
