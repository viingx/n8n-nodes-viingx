import type { INodeProperties } from 'n8n-workflow';
import { createSignedUrlsDescription } from './createSignedUrls';
import { getUserProfileDescription } from './getUserProfile';
import { getUserProfilesDescription } from './getUserProfiles';

const showWhen = {
	resource: ['authorization'],
};

export const authorizationDescription: INodeProperties[] = [
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
				name: 'Create Signed URLs',
				value: 'createSignedUrls',
				action: 'Create signed urls',
			},
			{
				name: 'Get User Profile',
				value: 'getUserProfile',
				action: 'Get user profile',
				description: 'Get profile of current logged-in user',
			},
			{
				name: 'Get User Profiles',
				value: 'getUserProfiles',
				action: 'Get user profiles',
				description: 'Get all user profiles',
			},
		],
		default: 'getUserProfile',
	},
	...createSignedUrlsDescription,
	...getUserProfileDescription,
	...getUserProfilesDescription,
];
