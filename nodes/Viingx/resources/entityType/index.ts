import type { INodeProperties } from 'n8n-workflow';
import { createOrUpdateEntityTypeDescription } from './createOrUpdateEntityType';
import { deleteEntityTypeDescription } from './deleteEntityType';
import { getEntityTypesDescription } from './getEntityTypes';
import { getEntityTypeDescription } from './getEntityType';
import { getEntityTypeVersionDescription } from './getEntityTypeVersion';

const showWhen = {
	resource: ['entityType'],
};

export const entityTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showWhen,
		},
		options: [
			{
				name: 'Create or Update Entity Type',
				value: 'createEntityType',
				action: 'Create or update entity type',
			},
			{
				name: 'Delete Entity Type',
				value: 'deleteEntityType',
				action: 'Delete entity type',
			},
			{
				name: 'Get Entity Type',
				value: 'getEntityType',
				action: 'Get entity type',
			},
			{
				name: 'Get Entity Type Version',
				value: 'getEntityTypeVersion',
				action: 'Get entity type version',
			},
			{
				name: 'Get Entity Types',
				value: 'getEntityTypes',
				action: 'Get entity types',
			},
		],
		default: 'getEntityType',
	},
	...createOrUpdateEntityTypeDescription,
	...deleteEntityTypeDescription,
	...getEntityTypesDescription,
	...getEntityTypeDescription,
	...getEntityTypeVersionDescription,
];
