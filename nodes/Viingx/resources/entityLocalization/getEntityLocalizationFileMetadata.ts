import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['getEntityLocalizationFileMetadata'],
    resource: ['entityLocalization'],
};

export const getEntityLocalizationFileMetadataDescription: INodeProperties[] = [
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
        displayName: 'File ID',
        name: 'fileId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showWhen,
        },
    },
];
