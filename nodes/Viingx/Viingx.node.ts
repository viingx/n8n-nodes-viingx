import {
    NodeConnectionTypes,
    NodeOperationError,
    type IDataObject,
    type IExecuteFunctions,
    type IHttpRequestMethods,
    type IHttpRequestOptions,
    type ILoadOptionsFunctions,
    type INodeExecutionData,
    type INodePropertyOptions,
    type INodeType,
    type INodeTypeDescription,
} from "n8n-workflow";
import { authorizationDescription } from "./resources/authorization";
import { entityDescription } from "./resources/entity";
import { entityLocalizationDescription } from "./resources/entityLocalization";
import { entityTypeDescription } from "./resources/entityType";
import { graphQlDescription } from "./resources/graphQl";
import { localeDescription } from "./resources/locale";
import { settingDescription } from "./resources/setting";
import { shareLinkDescription } from "./resources/shareLink";
import { workflowDescription } from "./resources/workflow";
import {
    executeViingxResponse,
    responseDescription,
    sendViingxResponseError,
} from "./resources/response";
import { buildViingxApiUrl, viingxApiRequest } from "./shared/transport";

type ViingxResource =
    | "authorization"
    | "entity"
    | "entityLocalization"
    | "entityType"
    | "graphQl"
    | "locale"
    | "response"
    | "setting"
    | "shareLink"
    | "workflow";
type LocalizedLabel = {
    de?: string;
    en?: string;
};
type WorkflowOption = {
    displayName?: string;
    email?: string;
    id?: string;
    label?: string | LocalizedLabel;
    locale?: {
        label?: LocalizedLabel;
    };
    name?: string;
    state?: string;
    userId?: string;
};
type WorkflowDefinition = {
    assignees?: WorkflowOption[];
    states?: WorkflowOption[];
    users?: WorkflowOption[];
};

