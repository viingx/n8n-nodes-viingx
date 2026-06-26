import type { INodeProperties } from 'n8n-workflow';
import { createEntityDescription } from './createEntity';
import { createMediaEntityFromFileDataDescription } from './createMediaEntityFromFileData';
import { deleteEntityDescription } from './deleteEntity';
import { exportLayoutEntityDescription } from './exportLayoutEntity';
import { getEntitiesDescription } from './getEntities';
import { getEntityDescription } from './getEntity';
import { getEntityDerivativeFileDescription } from './getEntityDerivativeFile';
import { getEntityFileDescription } from './getEntityFile';
import { getEntityFileDerivativesDescription } from './getEntityFileDerivatives';
import { getEntityFileMetadataDescription } from './getEntityFileMetadata';
import { getEntityHistoryDescription } from './getEntityHistory';
import { getEntityPreviewFileDescription } from './getEntityPreviewFile';
import { getLayoutEntityExportInfoDescription } from './getLayoutEntityExportInfo';
import { getMediaEntityCroppedFileDescription } from './getMediaEntityCroppedFile';
import { patchEntityDescription } from './patchEntity';
import { suggestMediaEntityPayloadFromEntityFileDescription } from './suggestMediaEntityPayloadFromEntityFile';
import { suggestMediaEntityPayloadFromFileDataDescription } from './suggestMediaEntityPayloadFromFileData';
import { updateEntityDescription } from './updateEntity';
import { updateMediaEntityFromFileDataDescription } from './updateMediaEntityFromFileData';
import { uploadFileDescription } from './uploadFile';

const showWhen = {
	resource: ['entity'],
};

export const entityDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showWhen,
		},
		options: [
			{
				name: 'Create Entity',
				value: 'createEntity',
				action: 'Create entity',
			},
			{
				name: 'Create Media Entity From File Data',
				value: 'createMediaEntityFromFileData',
				action: 'Create media entity from file data',
			},
			{
				name: 'Delete Entity',
				value: 'deleteEntity',
				action: 'Delete entity',
			},
			{
				name: 'Export Layout Entity',
				value: 'exportLayoutEntity',
				action: 'Export layout entity',
			},
			{
				name: 'Get Entities',
				value: 'getEntities',
				action: 'Get entities',
			},
			{
				name: 'Get Entity',
				value: 'getEntity',
				action: 'Get entity',
			},
			{
				name: 'Get Entity Derivative File',
				value: 'getEntityDerivativeFile',
				action: 'Get entity derivative file',
			},
			{
				name: 'Get Entity File',
				value: 'getEntityFile',
				action: 'Get entity file',
			},
			{
				name: 'Get Entity File Derivatives',
				value: 'getEntityFileDerivatives',
				action: 'Get entity file derivatives',
			},
			{
				name: 'Get Entity File Metadata',
				value: 'getEntityFileMetadata',
				action: 'Get entity file metadata',
			},
			{
				name: 'Get Entity History',
				value: 'getEntityHistory',
				action: 'Get entity history',
			},
			{
				name: 'Get Entity Preview File',
				value: 'getEntityPreviewFile',
				action: 'Get entity preview file',
			},
			{
				name: 'Get Layout Entity Export Info',
				value: 'getLayoutEntityExportInfo',
				action: 'Get layout entity export info',
			},
			{
				name: 'Get Media Entity Cropped File',
				value: 'getMediaEntityCroppedFile',
				action: 'Get media entity cropped file',
			},
			{
				name: 'Patch Entity',
				value: 'patchEntity',
				action: 'Patch entity',
				description: 'Update an existing entity by sending only the fields that should be updated. Fields that are not included in the request will not be modified.',
			},
			{
				name: 'Suggest Media Entity Payload From Entity File',
				value: 'suggestMediaEntityPayloadFromEntityFile',
				action: 'Suggest media entity payload from entity file',
			},
			{
				name: 'Suggest Media Entity Payload From File Data',
				value: 'suggestMediaEntityPayloadFromFileData',
				action: 'Suggest media entity payload from file data',
			},
			{
				name: 'Update Entity',
				value: 'updateEntity',
				action: 'Update entity',
				description: 'Update an existing entity',
			},
			{
				name: 'Update Media Entity From File Data',
				value: 'updateMediaEntityFromFileData',
				action: 'Update media entity from file data',
				description: 'Update an existing media entity from file data',
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				action: 'Upload file',
				description: 'Upload a file',
			},
		],
		default: 'getEntity',
	},
	...createEntityDescription,
	...createMediaEntityFromFileDataDescription,
	...deleteEntityDescription,
	...exportLayoutEntityDescription,
	...getEntitiesDescription,
	...getEntityDescription,
	...getEntityDerivativeFileDescription,
	...getEntityFileDescription,
	...getEntityFileDerivativesDescription,
	...getEntityFileMetadataDescription,
	...getEntityHistoryDescription,
	...getEntityPreviewFileDescription,
	...getLayoutEntityExportInfoDescription,
	...getMediaEntityCroppedFileDescription,
	...patchEntityDescription,
	...suggestMediaEntityPayloadFromEntityFileDescription,
	...suggestMediaEntityPayloadFromFileDataDescription,
	...updateEntityDescription,
	...updateMediaEntityFromFileDataDescription,
	...uploadFileDescription,
];
