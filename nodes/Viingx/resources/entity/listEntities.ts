import type { INodeProperties } from 'n8n-workflow';

const showOnlyForListEntities = {
	operation: ['listEntities'],
	resource: ['entity'],
};

export const listEntitiesDescription: INodeProperties[] = [
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
            show: showOnlyForListEntities,
        },
    },
    {
        displayName: 'Query',
        name: 'query',
        type: 'json',
        default: {},
        description: 'Definition of query parameters in JSON. Empty value returns all entities of given type. ”op“ values: “all|and|or|=|!=|&lt;|&lt;=|>|>=|text|exists|!exists”. Simple example:\n{"property": "content.payload.name", "op": "=", "value": "Test"}\nComplex example:\n{"op": "and", "operands": [{"op": "text", "like": "test"}, {"property": "workflow.payload.state", "op": "=", "value": "created"}]}\nFulltext example:\n{"op": "text", "like": "ab"}\nExists example:\n{"property": "workflow.payload.assignee", "op": "exists"}',
        displayOptions: {
            show: showOnlyForListEntities,
        },
		routing: {
			send: {
				type: 'query',
				property: 'query',
				value: "={{$value == '{}' ? '' : $value}}",
			},
		},
    },
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
            show: showOnlyForListEntities,
        },
		routing: {
			send: {
				type: 'query',
				property: 'sorting',
				value: "={{$value == '{}' ? '' : $value}}",
			},
		},
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
		description: 'Max number of results to return',
        default: 50,
        displayOptions: {
            show: showOnlyForListEntities,
        },
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
    },
];
