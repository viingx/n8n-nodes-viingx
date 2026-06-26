import {
	NodeOperationError,
	type IDataObject,
	type IExecuteFunctions,
	type IHttpRequestOptions,
	type INodeExecutionData,
	type INodeProperties,
} from 'n8n-workflow';

export type ResponseOperation =
	| 'action'
	| 'qualityGateCheck'
	| 'workflowAssigneeOptions'
	| 'workflowStateOptions';
type ActionStatus = 'success' | 'failure';
type ActionResultType = 'none' | 'download' | 'openUrl' | 'openEntity' | 'openEntityList';
type ActionResponseMode = 'finalizeAsync' | 'synchronousResponse' | 'updateAsync';

type FieldHint = {
	propertyId?: string;
	entityPointer?: string;
	message?: string;
};

type FieldHintsParameter = {
	fieldHint?: FieldHint[];
};

type UserId = {
	userId?: string;
};

type UsersParameter = {
	user?: UserId[];
};

type WorkflowState = {
	state?: string;
};

type StatesParameter = {
	stateOption?: WorkflowState[];
};

const showOnlyForResponse = {
	resource: ['response'],
};

const showOnlyForAction = {
	operation: ['action'],
	resource: ['response'],
};

const showOnlyForActionFinalResponse = {
	actionResponseMode: ['finalizeAsync', 'synchronousResponse'],
	operation: ['action'],
	resource: ['response'],
};

const showOnlyForActionInvocationUpdate = {
	actionResponseMode: ['finalizeAsync', 'updateAsync'],
	operation: ['action'],
	resource: ['response'],
};

const showOnlyForActionProgressUpdate = {
	actionResponseMode: ['updateAsync'],
	operation: ['action'],
	resource: ['response'],
};

const showOnlyForSuccessfulActionFinalResponse = {
	actionStatus: ['success'],
	actionResponseMode: ['finalizeAsync', 'synchronousResponse'],
	operation: ['action'],
	resource: ['response'],
};

const showOnlyForQualityGateCheck = {
	operation: ['qualityGateCheck'],
	resource: ['response'],
};

const showOnlyForFailedQualityGateCheck = {
	operation: ['qualityGateCheck'],
	qualityGateStatus: [false],
	resource: ['response'],
};

