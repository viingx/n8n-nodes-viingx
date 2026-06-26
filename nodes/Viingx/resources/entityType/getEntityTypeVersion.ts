import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['getEntityTypeVersion'],
	resource: ['entityType'],
};

export const getEntityTypeVersionDescription: INodeProperties[] = [
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
		displayName: 'Entity Type Version',
		name: 'version',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
		displayOptions: {
			show: showWhen,
		},
	},
];
