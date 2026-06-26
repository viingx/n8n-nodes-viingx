import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['suggestWorkflowAssignees'],
	resource: ['workflow'],
};

export const suggestWorkflowAssigneesDescription: INodeProperties[] = [
	{
		displayName: 'Entity Type Name or ID',
		name: 'entityType',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getEntityTypeOptions',
		},
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Entity IDs',
		name: 'entityIds',
		type: 'string',
		default: [],
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Entity ID',
		},
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
		displayName: 'Workflow Assignee',
		name: 'workflowAssignee',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showWhen,
		},
	},
];
