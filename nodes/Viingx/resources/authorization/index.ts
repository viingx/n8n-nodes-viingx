import type { INodeProperties } from 'n8n-workflow';
import { authorizationReadUserProfileDescription } from './readUserProfile';
import { authorizationListUserProfilesDescription } from './listUserProfiles';

const showOnlyForIssues = {
	resource: ['authorization'],
};

export const authorizationDescription: INodeProperties[] = [
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
				name: 'Read User Profile',
				value: 'readUserProfile',
				action: 'Read user profile',
				description: 'Read profile of current logged-in user',
				routing: {
					request: {
						method: 'GET',
						url: '=/auth/profile',
					},
				},
			},
			{
				name: 'List User Profiles',
				value: 'listUserProfiles',
				action: 'List user profiles',
				description: 'List all user profiles',
				routing: {
					request: {
						method: 'GET',
						url: '=/auth/profiles',
					},
				},
			},
		],
		default: 'readUserProfile',
	},
	...authorizationReadUserProfileDescription,
	...authorizationListUserProfilesDescription,
];
