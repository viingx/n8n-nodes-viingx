import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['uploadFile'],
	resource: ['entity'],
};

export const uploadFileDescription: INodeProperties[] = [
	{
		displayName: 'Input Binary Field',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the incoming binary field that contains the file to upload',
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'Fallback Content Type',
		name: 'contentType',
		type: 'string',
		default: 'application/octet-stream',
		description: 'Content-Type header to use when the incoming binary item has no MIME type',
		displayOptions: {
			show: showWhen,
		},
	},
];
