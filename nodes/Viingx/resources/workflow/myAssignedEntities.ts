import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['myAssignedEntities'],
    resource: ['workflow'],
};

export const myAssignedEntitiesDescription: INodeProperties[] = [
    {
        displayName: 'Sorting',
        name: 'sorting',
        type: 'json',
        typeOptions: {
            rows: 3,
        },
        default: {},
        description: 'Definiton of sorting in JSON. Multiple sortings are possible. Direction values: “asc|des”. Example:\n[{"property": "content.payload.name", "direction": "asc"}]',
        displayOptions: {
            show: showWhen,
        },
    },
];
