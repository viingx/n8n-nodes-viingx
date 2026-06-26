import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['getLocale'],
    resource: ['locale'],
};

export const getLocaleDescription: INodeProperties[] = [
    {
        displayName: 'Locale Name or ID',
        name: 'locale',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: '',
        required: true,
        typeOptions: {
            loadOptionsMethod: 'getLocaleOptions',
        },
        displayOptions: {
            show: showWhen,
        },
    },
];
