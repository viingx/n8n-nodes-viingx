import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['deleteEntityLocalization'],
    resource: ['entityLocalization'],
};

export const deleteEntityLocalizationDescription: INodeProperties[] = [
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
        displayName: 'Version',
        name: 'version',
        type: 'number',
        description: 'Metadata version of the localization (metadata.version) or 0, if not exists',
        default: 0,
        required: true,
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Locale Name or ID',
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
];
