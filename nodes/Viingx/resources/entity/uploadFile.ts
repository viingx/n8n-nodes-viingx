import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForUploadFile = {
	operation: ['uploadFile'],
	resource: ['entity'],
};

export async function prepareBinaryFileUpload(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const binaryPropertyName = this.getNodeParameter('binaryPropertyName') as string;
	const binaryData = this.helpers.assertBinaryData(binaryPropertyName);
	const binaryBuffer = await this.helpers.getBinaryDataBuffer(binaryPropertyName);
	const contentType =
		binaryData.mimeType || (this.getNodeParameter('contentType', 'application/octet-stream') as string);

	requestOptions.body = binaryBuffer;
	requestOptions.json = false;
	requestOptions.headers = {
		...requestOptions.headers,
		'Content-Type': contentType,
	};

	return requestOptions;
}

export const uploadFileDescription: INodeProperties[] = [
	{
		displayName: 'Input Binary Field',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the incoming binary field that contains the file to upload',
		displayOptions: {
			show: showOnlyForUploadFile,
		},
	},
	{
		displayName: 'Fallback Content Type',
		name: 'contentType',
		type: 'string',
		default: 'application/octet-stream',
		description: 'Content-Type header to use when the incoming binary item has no MIME type',
		displayOptions: {
			show: showOnlyForUploadFile,
		},
	},
];
