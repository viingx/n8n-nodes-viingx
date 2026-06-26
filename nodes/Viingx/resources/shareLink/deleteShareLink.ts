import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
    operation: ['deleteShareLink'],
    resource: ['shareLink'],
};

export const deleteShareLinkDescription: INodeProperties[] = [
    {
        displayName: 'Share Link ID',
        name: 'shareLinkId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showWhen,
        },
    },
];