export const responseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'action',
		displayOptions: {
			show: showOnlyForResponse,
		},
		options: [
			{
				name: 'Send Action Response',
				value: 'action',
				action: 'Send action response',
			},
			{
				name: 'Send Quality Gate Check Response',
				value: 'qualityGateCheck',
				action: 'Send quality gate check response',
			},
			{
				name: 'Send Workflow Assignee Options Response',
				value: 'workflowAssigneeOptions',
				action: 'Send workflow assignee options response',
			},
			{
				name: 'Send Workflow State Options Response',
				value: 'workflowStateOptions',
				action: 'Send workflow state options response',
			},
		],
	},
	{
		displayName: 'Action Response Type',
		name: 'actionResponseMode',
		type: 'options',
		default: 'synchronousResponse',
		description: 'How to respond to or update the action invocation',
		displayOptions: {
			show: showOnlyForAction,
		},
		options: [
			{
				name: 'Finalize Asynchronous Action',
				value: 'finalizeAsync',
			},
			{
				name: 'Send Synchronous Response',
				value: 'synchronousResponse',
			},
			{
				name: 'Update Asynchronous Action Progress',
				value: 'updateAsync',
			},
		],
	},
	{
		displayName: 'Invocation Host URL',
		name: 'actionInvocationHostUrl',
		type: 'string',
		default: '={{$json.invocation.hostUrl}}',
		required: true,
		description: 'Base URL of the viingx instance that sent the action invocation',
		displayOptions: {
			show: showOnlyForActionInvocationUpdate,
		},
	},
	{
		displayName: 'Invocation ID',
		name: 'actionInvocationId',
		type: 'string',
		default: '={{$json.invocation.id}}',
		required: true,
		description: 'ID of the action invocation to update or finalize',
		displayOptions: {
			show: showOnlyForActionInvocationUpdate,
		},
	},
	{
		displayName: 'Invocation Token',
		name: 'actionInvocationToken',
		type: 'string',
		default: '={{$json.invocation.token}}',
		required: true,
		description: 'Bearer token from the action invocation payload',
		displayOptions: {
			show: showOnlyForActionInvocationUpdate,
		},
		typeOptions: {
			password: true,
		},
	},
	{
		displayName: 'Progress Message',
		name: 'actionProgressMessage',
		type: 'string',
		default: '',
		description: 'Progress message to send to viingx',
		displayOptions: {
			show: showOnlyForActionProgressUpdate,
		},
	},
	{
		displayName: 'Progress Percent',
		name: 'actionProgressPercent',
		type: 'number',
		default: 0,
		description: 'Progress as a number from 0 to 1',
		displayOptions: {
			show: showOnlyForActionProgressUpdate,
		},
		typeOptions: {
			maxValue: 1,
			minValue: 0,
		},
	},
	{
		displayName: 'Status',
		name: 'actionStatus',
		type: 'options',
		default: 'success',
		required: true,
		description: 'Whether the action completed successfully or failed',
		displayOptions: {
			show: showOnlyForActionFinalResponse,
		},
		options: [
			{
				name: 'Failure',
				value: 'failure',
			},
			{
				name: 'Success',
				value: 'success',
			},
		],
	},
	{
		displayName: 'Message',
		name: 'actionMessage',
		type: 'string',
		default: '',
		description: 'Optional status message, up to 200 characters',
		displayOptions: {
			show: showOnlyForActionFinalResponse,
		},
		typeOptions: {
			maxLength: 200,
		},
	},
	{
		displayName: 'Result',
		name: 'resultType',
		type: 'options',
		default: 'none',
		description: 'Optional result object to return when the action succeeds',
		displayOptions: {
			show: showOnlyForSuccessfulActionFinalResponse,
		},
		options: [
			{
				name: 'Download',
				value: 'download',
			},
			{
				name: 'None',
				value: 'none',
			},
			{
				name: 'Open Entity',
				value: 'openEntity',
			},
			{
				name: 'Open Entity List',
				value: 'openEntityList',
			},
			{
				name: 'Open URL',
				value: 'openUrl',
			},
		],
	},
	{
		displayName: 'Download URL',
		name: 'downloadUrl',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resultType: ['download'],
				...showOnlyForSuccessfulActionFinalResponse,
			},
		},
	},
	{
		displayName: 'URL',
		name: 'openUrl',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resultType: ['openUrl'],
				...showOnlyForSuccessfulActionFinalResponse,
			},
		},
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resultType: ['openEntity'],
				...showOnlyForSuccessfulActionFinalResponse,
			},
		},
	},
	{
		displayName: 'Entity Type',
		name: 'entityType',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resultType: ['openEntity', 'openEntityList'],
				...showOnlyForSuccessfulActionFinalResponse,
			},
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resultType: ['openEntityList'],
				...showOnlyForSuccessfulActionFinalResponse,
			},
		},
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'json',
		default: '{}',
		required: true,
		description: 'Query object for the entity list view',
		displayOptions: {
			show: {
				resultType: ['openEntityList'],
				...showOnlyForSuccessfulActionFinalResponse,
			},
		},
	},
	{
		displayName: 'Status',
		name: 'qualityGateStatus',
		type: 'boolean',
		default: true,
		required: true,
		description: 'Whether the quality gate check passed',
		displayOptions: {
			show: showOnlyForQualityGateCheck,
		},
	},
	{
		displayName: 'Message',
		name: 'qualityGateMessage',
		type: 'string',
		default: '',
		required: true,
		description: 'Validation error message to return when the quality gate check fails',
		displayOptions: {
			show: showOnlyForFailedQualityGateCheck,
		},
	},
	{
		displayName: 'Field Hints',
		name: 'fieldHints',
		type: 'fixedCollection',
		default: {},
		description: 'Field-level validation hints to return when the quality gate check fails',
		displayOptions: {
			show: showOnlyForFailedQualityGateCheck,
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Field Hint',
				name: 'fieldHint',
				values: [
					{
						displayName: 'Property ID',
						name: 'propertyId',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Entity Pointer',
						name: 'entityPointer',
						type: 'string',
						default: '',
						required: true,
						placeholder: '/content/payload/title',
					},
					{
						displayName: 'Message',
						name: 'message',
						type: 'string',
						default: '',
						required: true,
					},
				],
			},
		],
	},
	{
		displayName: 'Users',
		name: 'users',
		type: 'fixedCollection',
		default: {},
		required: true,
		description: 'Allowed user IDs to return as workflow assignee options',
		displayOptions: {
			show: {
				operation: ['workflowAssigneeOptions'],
				resource: ['response'],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'User',
				name: 'user',
				values: [
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'string',
						default: '',
						required: true,
					},
				],
			},
		],
	},
	{
		displayName: 'States',
		name: 'states',
		type: 'fixedCollection',
		default: {},
		required: true,
		description: 'Allowed workflow states to return as workflow state options',
		displayOptions: {
			show: {
				operation: ['workflowStateOptions'],
				resource: ['response'],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'State',
				name: 'stateOption',
				values: [
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
						required: true,
						placeholder: 'review',
					},
				],
			},
		],
	},
];

