import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['exportLayoutEntity'],
    resource: ['entity'],
};

export const exportLayoutEntityDescription: INodeProperties[] = [
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
    {
        displayName: 'Output Binary Property',
        name: 'binaryPropertyName',
        type: 'string',
        default: 'data',
        required: true,
        description: 'Name of the binary property to which to write the ZIP file',
        displayOptions: {
            show: showWhen,
        },
    },
];
