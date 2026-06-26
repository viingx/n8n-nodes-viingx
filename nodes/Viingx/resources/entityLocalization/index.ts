import type { INodeProperties } from 'n8n-workflow';
import { createOrUpdateEntityLocalizationDescription } from './createOrUpdateEntityLocalization';
import { deleteEntityLocalizationDescription } from './deleteEntityLocalization';
import { getEntityLocalizationDescription } from './getEntityLocalization';
import { getEntityLocalizationFileDescription } from './getEntityLocalizationFile';
import { getEntityLocalizationFileMetadataDescription } from './getEntityLocalizationFileMetadata';
import { getEntityLocalizationsDescription } from './getEntityLocalizations';

const showWhen = {
    resource: ['entityLocalization'],
};

export const entityLocalizationDescription: INodeProperties[] = [
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
                name: 'Create or Update Entity Localization',
                value: 'createOrUpdateEntityLocalization',
                action: 'Create or update entity localization',
            },
            {
                name: 'Delete Entity Localization',
                value: 'deleteEntityLocalization',
                action: 'Delete entity localization',
            },
            {
                name: 'Get Entity Localization',
                value: 'getEntityLocalization',
                action: 'Get entity localization',
            },
            {
                name: 'Get Entity Localization File',
                value: 'getEntityLocalizationFile',
                action: 'Get entity localization file',
            },
            {
                name: 'Get Entity Localization File Metadata',
                value: 'getEntityLocalizationFileMetadata',
                action: 'Get entity localization file metadata',
            },
            {
                name: 'Get Entity Localizations',
                value: 'getEntityLocalizations',
                action: 'Get entity localizations',
            },
        ],
        default: 'createOrUpdateEntityLocalization',
    },
    ...createOrUpdateEntityLocalizationDescription,
    ...deleteEntityLocalizationDescription,
    ...getEntityLocalizationDescription,
    ...getEntityLocalizationFileDescription,
    ...getEntityLocalizationFileMetadataDescription,
    ...getEntityLocalizationsDescription
];
