import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['createEntity'],
	resource: ['entity'],
};

export const createEntityDescription: INodeProperties[] = [
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
        displayName: 'Content Locale Name or ID',
        name: 'locale',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: '',
        required: true,
        typeOptions: {
            loadOptionsMethod: 'getLocaleOptions',
        },
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Payload',
        name: 'payload',
        type: 'json',
        default: '{}',
        required: true,
        displayOptions: {
            show: showWhen,
        },
    },
];
