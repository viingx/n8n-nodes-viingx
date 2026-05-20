import {
	NodeConnectionTypes,
	type IDataObject,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
} from 'n8n-workflow';

export class ViingxTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'viingx Trigger',
		name: 'viingxTrigger',
		icon: 'file:../../icons/viingx.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when an action or subscription event is executed in viingx',
		usableAsTool: true,
		subtitle: '={{$parameter["event"]}}',
		defaults: {
			name: 'viingx Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: '={{$parameter["event"] === "subscription" ? "trigger-subscription" : "trigger-action"}}',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Action',
						value: 'action',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
				],
				default: 'action',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const workflowData = this.helpers.returnJsonArray(bodyData as IDataObject);

		return {
			workflowData: [workflowData],
		};
	}
}