export class Viingx implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Viingx",
        name: "viingx",
        icon: "file:../../icons/viingx.svg",
        group: ["input", "output"],
        version: 1,
        description: "Interface to viingx systems",
        usableAsTool: true,
        subtitle: '={{$parameter["operation"]}}',
        defaults: {
            name: "viingx",
        },
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        credentials: [
            {
                name: "viingxApi",
                required: true,
                displayOptions: {
                    hide: {
                        resource: ["response"],
                    },
                },
            },
        ],
        requestDefaults: {
            baseURL: "={{$credentials.hostUrl}}/api/v1.0",
        },
        properties: [
            {
                displayName: "Resource",
                name: "resource",
                type: "options",
                noDataExpression: true,
                options: [
                    {
                        name: "Authorization",
                        value: "authorization",
                    },
                    {
                        name: "Entity",
                        value: "entity",
                    },
                    {
                        name: "Entity Localization",
                        value: "entityLocalization",
                    },
                    {
                        name: "Entity Type",
                        value: "entityType",
                    },
                    {
                        name: "GraphQL",
                        value: "graphQl",
                    },
                    {
                        name: "Locale",
                        value: "locale",
                    },
                    {
                        name: "Response",
                        value: "response",
                    },
                    {
                        name: "Setting",
                        value: "setting",
                    },
                    {
                        name: "Share Link",
                        value: "shareLink",
                    },
                    {
                        name: "Workflow",
                        value: "workflow",
                    },
                ],
                default: "entity",
            },
            ...authorizationDescription,
            ...entityDescription,
            ...entityLocalizationDescription,
            ...entityTypeDescription,
            ...graphQlDescription,
            ...localeDescription,
            ...settingDescription,
            ...shareLinkDescription,
            ...responseDescription,
            ...workflowDescription,
        ],
    };

    methods = {
        loadOptions: {
            // entity type options
            async getEntityTypeOptions(this: ILoadOptionsFunctions) {
                try {
                    const json = await viingxApiRequest.call(this, "GET", "/types");
                    const returnData: INodePropertyOptions[] = json.result.map(
                        (item: {
                            type: { ui: { label: { en: string; de: string } }; name: string };
                            name?: string;
                        }) => ({
                            name: item.type.ui.label.en ?? item.type.ui.label.de ?? item.type.name,
                            value: item.type.name,
                        }),
                    );
                    returnData.sort((a, b) => a.name.localeCompare(b.name));
                    return returnData;
                } catch (error) {
                    throw new NodeOperationError(
                        this.getNode(),
                        error instanceof Error ? error.message : String(error),
                        { description: 'Failed to load entity type options' },
                    );
                }
            },
            // crop options
            async getCropOptions(this: ILoadOptionsFunctions) {
                const json = await viingxApiRequest.call(
                    this,
                    "GET",
                    "/settings/system",
                );
                const returnData: INodePropertyOptions[] =
                    json.setting.mediaCropDefinitions.map(
                        (item: {
                            label: { en: string; de: string; };
                            name?: string;
                        }) => ({
                            name: item.label.en ?? item.label.de ?? item.name,
                            value: item.name,
                        }),
                    );
                returnData.sort((a, b) => a.name.localeCompare(b.name));
                return returnData;
            },
            // derivative options
            async getDerivativeOptions(this: ILoadOptionsFunctions) {
                const json = await viingxApiRequest.call(
                    this,
                    "GET",
                    "/files/derivativeDefinitions",
                );
                const returnData: INodePropertyOptions[] = json.result.map(
                    (item: {
                        derivative: { ui: { label: { en: string; de: string } }; name: string };
                        name?: string;
                    }) => ({
                        name: item.derivative.ui.label.en ?? item.derivative.ui.label.de ?? item.name,
                        value: item.derivative.name,
                    }),
                );
                returnData.sort((a, b) => a.name.localeCompare(b.name));
                return returnData;
            },
            // locale options
            async getLocaleOptions(this: ILoadOptionsFunctions) {
                const json = await viingxApiRequest.call(
                    this,
                    "GET",
                    "/locales",
                    {},
                    {
                        limit: 100,
                        offset: 0,
                        query: '{"property": "locale.enabled", "op": "=", "value": true}',
                        sorting: '[{"property": "locale.locale", "direction": "asc"}]',
                    },
                );
                const returnData: INodePropertyOptions[] = json.result.map(
                    (item: {
                        locale: { label: { en: string; de: string }; locale: string };
                        name?: string;
                    }) => ({
                        name: item.locale.label.en ?? item.locale.label.de ?? item.name,
                        value: item.locale.locale,
                    }),
                );
                returnData.sort((a, b) => a.name.localeCompare(b.name));
                return returnData;
            },
            // localization status options
            async getLocalizationStatusOptions (this: ILoadOptionsFunctions) {
                return [
                    {
                        name: "Outdated",
                        value: "outdated",
                    },
                    {
                        name: "In Progress",
                        value: "inprogress",
                    },
                    {
                        name: "Localized",
                        value: "localized",
                    },
                ]
            },
            // workflow state options
            async getWorkflowStateOptions(this: ILoadOptionsFunctions) {
                return await getWorkflowOptions.call(this, "states");
            },
            // workflow assignee options
            async getWorkflowAssigneeOptions(this: ILoadOptionsFunctions) {
                return await getWorkflowOptions.call(this, "assignees");
            },
        },
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const resource = this.getNodeParameter("resource", 0) as ViingxResource;

        if (resource === "response") {
            try {
                return await executeViingxResponse.call(this);
            } catch (error) {
                if (this.continueOnFail()) {
                    return sendViingxResponseError.call(this, error);
                }

                throw error;
            }
        }

        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                const response = await executeViingxApiOperation.call(this, itemIndex);

                returnData.push(...toExecutionData.call(this, response, itemIndex));
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error instanceof Error ? error.message : "Unknown error",
                        },
                        pairedItem: {
                            item: itemIndex,
                        },
                    });
                    continue;
                }

                throw error;
            }
        }

        return [returnData];
    }
}

async function executeViingxApiOperation(
    this: IExecuteFunctions,
    itemIndex: number,
): Promise<IDataObject | IDataObject[] | INodeExecutionData> {
    const resource = this.getNodeParameter(
        "resource",
        itemIndex,
    ) as ViingxResource;
    const operation = this.getNodeParameter("operation", itemIndex) as string;

    if (resource === "authorization") {
        return await executeAuthorizationOperation.call(this, operation, itemIndex);
    }

    if (resource === "entity") {
        return await executeEntityOperation.call(this, operation, itemIndex);
    }

    if (resource === "entityLocalization") {
        return await executeEntityLocalizationOperation.call(this, operation, itemIndex);
    }

    if (resource === "entityType") {
        return await executeEntityTypeOperation.call(this, operation, itemIndex);
    }

    if (resource === "graphQl") {
        return await executeGraphQlOperation.call(this, operation, itemIndex);
    }

    if (resource === "locale") {
        return await executeLocaleOperation.call(this, operation, itemIndex);
    }

    if (resource === "setting") {
        return await executeSettingOperation.call(this, operation);
    }

    if (resource === "shareLink") {
        return await executeShareLinkOperation.call(this, operation, itemIndex);
    }

    if (resource === "workflow") {
        return await executeWorkflowOperation.call(this, operation, itemIndex);
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported resource: ${resource}`,
    );
}

async function executeAuthorizationOperation(
    this: IExecuteFunctions,
    operation: string,
    itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
    if (operation === "createSignedUrls") {
        const expires = this.getNodeParameter("expiryDate", itemIndex) as string;
        const urls = this.getNodeParameter("urls", itemIndex) as string[];
        return (await viingxApiRequest.call(
            this,
            "POST",
            "/auth/signURLs",
            {
                expires: expires ?? undefined,
                urls: urls,
                mode: "apiKey",
            },
        )) as IDataObject;
    }

    if (operation === "getUserProfile") {
        return (await viingxApiRequest.call(
            this,
            "GET",
            "/auth/profile",
        )) as IDataObject;
    }

    if (operation === "getUserProfiles") {
        return (await viingxApiRequest.call(
            this,
            "GET",
            "/auth/profiles",
        )) as IDataObject;
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported authorization operation: ${operation}`,
    );
}

