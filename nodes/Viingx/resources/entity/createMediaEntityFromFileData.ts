import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['createMediaEntityFromFileData'],
    resource: ['entity'],
};

export const createMediaEntityFromFileDataDescription: INodeProperties[] = [
    {
        displayName: 'Input Binary Field',
        name: 'fileDataName',
        type: 'string',
        default: 'data',
        required: true,
        description: 'Name of the incoming binary field that contains the file to upload',
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Content Locale Name or ID',
        name: 'contentLocale',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getLocaleOptions',
        },
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name for the created media entity. Maximum length is 250 characters.',
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Content Type',
        name: 'contentType',
        type: 'string',
        default: '',
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Field',
        displayOptions: {
            show: showWhen,
        },
        options: [
            {
                displayName: 'AI Area Of Interest',
                name: 'aiAreaOfInterest',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'AI Colours',
                name: 'aiColours',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'AI Description',
                name: 'aiDescription',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'AI Tags',
                name: 'aiTags',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'AI Tags Confidence',
                name: 'aiTagsConfidence',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 100,
                },
                default: 0,
            },
            {
                displayName: 'AI Tags Count',
                name: 'aiTagsCount',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 100,
                },
                default: 0,
            },
            {
                displayName: 'Map To User Editable Properties',
                name: 'mapToUserEditableProperties',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Metadata Locale',
                name: 'metadataLocale',
                type: 'options',
                options: [
                    {
                        name: 'English',
                        value: 'en',
                    },
                    {
                        name: 'German',
                        value: 'de',
                    },
                ],
                default: 'en',
            },
            {
                displayName: 'Upload Grouping',
                name: 'uploadGrouping',
                type: 'dateTime',
                default: '',
            },
        ],
    },
];
