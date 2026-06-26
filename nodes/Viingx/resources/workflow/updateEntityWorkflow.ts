import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['updateEntityWorkflow'],
	resource: ['workflow'],
};

export const updateEntityWorkflowDescription: INodeProperties[] = [
	{
		displayName: 'Entity Type Name or ID',
		name: 'entityType',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getEntityTypeOptions',
		},
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Entity Workflow Version',
		name: 'entityWorkflowVersion',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Workflow State Name or ID',
		name: 'workflowState',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsDependsOn: ['entityType'],
			loadOptionsMethod: 'getWorkflowStateOptions',
		},
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Workflow Assignee Name or ID',
		name: 'workflowAssignee',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		typeOptions: {
			loadOptionsDependsOn: ['entityType'],
			loadOptionsMethod: 'getWorkflowAssigneeOptions',
		},
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Workflow Deadline',
		name: 'workflowDeadline',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Workflow Comment',
		name: 'workflowComment',
		type: 'string',
		default: '',
		displayOptions: {
			show: showWhen,
		},
	},
];
