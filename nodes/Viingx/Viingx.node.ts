import {
	NodeConnectionTypes,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { authorizationDescription as authenticationDescription } from './resources/authorization';
import { entityDescription as entityDescription } from './resources/entity';
import { viingxApiRequest } from './shared/transport';

export class Viingx implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'viingx',
		name: 'viingx',
		icon: 'file:../../icons/viingx.svg',
		group: ['input', 'output'],
		version: 1,
		description: 'Interface to viingx systems',
		usableAsTool: true,
		subtitle: '={{$parameter["operation"]}}',
		defaults: {
			name: 'viingx',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'viingxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.hostUrl}}/api/v1.0',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Authorization',
						value: 'authorization',
					},
					{
						name: 'Entity',
						value: 'entity',
					},
				],
				default: 'entity',
			},
			...authenticationDescription,
			...entityDescription,
		],
	};

	methods = {
		loadOptions: {
			// get all entity types
			async getEntityTypes(this: ILoadOptionsFunctions) {
				const json = await viingxApiRequest.call(
					this,
					'GET',
					'/types',
				);
				const returnData: INodePropertyOptions[] = json.result.map((item: { type: { ui: { label: { en: string; de: string; }; }; name: string; }; }) => ({
					name: item.type.ui.label.en ?? item.type.ui.label.de,
					value: item.type.name
				}));
				returnData.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
				return returnData;
			},
			// get all entity types
			async getAllEnabledLocales(this: ILoadOptionsFunctions) {
				const json = await viingxApiRequest.call(
					this,
					'GET',
					'/locales?offset=0&limit=100&query={"property": "locale.enabled", "op": "=", "value": true}&sorting=[{"property": "locale.locale", "direction": "asc"}]',
				);
				const returnData: INodePropertyOptions[] = json.result.map((item: { locale: { label: { en: string; de: string; }; locale: string; }; }) => ({
					name: item.locale.label.en ?? item.locale.label.de,
					value: item.locale.locale
				}));
				returnData.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
				return returnData;
			},
		},
	};

	/*
	// execute
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const responseData: INodeExecutionData[] = [];
		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i);
				switch (operation) {
					case "read": {
						const entityType = this.getNodeParameter('entityType', i) as string;
						const entityId = this.getNodeParameter('entityId', i) as string;	
						const entity = await viingxApiRequest.call(this, 'GET', `/types/${entityType}/entities/${entityId}`);
						const translationJsonArray = this.helpers.returnJsonArray([entity] as IDataObject[]);
						const executionData = this.helpers.constructExecutionMetaData(translationJsonArray, {
							itemData: {
								item: i
							},
						});
						responseData.push(...executionData);	
						break;
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = {
						json: {} as IDataObject,
						error: error.message,
						itemIndex: i,
					};
					responseData.push(executionErrorData as INodeExecutionData);
					continue;
				}
				throw error;
			}
		}
		return [responseData];
	}

	*/
}
