import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['getEntities'],
	resource: ['entity'],
};

export const getEntitiesDescription: INodeProperties[] = [
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
        displayName: 'Query',
        name: 'query',
        type: 'json',
        default: {},
        description: 'Definition of query parameters in JSON. Empty value returns all entities of given type. ”op“ values: “all|and|or|=|!=|&lt;|&lt;=|>|>=|text|exists|!exists”. Simple example:\n{"property": "content.payload.name", "op": "=", "value": "Test"}\nComplex example:\n{"op": "and", "operands": [{"op": "text", "like": "test"}, {"property": "workflow.payload.state", "op": "=", "value": "created"}]}\nFulltext example:\n{"op": "text", "like": "ab"}\nExists example:\n{"property": "workflow.payload.assignee", "op": "exists"}',
        displayOptions: {
            show: showWhen,
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
            show: showWhen,
        },
    },
    {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        typeOptions: {
            minValue: 0,
        },
		description: 'Offset of results to return',
        default: 0,
        displayOptions: {
            show: showWhen,
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
            show: showWhen,
        },
    },
    {
        displayName: 'Roots',
        name: 'roots',
        type: 'multiOptions',
        options: [
            {
                name: 'Content',
                value: 'content',
            },
            {
                name: 'Preview',
                value: 'preview',
            },
            {
                name: 'Workflow',
                value: 'workflow',
            },
            {
                name: 'Quality Gates',
                value: 'qualityGates',
            },
        ],
        default: [],
        displayOptions: {
            show: showWhen,
        },
    },
];
