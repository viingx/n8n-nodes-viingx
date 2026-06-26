import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['getEntity'],
	resource: ['entity'],
};

export const getEntityDescription: INodeProperties[] = [
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
        displayName: 'Roots',
        name: 'roots',
        type: 'multiOptions',
        options: [
            {
                name: 'Content',
                value: 'content',
            },
            {
                name: 'Preview',
                value: 'preview',
            },
            {
                name: 'Workflow',
                value: 'workflow',
            },
            {
                name: 'Quality Gates',
                value: 'qualityGates',
            },
        ],
        default: [],
        displayOptions: {
            show: showWhen,
        },
    },
];
