import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['executeGraphQl'],
    resource: ['graphQl'],
};

export const executeGraphQlDescription: INodeProperties[] = [
    {
        displayName: 'Operation Name',
        name: 'operationName',
        type: 'string',
        default: '',
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        default: '',
        required: true,
        typeOptions: {
            rows: 10,
        },
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Variables',
        name: 'variables',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: showWhen,
        },
    },
];
