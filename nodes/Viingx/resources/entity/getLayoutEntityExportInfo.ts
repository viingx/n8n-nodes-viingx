import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['getLayoutEntityExportInfo'],
    resource: ['entity'],
};

export const getLayoutEntityExportInfoDescription: INodeProperties[] = [
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
];