export async function executeViingxResponse(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operation = this.getNodeParameter('operation', 0) as ResponseOperation;

	if (operation === 'action') {
		return await executeActionResponse.call(this);
	}

	const body = buildResponseBody.call(this, operation);
	const items = this.getInputData();

	this.sendResponse({
		body,
		headers: {},
		statusCode: 200,
	});

	return [items];
}

export function sendViingxResponseError(
	this: IExecuteFunctions,
	error: unknown,
): INodeExecutionData[][] {
	const message = error instanceof Error ? error.message : 'Unknown error';

	this.sendResponse({
		body: {
			error: message,
		},
		headers: {},
		statusCode: 500,
	});

	return [
		[
			{
				json: {
					error: message,
				},
			},
		],
	];
}

function buildResponseBody(this: IExecuteFunctions, operation: ResponseOperation): IDataObject {
	if (operation === 'qualityGateCheck') {
		return buildQualityGateCheckResponse.call(this);
	}

	if (operation === 'workflowAssigneeOptions') {
		return buildWorkflowAssigneeOptionsResponse.call(this);
	}

	return buildWorkflowStateOptionsResponse.call(this);
}

async function executeActionResponse(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const mode = this.getNodeParameter('actionResponseMode', 0) as ActionResponseMode;
	const items = this.getInputData();

	if (mode === 'updateAsync') {
		const response = await postActionInvocationUpdate.call(this, 'update', buildActionProgressUpdate.call(this));

		return [this.helpers.returnJsonArray(response)];
	}

	if (mode === 'finalizeAsync') {
		const response = await postActionInvocationUpdate.call(this, 'finalize', buildActionResponse.call(this));

		return [this.helpers.returnJsonArray(response)];
	}

	this.sendResponse({
		body: buildActionResponse.call(this),
		headers: {},
		statusCode: 200,
	});

	return [items];
}

function buildActionProgressUpdate(this: IExecuteFunctions): IDataObject {
	const message = this.getNodeParameter('actionProgressMessage', 0, '') as string;
	const percent = this.getNodeParameter('actionProgressPercent', 0, 0) as number;
	const progress: IDataObject = { percent };

	if (message !== '') {
		progress.message = message;
	}

	return { progress };
}

