import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['suggestWorkflowStates'],
	resource: ['workflow'],
};

export const suggestStatesDescription: INodeProperties[] = [
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
];
