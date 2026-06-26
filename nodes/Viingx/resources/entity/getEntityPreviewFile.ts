import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['getEntityPreviewFile'],
    resource: ['entity'],
};

export const getEntityPreviewFileDescription: INodeProperties[] = [
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
	{
		displayName: 'Preview',
		name: 'previewType',
		type: 'options',
		default: 'systemPreview',
		displayOptions: {
			show: showWhen,
		},
		options: [
			{
				name: 'Preview',
				value: 'systemPreview',
			},
			{
				name: 'High Preview',
				value: 'systemHighPreview',
			},
			{
				name: 'PDF Preview',
				value: 'systemPdfPreview',
			},
		],
	},
];