async function postActionInvocationUpdate(
	this: IExecuteFunctions,
	endpoint: 'finalize' | 'update',
	body: IDataObject,
): Promise<IDataObject> {
	const hostUrl = (this.getNodeParameter('actionInvocationHostUrl', 0) as string).replace(/\/+$/, '');
	const invocationId = this.getNodeParameter('actionInvocationId', 0) as string;
	const token = this.getNodeParameter('actionInvocationToken', 0) as string;
	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${hostUrl}/api/v1.0/actions/invocations/${encodeURIComponent(invocationId)}/handler/${endpoint}`,
		body,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};
	const response = await this.helpers.httpRequest(options);

	if (response === undefined || response === '') {
		return {
			success: true,
		};
	}

	return response as IDataObject;
}

function buildActionResponse(this: IExecuteFunctions): IDataObject {
	const itemIndex = 0;
	const status = this.getNodeParameter('actionStatus', itemIndex) as ActionStatus;
	const message = this.getNodeParameter('actionMessage', itemIndex, '') as string;
	const body: IDataObject = { status };

	if (message !== '') {
		body.message = message;
	}

	if (status === 'success') {
		const result = buildActionResult.call(this, itemIndex);

		if (result !== undefined) {
			body.result = result;
		}
	}

	return body;
}

function buildActionResult(this: IExecuteFunctions, itemIndex: number): IDataObject | undefined {
	const resultType = this.getNodeParameter('resultType', itemIndex) as ActionResultType;

	if (resultType === 'none') {
		return undefined;
	}

	if (resultType === 'download') {
		return {
			download: this.getNodeParameter('downloadUrl', itemIndex) as string,
		};
	}

	if (resultType === 'openUrl') {
		return {
			openUrl: this.getNodeParameter('openUrl', itemIndex) as string,
		};
	}

	if (resultType === 'openEntity') {
		return {
			openEntity: {
				id: this.getNodeParameter('entityId', itemIndex) as string,
				type: this.getNodeParameter('entityType', itemIndex) as string,
			},
		};
	}

	return {
		openEntityList: {
			type: this.getNodeParameter('entityType', itemIndex) as string,
			title: this.getNodeParameter('title', itemIndex) as string,
			query: parseQuery.call(this, this.getNodeParameter('query', itemIndex)),
		},
	};
}

function buildQualityGateCheckResponse(this: IExecuteFunctions): IDataObject {
	const itemIndex = 0;
	const status = this.getNodeParameter('qualityGateStatus', itemIndex) as boolean;
	const body: IDataObject = { status };

	if (!status) {
		const fieldHintsParameter = this.getNodeParameter(
			'fieldHints',
			itemIndex,
			{},
		) as FieldHintsParameter;

		body.message = this.getNodeParameter('qualityGateMessage', itemIndex) as string;
		body.fieldHints = (fieldHintsParameter.fieldHint ?? []).map((fieldHint) => ({
			propertyId: fieldHint.propertyId ?? '',
			entityPointer: fieldHint.entityPointer ?? '',
			message: fieldHint.message ?? '',
		}));
	}

	return body;
}

function buildWorkflowAssigneeOptionsResponse(this: IExecuteFunctions): IDataObject {
	const usersParameter = this.getNodeParameter('users', 0, {}) as UsersParameter;

	return {
		users: (usersParameter.user ?? []).map((user) => user.userId ?? ''),
	};
}

function buildWorkflowStateOptionsResponse(this: IExecuteFunctions): IDataObject {
	const statesParameter = this.getNodeParameter('states', 0, {}) as StatesParameter;

	return {
		states: (statesParameter.stateOption ?? []).map((stateOption) => stateOption.state ?? ''),
	};
}

function parseQuery(this: IExecuteFunctions, queryParameter: unknown): IDataObject {
	if (typeof queryParameter !== 'string') {
		return queryParameter as IDataObject;
	}

	try {
		return JSON.parse(queryParameter) as IDataObject;
	} catch (error) {
		throw new NodeOperationError(this.getNode(), 'Query must be valid JSON.', {
			description: error instanceof Error ? error.message : undefined,
		});
	}
}
