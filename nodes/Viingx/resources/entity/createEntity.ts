import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCreateEntities = {
	operation: ['createEntity'],
	resource: ['entity'],
};

export const createEntityDescription: INodeProperties[] = [
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
            show: showOnlyForCreateEntities,
        },
    },
    {
        displayName: 'Content Locale Name or ID',
        name: 'locale',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: '',
        required: true,
        typeOptions: {
            loadOptionsMethod: 'getAllEnabledLocales',
        },
        displayOptions: {
            show: showOnlyForCreateEntities,
        },
		routing: {
			send: {
				type: 'body',
				property: 'content.localization.locale',
			},
		},
    },
    {
        displayName: 'Payload',
        name: 'payload',
        type: 'json',
        default: '{}',
        required: true,
        displayOptions: {
            show: showOnlyForCreateEntities,
        },
		routing: {
			send: {
				type: 'body',
				property: 'content.payload',
				value: "={{typeof $value === 'string' ? JSON.parse($value) : $value}}",
			},
		},
    },
];
