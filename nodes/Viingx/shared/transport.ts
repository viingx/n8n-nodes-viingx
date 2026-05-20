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
    uri?: string,
    headers: IDataObject = {},
) {
    const credentials = await this.getCredentials('viingxApi');

    const options: IHttpRequestOptions = {
        method,
        body: body,
        qs,
        url: `${credentials.hostUrl}/api/v1.0${resource}`,
        json: true,
    };
    
    try {
        if (Object.keys(headers).length !== 0) {
            options.headers = Object.assign({}, options.headers, headers);
        }

        if (Object.keys(body).length === 0) {
            delete options.body;
        }

        return await this.helpers.httpRequestWithAuthentication.call(this, 'viingxApi', options);
    } catch (error) {
        throw new NodeApiError(this.getNode(), error as JsonObject);
    }
}