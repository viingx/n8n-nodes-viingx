import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['getEntityHistory'],
    resource: ['entity'],
};

export const getEntityHistoryDescription: INodeProperties[] = [
    {
        displayName: 'Entity Type Name or ID',
        name: 'entityType',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
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
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
        description: 'Max number of results to return',
        default: 50,
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        typeOptions: {
            minValue: 0,
        },
        default: 0,
        displayOptions: {
            show: showWhen,
        },
    },
	{
		displayName: 'Sorting Direction',
		name: 'sortingDirection',
		type: 'options',
		default: 'des',
		displayOptions: {
			show: showWhen,
		},
		options: [
			{
				name: 'Ascending',
				value: 'asc',
			},
			{
				name: 'Descending',
				value: 'des',
			},
		],
	},
];
