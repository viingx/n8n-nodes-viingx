import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['getLocales'],
    resource: ['locale'],
};

export const getLocalesDescription: INodeProperties[] = [
    {
        displayName: 'Query',
        name: 'query',
        type: 'json',
        default: `{"property": "locale.enabled", "op": "=", "value": true}`,
        description: 'Definition of query parameters in JSON. Empty value returns all locales. ”op“ values: “all|and|or|=|!=|&lt;|&lt;=|>|>=|text|exists|!exists”. Simple example:\n{"property": "locale.enabled", "op": "=", "value": true}\nComplex example:\n{"op": "and", "operands": [{"op": "text", "like": "test"}, {"property": "workflow.payload.state", "op": "=", "value": "created"}]}\nFulltext example:\n{"op": "text", "like": "ab"}\nExists example:\n{"property": "workflow.payload.assignee", "op": "exists"}',
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
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        typeOptions: {
            minValue: 0,
        },
        default: 0,
        displayOptions: {
            show: showWhen,
        },
    },
];