async function executeEntityOperation(
    this: IExecuteFunctions,
    operation: string,
    itemIndex: number,
): Promise<IDataObject | IDataObject[] | INodeExecutionData> {
    const entityType = this.getNodeParameter(
        "entityType",
        itemIndex,
        "",
    ) as string;

    if (operation === "createEntity") {
        const locale = this.getNodeParameter("locale", itemIndex) as string;
        const payload = getJsonParameter.call(this, "payload", itemIndex);
        return (await viingxApiRequest.call(
            this,
            "POST",
            `/types/${entityType}/entities`,
            {
                content: {
                    localization: {
                        locale,
                    },
                    payload,
                },
            },
        )) as IDataObject;
    }

    if (operation === "createMediaEntityFromFileData") {
        const fileDataName = this.getNodeParameter("fileDataName", itemIndex) as string;
        const contentType = this.getNodeParameter("contentType", itemIndex) as string;
        this.helpers.assertBinaryData(itemIndex, fileDataName);
        const binaryBuffer = await this.helpers.getBinaryDataBuffer(itemIndex, fileDataName);
        const credentials = await this.getCredentials("viingxApi");
        const options: IHttpRequestOptions = {
            method: "POST",
            url: buildViingxApiUrl(
                credentials.hostUrl,
                "/types/systemMedia/entities/createFromUpload",
            ),
            body: binaryBuffer,
            qs: getAiAdditionalProperties.call(this, itemIndex),
            json: false,
            headers: {
                "Content-Type": contentType,
            },
        };
        if (Object.keys(options.qs ?? {}).length === 0) {
            delete options.qs;
        }
        const response = (await this.helpers.httpRequestWithAuthentication.call(
            this,
            "viingxApi",
            options,
        )) as IDataObject | string;
        if (typeof response !== "string") {
            return response;
        }

        try {
            return JSON.parse(response) as IDataObject;
        } catch {
            return {
                data: response,
            };
        }
    }

    if (operation === "deleteEntity") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const entityVersion = this.getNodeParameter("entityVersion", itemIndex) as number;
        return (await viingxApiRequest.call(
            this,
            "DELETE",
            `/types/${entityType}/entities/${entityId}`,
            {},
            {},
            {
                "If-Match": entityVersion,
            },
        )) as IDataObject;
    }

    if (operation === "exportLayoutEntity") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        return await readBinaryEndpoint.call(
            this,
            `/types/systemLayouts/entities/${entityId}/export`,
            `${entityId}-layout-export.zip`,
            itemIndex,
            {},
            "GET",
        );
    }

    if (operation === "getEntities") {
        const query = getOptionalJsonQueryParameter.call(this, "query", itemIndex);
        const sorting = getOptionalJsonQueryParameter.call(this, "sorting", itemIndex);
        const offset = this.getNodeParameter("offset", itemIndex, 0) as number;
        const limit = this.getNodeParameter("limit", itemIndex, 50) as number;
        const roots = this.getNodeParameter("roots", itemIndex, []) as [];
        const qs: IDataObject = {
            query: query ?? undefined,
            sorting: sorting ?? undefined,
            offset: offset ?? undefined,
            limit: limit ?? undefined,
            roots: (roots != null && roots.length > 0) ? roots.join(",") : undefined,
        };
        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities`,
            {},
            qs,
        )) as IDataObject;
    }

    if (operation === "getEntity") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const roots = this.getNodeParameter("roots", itemIndex, []) as string[];
        const qs: IDataObject = {
            roots: (roots != null && roots.length > 0) ? roots.join(",") : undefined,
        };
        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities/${entityId}`,
            {},
            qs,
        )) as IDataObject;
    }

    if (operation === "getEntityDerivativeFile") {
        const fileId = this.getNodeParameter("fileId", itemIndex) as string;
        const derivativeName = this.getNodeParameter("derivativeName", itemIndex) as string;

        return await readBinaryEndpoint.call(
            this,
            `${getEntityFileResource.call(this, entityType, itemIndex)}/derivatives/${derivativeName}`,
            `${fileId}-${derivativeName}`,
            itemIndex,
            getEntityVersionQuery.call(this, itemIndex),
        );
    }

    if (operation === "getEntityFile") {
        return await readEntityFile.call(this, entityType, itemIndex);
    }

    if (operation === "getEntityFileDerivatives") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const fileId = this.getNodeParameter("fileId", itemIndex) as string;
        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities/${entityId}/files/${fileId}/derivatives`,
            {},
            getEntityVersionQuery.call(this, itemIndex),
        )) as IDataObject;
    }

    if (operation === "getEntityFileMetadata") {
        return (await viingxApiRequest.call(
            this,
            "GET",
            `${getEntityFileResource.call(this, entityType, itemIndex)}/metadata`,
            {},
            getEntityVersionQuery.call(this, itemIndex),
        )) as IDataObject;
    }

    if (operation === "getEntityHistory") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const sortingDirection = this.getNodeParameter("sortingDirection", itemIndex, "des") as string;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities/${entityId}/history`,
            {},
            {
                limit: this.getNodeParameter("limit", itemIndex, 50) as number,
                offset: this.getNodeParameter("offset", itemIndex, 0) as number,
                sorting: JSON.stringify([
                    {
                        property: "metadata.version",
                        direction: sortingDirection,
                    },
                ]),
            },
        )) as IDataObject;
    }

    if (operation === "getEntityPreviewFile") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const previewType = this.getNodeParameter("previewType", itemIndex) as string;

        return await readBinaryEndpoint.call(
            this,
            `/types/${entityType}/entities/${entityId}/previews/${previewType}`,
            previewType,
            itemIndex,
        );
    }

    if (operation === "getLayoutEntityExportInfo") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/systemLayouts/entities/${entityId}/exportInfo`,
        )) as IDataObject;
    }

    if (operation === "getMediaEntityCroppedFile") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const cropName = this.getNodeParameter("cropName", itemIndex) as string;

        return await readBinaryEndpoint.call(
            this,
            `/types/${entityType}/entities/${entityId}/crops/${cropName}`,
            cropName,
            itemIndex,
        );
    }

    if (operation === "patchEntity") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "PATCH",
            `/types/${entityType}/entities/${entityId}`,
        )) as IDataObject;
    }

    if (operation === "suggestMediaEntityPayloadFromEntityFile") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const fileId = this.getNodeParameter("fileId", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities/${entityId}/files/${fileId}/suggestMedia`,
        )) as IDataObject;
    }

    if (operation === "suggestMediaEntityPayloadFromFileData") {
        const fileDataName = this.getNodeParameter("fileDataName", itemIndex) as string;
        const contentType = this.getNodeParameter("contentType", itemIndex, "application/octet-stream") as string;
        const metadataLocale = this.getNodeParameter("metadataLocale", itemIndex) as string;
        const credentials = await this.getCredentials("viingxApi");
        const inputItem = this.getInputData()[itemIndex] as INodeExecutionData;
        const hasBinary = inputItem.binary !== undefined && fileDataName in inputItem.binary;
        const options: IHttpRequestOptions = {
            method: "POST",
            url: buildViingxApiUrl(
                credentials.hostUrl,
                "/types/systemMedia/entities/suggestFromUpload",
            ),
            qs: { ...getAiAdditionalProperties.call(this, itemIndex), metadataLocale },
            json: false,
        };
        if (hasBinary) {
            this.helpers.assertBinaryData(itemIndex, fileDataName);
            options.body = await this.helpers.getBinaryDataBuffer(itemIndex, fileDataName);
            options.headers = { "Content-Type": contentType };
        }
        if (Object.keys(options.qs ?? {}).length === 0) {
            delete options.qs;
        }
        /*
        const logOptions = structuredClone(options);
        delete logOptions.body;
        this.logger.error(JSON.stringify(logOptions, undefined, "  "));
        */
        const suggestResponse = (await this.helpers.httpRequestWithAuthentication.call(
            this,
            "viingxApi",
            options,
        )) as IDataObject | string;
        if (typeof suggestResponse !== "string") {
            return suggestResponse;
        }
        try {
            return JSON.parse(suggestResponse) as IDataObject;
        } catch {
            return { data: suggestResponse };
        }
    }

    if (operation === "updateEntity") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "PUT",
            `/types/${entityType}/entities/${entityId}`,
        )) as IDataObject;
    }

    if (operation === "updateMediaEntityFromFileData") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const fileDataName = this.getNodeParameter("fileDataName", itemIndex) as string;
        const contentType = this.getNodeParameter("contentType", itemIndex, "application/octet-stream") as string;
        this.helpers.assertBinaryData(itemIndex, fileDataName);
        const binaryBuffer = await this.helpers.getBinaryDataBuffer(itemIndex, fileDataName);
        const credentials = await this.getCredentials("viingxApi");
        const qs = getAiAdditionalProperties.call(this, itemIndex);
        const options: IHttpRequestOptions = {
            method: "POST",
            url: buildViingxApiUrl(
                credentials.hostUrl,
                `/types/systemMedia/entities/${entityId}/updateFromUpload`,
            ),
            body: binaryBuffer,
            qs: Object.keys(qs).length > 0 ? qs : undefined,
            json: false,
            headers: {
                "Content-Type": contentType,
            },
        };
        const response = (await this.helpers.httpRequestWithAuthentication.call(
            this,
            "viingxApi",
            options,
        )) as IDataObject | string | undefined;
        if (!response || response === "") {
            return { success: true };
        }
        if (typeof response !== "string") {
            return response;
        }
        try {
            return JSON.parse(response) as IDataObject;
        } catch {
            return { data: response };
        }
    }

    if (operation === "uploadFile") {
        return await uploadFile.call(this, itemIndex);
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported entity operation: ${operation}`,
    );
}

async function executeEntityLocalizationOperation(
    this: IExecuteFunctions,
    operation: string,
    itemIndex: number,
): Promise<IDataObject | IDataObject[] | INodeExecutionData> {
    const entityType = this.getNodeParameter("entityType", itemIndex) as string;

    if (operation === "createOrUpdateEntityLocalization") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const locale = this.getNodeParameter("locale", itemIndex) as string;
        const version = this.getNodeParameter("version", itemIndex, 0) as number;
        const localizationVersion = this.getNodeParameter("localizationVersion", itemIndex, 0) as number;
        const localizationStatus = this.getNodeParameter("localizationStatus", itemIndex, 0);
        const payload = getJsonParameter.call(this, "payload", itemIndex);
        const body: IDataObject = {
            content: {
                metadata: {
                    version: version,
                },
                localization: {
                    locale,
                    localizationVersion: localizationVersion,
                    localizationStatus: localizationStatus,
                },
                payload,
            },
        };

        return (await viingxApiRequest.call(
            this,
            "PUT",
            `/types/${entityType}/entities/${entityId}/localizations/${locale}`,
            body,
        )) as IDataObject;
    }

    if (operation === "deleteEntityLocalization") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const locale = this.getNodeParameter("locale", itemIndex) as string;
        const version = this.getNodeParameter(
            "version",
            itemIndex,
        ) as number;

        return (await viingxApiRequest.call(
            this,
            "DELETE",
            `/types/${entityType}/entities/${entityId}/localizations/${locale}`,
            {},
            {},
            {
                "If-Match": version,
            },
        )) as IDataObject;
    }

    if (operation === "getEntityLocalization") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const locale = this.getNodeParameter("locale", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities/${entityId}/localizations/${locale}`,
        )) as IDataObject;
    }

    if (operation === "getEntityLocalizationFile") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const locale = this.getNodeParameter("locale", itemIndex) as string;
        const fileId = this.getNodeParameter("fileId", itemIndex) as string;

        return await readBinaryEndpoint.call(
            this,
            `/types/${entityType}/entities/${entityId}/localizations/${locale}/files/${fileId}`,
            fileId,
            itemIndex,
        );
    }

    if (operation === "getEntityLocalizationFileMetadata") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const locale = this.getNodeParameter("locale", itemIndex) as string;
        const fileId = this.getNodeParameter("fileId", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities/${entityId}/localizations/${locale}/files/${fileId}/metadata`,
        )) as IDataObject;
    }

    if (operation === "getEntityLocalizations") {
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities/${entityId}/localizations`,
        )) as IDataObject;
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported entity localization operation: ${operation}`,
    );
}

async function executeEntityTypeOperation(
    this: IExecuteFunctions,
    operation: string,
    itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
    if (
        operation === "createEntityType" ||
        operation === "createOrUpdateEntityType"
    ) {
        const name = this.getNodeParameter("name", itemIndex) as string;
        const version = this.getNodeParameter("version", itemIndex, 0) as number;
        const body = getJsonParameter.call(this, "body", itemIndex);
        const headers: IDataObject = {};

        if (version > 0) {
            headers["If-Match"] = version;
        }

        return (await viingxApiRequest.call(
            this,
            "PUT",
            `/types/${name}`,
            body,
            {},
            headers,
        )) as IDataObject;
    }

    if (operation === "deleteEntityType") {
        const entityType = this.getNodeParameter("entityType", itemIndex) as string;
        const version = this.getNodeParameter("version", itemIndex) as number;

        return (await viingxApiRequest.call(
            this,
            "DELETE",
            `/types/${entityType}`,
            {},
            {},
            {
                "If-Match": version,
            },
        )) as IDataObject;
    }

    if (operation === "getEntityType") {
        const entityType = this.getNodeParameter("entityType", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}`,
        )) as IDataObject;
    }

    if (operation === "getEntityTypes") {
        return (await viingxApiRequest.call(
            this,
            "GET",
            "/types",
            {},
            {
                limit: this.getNodeParameter("limit", itemIndex, 50) as number,
                offset: this.getNodeParameter("offset", itemIndex, 0) as number,
            },
        )) as IDataObject;
    }

    if (operation === "getEntityTypeVersion") {
        const entityType = this.getNodeParameter("entityType", itemIndex) as string;
        const version = this.getNodeParameter("version", itemIndex) as number;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/versions/${version}`,
        )) as IDataObject;
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported entity type operation: ${operation}`,
    );
}

