import type { INodeProperties } from 'n8n-workflow';

const showWhen = {
	operation: ['createSignedUrls'],
	resource: ['authorization'],
};

export const createSignedUrlsDescription: INodeProperties[] = [
	{
		displayName: 'Expiry Date',
		name: 'expiryDate',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: showWhen,
		},
	},
	{
		displayName: 'URLs',
		name: 'urls',
		type: 'string',
		default: [],
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add URL',
		},
		displayOptions: {
			show: showWhen,
		},
	},
];
