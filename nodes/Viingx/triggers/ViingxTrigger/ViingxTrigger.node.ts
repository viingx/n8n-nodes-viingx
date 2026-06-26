import {
	NodeConnectionTypes,
	type IDataObject,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
} from 'n8n-workflow';

const webhookPathByEventExpression =
	'={{ ({ action: "trigger-action", subscription: "trigger-subscription", qualityGateCheck: "trigger-quality-gate-check", workflowAssigneeOptions: "trigger-workflow-assignee-options", workflowStateOptions: "trigger-workflow-state-options" })[$parameter["event"]] }}';
const responseModeByEventExpression =
	'={{ $parameter["event"] === "subscription" || ($parameter["event"] === "action" && $parameter["actionCompletionMode"] === "asynchronous") ? "onReceived" : "responseNode" }}';

export class ViingxTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'viingx Trigger',
		name: 'viingxTrigger',
		icon: 'file:../../../../icons/viingx.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when an event is executed in viingx',
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
				responseMode: responseModeByEventExpression,
				path: webhookPathByEventExpression,
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
						name: 'Quality Gate Check',
						value: 'qualityGateCheck',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
					{
						name: 'Workflow Assignee Options',
						value: 'workflowAssigneeOptions',
					},
					{
						name: 'Workflow State Options',
						value: 'workflowStateOptions',
					},
				],
				default: 'action',
			},
			{
				displayName: 'Action Completion',
				name: 'actionCompletionMode',
				type: 'options',
				default: 'synchronous',
				description: 'Whether action invocations should complete in the webhook response or asynchronously via update/finalize calls',
				displayOptions: {
					show: {
						event: ['action'],
					},
				},
				options: [
					{
						name: 'Asynchronous',
						value: 'asynchronous',
					},
					{
						name: 'Synchronous',
						value: 'synchronous',
					},
				],
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const workflowData = this.helpers.returnJsonArray(bodyData as IDataObject);
		const event = this.getNodeParameter('event') as string;
		const actionCompletionMode = this.getNodeParameter('actionCompletionMode', 'synchronous') as string;

		if (event === 'action' && actionCompletionMode === 'asynchronous') {
			this.getResponseObject().status(204).end();

			return {
				noWebhookResponse: true,
				workflowData: [workflowData],
			};
		}

		return {
			workflowData: [workflowData],
		};
	}
}