async function executeGraphQlOperation(
    this: IExecuteFunctions,
    operation: string,
    itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
    if (operation === "executeGraphQl") {
        const operationName = this.getNodeParameter("operationName", itemIndex) as string;
        const variables = getOptionalJsonQueryParameter.call(this, "variables", itemIndex);
        const query = this.getNodeParameter("query", itemIndex) as string;
        return (await viingxApiRequest.call(this, "POST", "/graphql", {
            operationName: operationName || undefined,
            query: query,
            variables: variables,
        })) as IDataObject;
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported GraphQL operation: ${operation}`,
    );
}

async function executeLocaleOperation(
    this: IExecuteFunctions,
    operation: string,
    itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
    if (operation === "getLocale") {
        const locale = this.getNodeParameter("locale", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/locales/${locale}`,
        )) as IDataObject;
    }

    if (operation === "getLocales") {
        const qs: IDataObject = {
            limit: this.getNodeParameter("limit", itemIndex, 50) as number,
            offset: this.getNodeParameter("offset", itemIndex, 0) as number,
        };
        const query = getOptionalJsonQueryParameter.call(this, "query", itemIndex);
        const sorting = getOptionalJsonQueryParameter.call(this, "sorting", itemIndex);

        if (query !== undefined) {
            qs.query = query;
        }
        if (sorting !== undefined) {
            qs.sorting = sorting;
        }

        return (await viingxApiRequest.call(
            this,
            "GET",
            "/locales",
            {},
            qs,
        )) as IDataObject;
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported locale operation: ${operation}`,
    );
}

async function executeSettingOperation(
    this: IExecuteFunctions,
    operation: string,
): Promise<IDataObject | IDataObject[]> {
    if (operation === "getSystemSettings") {
        return (await viingxApiRequest.call(
            this,
            "GET",
            "/settings/system",
        )) as IDataObject;
    }

    if (operation === "getUserSettings") {
        return (await viingxApiRequest.call(
            this,
            "GET",
            "/settings/users/self",
        )) as IDataObject;
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported setting operation: ${operation}`,
    );
}

