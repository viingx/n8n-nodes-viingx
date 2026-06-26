import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['getEntityTypes'],
	resource: ['entityType'],
};

export const getEntityTypesDescription: INodeProperties[] = [
    {
        displayName: 'Offset',
        name: 'offset',
        description: 'Offset of results. First result = 0. Empty value starts at first result.',
        type: 'number',
        default: 0,
        typeOptions: {
            maxValue: 10000,
            minValue: 0,
            numberPrecision: 0,
        },
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        description: 'Max number of results to return',
        type: 'number',
        default: 50,
        typeOptions: {
            maxValue: 10000,
            minValue: 1,
            numberPrecision: 0,
        },
        displayOptions: {
            show: showWhen,
        },
    },
];
