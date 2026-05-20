import type { INodeProperties } from 'n8n-workflow';

export const issueSelect: INodeProperties = {
	displayName: 'Issue',
	name: 'issue',
	type: 'resourceLocator',
	default: {
		mode: 'list',
		value: '',
	},
	required: true,
	modes: [
		{
			displayName: 'Issue',
			name: 'list',
			type: 'list',
			placeholder: 'Select an Issue...',
			typeOptions: {
				searchListMethod: 'getIssues',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. 123',
			url: '=https://github.com/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$value}}',
		},
	],
};
