import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['createEntityType'],
	resource: ['entityType'],
};

export const createOrUpdateEntityTypeDescription: INodeProperties[] = [
	{
		displayName: 'Entity Type Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Entity Type Version',
		name: 'version',
		type: 'number',
		description: 'Only required when updating entity type',
		default: 0,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: showWhen,
		},
	},
];
