import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDeleteEntities = {
	operation: ['deleteEntity'],
	resource: ['entity'],
};

export const deleteEntityDescription: INodeProperties[] = [
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
            show: showOnlyForDeleteEntities,
        },
    },
    {
        displayName: 'Entity ID',
        name: 'entityId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showOnlyForDeleteEntities,
        },
    },
    {
        displayName: 'Entity Version',
        name: 'entityVersion',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: showOnlyForDeleteEntities,
        },
    },
];
