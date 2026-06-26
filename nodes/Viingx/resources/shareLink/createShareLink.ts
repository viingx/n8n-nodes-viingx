import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['createShareLink'],
    resource: ['shareLink'],
};

export const createShareLinkDescription: INodeProperties[] = [
    {
        displayName: 'Label',
        name: 'label',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showWhen,
        },
    },
    {
        displayName: 'File Name',
        name: 'fileName',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showWhen,
        },
    },
	{
		displayName: 'Expiry Date',
		name: 'expiryDate',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: showWhen,
		},
	},
    {
        displayName: 'Entries',
        name: 'entries',
        type: 'fixedCollection',
        default: {},
        placeholder: 'Add Entry',
        displayOptions: {
            show: showWhen,
        },
        typeOptions: {
            multipleValues: true,
        },
        options: [
            {
                name: 'values',
                displayName: 'Values',
                // eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
                values: [
                    {
                        displayName: 'Path',
                        name: 'path',
                        type: 'string',
                        default: '',
                        required: true,
                    },
                    {
                        displayName: 'Entity Type Name or ID',
                        name: 'type',
                        type: 'options',
                        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                        default: '',
                        required: true,
                        typeOptions: {
                            loadOptionsMethod: 'getEntityTypeOptions',
                        },
                    },
                    {
                        displayName: 'Entity ID',
                        name: 'entityId',
                        type: 'string',
                        default: '',
                        required: true,
                    },
                    {
                        displayName: 'Entity Version',
                        name: 'version',
                        type: 'number',
                        default: 0,
                    },
                    {
                        displayName: 'Entity File ID',
                        name: 'fileId',
                        type: 'string',
                        default: '',
                        required: true,
                    },
                ],
            },
        ],
    },
];
