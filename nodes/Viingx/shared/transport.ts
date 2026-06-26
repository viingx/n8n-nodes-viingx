import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	JsonObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function viingxApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	headers: IDataObject = {},
) {
	const credentials = await this.getCredentials('viingxApi');

	const options: IHttpRequestOptions = {
		method,
		body: body,
		headers: headers,
		qs,
		url: buildViingxApiUrl(credentials.hostUrl, resource),
		json: true,
	};

    this.logger.error(JSON.stringify(options, undefined, "  "));

	try {
		if (Object.keys(headers).length !== 0) {
			options.headers = Object.assign({}, options.headers, headers);
		}
		if (Object.keys(body).length === 0) {
			delete options.body;
		}
		if (Object.keys(qs).length === 0) {
			delete options.qs;
		}
		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			'viingxApi',
			options,
		);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export function buildViingxApiUrl(hostUrl: unknown, resource: string): string {
	const normalizedHostUrl = String(hostUrl).replace(/\/+$/, '');
	const normalizedResource = resource.startsWith('/')
		? resource
		: `/${resource}`;

	return `${normalizedHostUrl}/api/v1.0${normalizedResource}`;
}
