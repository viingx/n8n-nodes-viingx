import type { INodeProperties } from 'n8n-workflow';
import { getLocalesDescription } from './getLocales';
import { getLocaleDescription } from './getLocale';

const showWhen = {
    resource: ['locale'],
};

export const localeDescription: INodeProperties[] = [
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
                name: 'Get Locales',
                value: 'getLocales',
				action: 'Get locales',
            },
            {
                name: 'Get Locale',
                value: 'getLocale',
				action: 'Get locale',
            },
        ],
        default: 'getLocales',
    },
    ...getLocalesDescription,
    ...getLocaleDescription,
];
