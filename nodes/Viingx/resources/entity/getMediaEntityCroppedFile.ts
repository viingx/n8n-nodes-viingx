import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['getMediaEntityCroppedFile'],
    resource: ['entity'],
};

export const getMediaEntityCroppedFileDescription: INodeProperties[] = [
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
        displayName: 'Crop Name or ID',
        name: 'cropName',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: '',
        required: true,
        typeOptions: {
            loadOptionsMethod: 'getCropOptions',
        },
        displayOptions: {
            show: showWhen,
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
            show: showWhen,
        },
    },
];
