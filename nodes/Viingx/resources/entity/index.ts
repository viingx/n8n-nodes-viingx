import type { INodeProperties } from 'n8n-workflow';
import { createEntityDescription } from './createEntity';
import { deleteEntityDescription } from './deleteEntity';
import { listEntitiesDescription } from './listEntities';
import { listEntityTypesDescription } from './listEntityTypes';
import { patchEntityDescription } from './patchEntity';
import { readEntityDescription } from './readEntity';
import { readEntityFileDescription } from './readEntityFile';
import { readEntityTypeDescription } from './readEntityType';
import { updateEntityDescription } from './updateEntity';
import { prepareBinaryFileUpload, uploadFileDescription } from './uploadFile';

const showOnlyForIssues = {
	resource: ['entity'],
};

export const entityDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForIssues,
		},
		options: [
			{
				name: 'Create Entity',
				value: 'createEntity',
				action: 'Create entity',
				description: 'Create a new entity',
				routing: {
					request: {
						method: 'POST',
						url: '=/types/{{$parameter.entityType}}/entities',
					},
				},
			},
			{
				name: 'Delete Entity',
				value: 'deleteEntity',
				action: 'Delete entity',
				description: 'Delete an existing entity',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/types/{{$parameter.entityType}}/entities/{{$parameter.entityId}}',
						headers: {
							'If-Match': '={{$parameter.entityVersion}}',
						},
					},
				},
			},
			{
				name: 'List Entities',
				value: 'listEntities',
				action: 'List entities',
				description: 'List existing entities of a specific type',
				routing: {
					request: {
						method: 'GET',
						url: '=/types/{{$parameter.entityType}}/entities',
					},
				},
			},
			{
				name: 'List Entity Types',
				value: 'listEntityTypes',
				action: 'List entity types',
				description: 'List all entity types',
				routing: {
					request: {
						method: 'GET',
						url: '=/types',
					},
				},
			},
			{
				name: 'Patch Entity',
				value: 'patchEntity',
				action: 'Patch entity',
				description: 'Update an existing entity by sending only the fields that should be updated. Fields that are not included in the request will not be modified.',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/types/{{$parameter.entityType}}/entities/{{$parameter.entityId}}',
					},
				},
			},
			{
				name: 'Read Entity',
				value: 'readEntity',
				action: 'Read entity',
				description: 'Read the data of a single entity',
				routing: {
					request: {
						method: 'GET',
						url: '=/types/{{$parameter.entityType}}/entities/{{$parameter.entityId}}',
					},
				},
			},
			{
				name: 'Read Entity File',
				value: 'readEntityFile',
				action: 'Read entity file',
				description: 'Read the file of a single entity',
				routing: {
					request: {
						method: 'GET',
						url: '=/types/{{$parameter.entityType}}/entities/{{$parameter.entityId}}/files/{{$parameter.fileId}}',
						encoding: 'arraybuffer',
						json: false,
					},
					output: {
						postReceive: [
							{
								type: 'binaryData',
								properties: {
									destinationProperty: '={{$parameter.binaryPropertyName}}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Read Entity Type',
				value: 'readEntityType',
				action: 'Read entity type',
				description: 'Read the data of a single entity type',
				routing: {
					request: {
						method: 'GET',
						url: '=/types/{{$parameter.entityType}}',
					},
				},
			},
			{
				name: 'Update Entity',
				value: 'updateEntity',
				action: 'Update entity',
				description: 'Update an existing entity',
				routing: {
					request: {
						method: 'PUT',
						url: '=/types/{{$parameter.entityType}}/entities/{{$parameter.entityId}}',
					},
				},
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				action: 'Upload file',
				description: 'Upload a file',
				routing: {
					request: {
						method: 'POST',
						url: '=/files/upload',
						json: false,
					},
					send: {
						preSend: [prepareBinaryFileUpload],
					},
				},
			},
		],
		default: 'readEntity',
	},
	...createEntityDescription,
	...deleteEntityDescription,
	...listEntitiesDescription,
	...listEntityTypesDescription,
	...patchEntityDescription,
	...readEntityDescription,
	...readEntityFileDescription,
	...readEntityTypeDescription,
	...updateEntityDescription,
	...uploadFileDescription,
];
