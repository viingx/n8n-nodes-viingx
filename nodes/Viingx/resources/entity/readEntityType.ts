import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReadEntityType = {
	operation: ['readEntityType'],
	resource: ['entity'],
};

export const readEntityTypeDescription: INodeProperties[] = [
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
            show: showOnlyForReadEntityType,
        },
    },
];