async function executeShareLinkOperation(
    this: IExecuteFunctions,
    operation: string,
    itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
    if (operation === "createShareLink") {
        const expiry = this.getNodeParameter("expiryDate", itemIndex, "") as string;
        const entries = this.getNodeParameter("entries", itemIndex, {}) as {values?: IDataObject[]};
        const body: IDataObject = {
            type: "download",
            label: this.getNodeParameter("label", itemIndex) as string,
            fileName: this.getNodeParameter("fileName", itemIndex) as string,
            entries: entries.values ?? [],
        };

        if (expiry !== "") {
            (body as IDataObject).expiry = expiry + "Z";
        }

        return (await viingxApiRequest.call(
            this,
            "POST",
            "/shareLinks",
            body,
        )) as IDataObject;
    }

    if (operation === "deleteShareLink") {
        const shareLinkId = this.getNodeParameter("shareLinkId", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "DELETE",
            `/shareLinks/${shareLinkId}`,
        )) as IDataObject;
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported share link operation: ${operation}`,
    );
}

async function executeWorkflowOperation(
    this: IExecuteFunctions,
    operation: string,
    itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
    if (operation === "getEntityWorkflowComments") {
        const entityType = this.getNodeParameter("entityType", itemIndex) as string;
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "GET",
            `/types/${entityType}/entities/${entityId}/workflow/comments`,
        )) as IDataObject;
    }

    if (operation === "myAssignedEntities") {
        const qs: IDataObject = {};
        const sorting = getOptionalJsonQueryParameter.call(this, "sorting", itemIndex);

        if (sorting !== undefined) {
            qs.sorting = sorting;
        }

        return (await viingxApiRequest.call(
            this,
            "GET",
            "/myAssignedEntities",
            {},
            qs,
        )) as IDataObject;
    }

    if (operation === "suggestWorkflowAssignees") {
        const entityType = this.getNodeParameter("entityType", itemIndex) as string;
        const entityIds = this.getNodeParameter("entityIds", itemIndex, []) as string[];
        const workflowState = this.getNodeParameter("workflowState", itemIndex) as string;
        const workflowAssignee = this.getNodeParameter("workflowAssignee", itemIndex) as string;

        return (await viingxApiRequest.call(
            this,
            "POST",
            `/types/${entityType}/workflow/suggestAssignees`,
            {
                entityIds,
                workflowState,
                workflowAssignee,
            },
        )) as IDataObject;
    }

    if (operation === "suggestWorkflowStates" || operation === "suggestStates") {
        const entityType = this.getNodeParameter("entityType", itemIndex) as string;
        const entityIds = this.getNodeParameter("entityIds", itemIndex, []) as string[];

        return (await viingxApiRequest.call(
            this,
            "POST",
            `/types/${entityType}/workflow/suggestStates`,
            {
                entityIds,
            },
        )) as IDataObject;
    }

    if (operation === "updateEntityWorkflow") {
        const entityType = this.getNodeParameter("entityType", itemIndex) as string;
        const entityId = this.getNodeParameter("entityId", itemIndex) as string;
        const version = this.getNodeParameter("entityWorkflowVersion", itemIndex) as number;
        const workflowState = this.getNodeParameter("workflowState", itemIndex) as string;
        const workflowAssignee = this.getNodeParameter("workflowAssignee", itemIndex, "") as string;
        const workflowDeadline = this.getNodeParameter("workflowDeadline", itemIndex, "") as string;
        const workflowComment = this.getNodeParameter("workflowComment", itemIndex, "") as string;
        const payload: IDataObject = {
            state: workflowState,
        };

        if (workflowAssignee !== "") {
            payload.assignee = workflowAssignee;
        }
        if (workflowDeadline !== "") {
            payload.deadline = workflowDeadline;
        }
        if (workflowComment !== "") {
            payload.comment = workflowComment;
        }

        return (await viingxApiRequest.call(
            this,
            "PUT",
            `/types/${entityType}/entities/${entityId}/workflow`,
            {
                metadata: {
                    version,
                },
                payload,
            },
        )) as IDataObject;
    }

    throw new NodeOperationError(
        this.getNode(),
        `Unsupported workflow operation: ${operation}`,
    );
}

async function readEntityFile(
    this: IExecuteFunctions,
    entityType: string,
    itemIndex: number,
): Promise<INodeExecutionData> {
    const fileId = this.getNodeParameter("fileId", itemIndex) as string;
    return await readBinaryEndpoint.call(
        this,
        getEntityFileResource.call(this, entityType, itemIndex),
        fileId,
        itemIndex,
        getEntityVersionQuery.call(this, itemIndex),
    );
}

function getEntityFileResource(
    this: IExecuteFunctions,
    entityType: string,
    itemIndex: number,
): string {
    const entityId = this.getNodeParameter("entityId", itemIndex) as string;
    const fileId = this.getNodeParameter("fileId", itemIndex) as string;

    return `/types/${entityType}/entities/${entityId}/files/${fileId}`;
}

function getEntityVersionQuery(
    this: IExecuteFunctions,
    itemIndex: number,
): IDataObject {
    const entityVersion = this.getNodeParameter(
        "entityVersion",
        itemIndex,
        0,
    ) as number;

    if (entityVersion <= 0) {
        return {};
    }

    return {
        version: entityVersion,
    };
}

function getAiAdditionalProperties(
    this: IExecuteFunctions,
    itemIndex: number,
): IDataObject {
    const additionalFields = this.getNodeParameter(
        "additionalFields",
        itemIndex,
        {},
    ) as IDataObject;
    const qs: IDataObject = {};
    const contentLocale =
        (this.getNodeParameter("contentLocale", itemIndex, "") as string) ||
        (this.getNodeParameter("locale", itemIndex, "") as string);
    const name = this.getNodeParameter("name", itemIndex, "") as string;

    if (contentLocale !== "") {
        qs.contentLocale = contentLocale;
    }
    if (name !== "") {
        qs.name = name;
    }

    for (const fieldName of [
        "metadataLocale",
        "uploadGrouping",
        "aiColours",
        "aiDescription",
        "aiTags",
        "aiTagsConfidence",
        "aiTagsCount",
        "mapToUserEditableProperties",
        "aiAreaOfInterest",
    ]) {
        const value = additionalFields[fieldName];

        if (value !== undefined && value !== "") {
            qs[fieldName] = value;
        }
    }

    return qs;
}

async function readBinaryEndpoint(
    this: IExecuteFunctions,
    resource: string,
    fileName: string,
    itemIndex: number,
    qs: IDataObject = {},
    method: IHttpRequestMethods = "GET",
): Promise<INodeExecutionData> {
    const binaryPropertyName = this.getNodeParameter(
        "binaryPropertyName",
        itemIndex,
    ) as string;
    const credentials = await this.getCredentials("viingxApi");
    const options: IHttpRequestOptions = {
        method,
        url: buildViingxApiUrl(credentials.hostUrl, resource),
        encoding: "arraybuffer",
        json: false,
    };
    if (Object.keys(qs).length !== 0) {
        options.qs = qs;
    }
    
    this.logger.error(JSON.stringify(options, undefined, "  "));

    const response = await this.helpers.httpRequestWithAuthentication.call(
        this,
        "viingxApi",
        options,
    );
    const buffer = Buffer.isBuffer(response)
        ? response
        : Buffer.from(response as ArrayBuffer);
    const binaryData = await this.helpers.prepareBinaryData(buffer, fileName);

    return {
        json: {},
        binary: {
            [binaryPropertyName]: binaryData,
        },
        pairedItem: {
            item: itemIndex,
        },
    };
}

async function uploadFile(
    this: IExecuteFunctions,
    itemIndex: number,
): Promise<IDataObject> {
    const binaryPropertyName = this.getNodeParameter(
        "binaryPropertyName",
        itemIndex,
    ) as string;
    const contentType = this.getNodeParameter(
        "contentType",
        itemIndex,
        "application/octet-stream",
    ) as string;
    const binaryData = this.helpers.assertBinaryData(
        itemIndex,
        binaryPropertyName,
    );
    const binaryBuffer = await this.helpers.getBinaryDataBuffer(
        itemIndex,
        binaryPropertyName,
    );
    const credentials = await this.getCredentials("viingxApi");
    const options: IHttpRequestOptions = {
        method: "POST",
        url: buildViingxApiUrl(credentials.hostUrl, "/files/upload"),
        body: binaryBuffer,
        json: false,
        headers: {
            "Content-Type": binaryData.mimeType || contentType,
        },
    };

    return (await this.helpers.httpRequestWithAuthentication.call(
        this,
        "viingxApi",
        options,
    )) as IDataObject;
}

async function getWorkflowOptions(
    this: ILoadOptionsFunctions,
    kind: "assignees" | "states",
): Promise<INodePropertyOptions[]> {
    const entityType = this.getCurrentNodeParameter("entityType") as string;
    if (!entityType) {
        return [];
    }

    const json = await viingxApiRequest.call(
        this,
        "GET",
        `/types/${entityType}`,
    );
    const workflow = (json.result as { type?: { workflow?: WorkflowDefinition } })
        .type?.workflow;
    if (workflow === undefined) {
        return [];
    }

    const options =
        kind === "states"
            ? (workflow.states ?? [])
            : (workflow.assignees ?? workflow.users ?? []);
    const returnData = options
        .map(toNodePropertyOption)
        .filter((option): option is INodePropertyOptions => option !== undefined);

    returnData.sort((a, b) => a.name.localeCompare(b.name));

    return returnData;
}

function toNodePropertyOption(
    option: WorkflowOption,
): INodePropertyOptions | undefined {
    const value = option.name ?? option.state ?? option.userId ?? option.id;

    if (value === undefined || value === "") {
        return undefined;
    }

    const label = getWorkflowOptionLabel(option) ?? value;

    return {
        name: label,
        value,
    };
}

function getWorkflowOptionLabel(option: WorkflowOption): string | undefined {
    if (typeof option.label === "string") {
        return option.label;
    }

    return (
        option.locale?.label?.en ??
        option.locale?.label?.de ??
        option.label?.en ??
        option.label?.de ??
        option.displayName ??
        option.email ??
        option.name ??
        option.state ??
        option.userId ??
        option.id
    );
}

function toExecutionData(
    this: IExecuteFunctions,
    response: IDataObject | IDataObject[] | INodeExecutionData,
    itemIndex: number,
): INodeExecutionData[] {
    const executionData = Array.isArray(response)
        ? this.helpers.returnJsonArray(response)
        : isNodeExecutionData(response)
            ? [response]
            : this.helpers.returnJsonArray(response);

    return executionData.map((item) => ({
        ...item,
        pairedItem: item.pairedItem ?? {
            item: itemIndex,
        },
    }));
}

function getJsonParameter(
    this: IExecuteFunctions,
    parameterName: string,
    itemIndex: number,
): IDataObject {
    const value = this.getNodeParameter(parameterName, itemIndex);

    if (typeof value !== "string") {
        return value as IDataObject;
    }

    try {
        return JSON.parse(value) as IDataObject;
    } catch (error) {
        throw new NodeOperationError(
            this.getNode(),
            `${parameterName} must be valid JSON.`,
            {
                description: error instanceof Error ? error.message : undefined,
            },
        );
    }
}

function getOptionalJsonQueryParameter(
    this: IExecuteFunctions,
    parameterName: string,
    itemIndex: number,
): string | undefined {
    const value = this.getNodeParameter(parameterName, itemIndex, {});

    if (typeof value === "string") {
        return value === "" || value === "{}" ? undefined : value;
    }

    if (Object.keys(value as IDataObject).length === 0) {
        return undefined;
    }

    return JSON.stringify(value);
}

function isNodeExecutionData(value: unknown): value is INodeExecutionData {
    return typeof value === "object" && value !== null && "json" in value;
}
