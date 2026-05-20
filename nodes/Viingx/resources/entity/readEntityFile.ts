import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReadEntity = {
    operation: ['readEntityFile'],
    resource: ['entity'],
};

export const readEntityFileDescription: INodeProperties[] = [
    {
        displayName: 'Entity Type Name or ID',
        name: 'entityType',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: '',
        required: true,
        typeOptions: {
            loadOptionsMethod: 'getEntityTypes',
        },
        displayOptions: {
            show: showOnlyForReadEntity,
        },
    },
    {
        displayName: 'Entity ID',
        name: 'entityId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showOnlyForReadEntity,
        },
    },
    {
        displayName: 'Entity Version',
        name: 'entityVersion',
        type: 'number',
        default: 0,
        displayOptions: {
            show: showOnlyForReadEntity,
        },
    },
    {
        displayName: 'File ID',
        name: 'fileId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showOnlyForReadEntity,
        },
    },
    {
        displayName: 'Output Binary Property',
        name: 'binaryPropertyName',
        type: 'string',
        default: 'data',
        required: true,
        description: 'Name of the binary property to which to write the file',
        displayOptions: {
            show: showOnlyForReadEntity,
        },
    },
];
