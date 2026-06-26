import type { INodeProperties } from 'n8n-workflow';
import { getEntityWorkflowCommentsDescription } from './getEntityWorkflowComments';
import { myAssignedEntitiesDescription } from './myAssignedEntities';
import { suggestWorkflowAssigneesDescription } from './suggestWorkflowAssignees';
import { suggestStatesDescription } from './suggestWorkflowStates';
import { updateEntityWorkflowDescription } from './updateEntityWorkflow';

const showWhen = {
	resource: ['workflow'],
};

export const workflowDescription: INodeProperties[] = [
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
				name: 'Get Entity Workflow Comments',
				value: 'getEntityWorkflowComments',
				action: 'Get entity workflow comments',
			},
			{
				name: 'My Assigned Entities',
				value: 'myAssignedEntities',
				action: 'List entities assigned to authenticated user',
			},
			{
				name: 'Suggest Assignees',
				value: 'suggestWorkflowAssignees',
				action: 'Suggest assignees',
			},
			{
				name: 'Suggest States',
				value: 'suggestWorkflowStates',
				action: 'Suggest states',
			},
			{
				name: 'Update Entity Workflow',
				value: 'updateEntityWorkflow',
				action: 'Update entity workflow',
			},
		],
		default: 'myAssignedEntities',
	},
	...getEntityWorkflowCommentsDescription,
	...myAssignedEntitiesDescription,
	...suggestWorkflowAssigneesDescription,
	...suggestStatesDescription,
	...updateEntityWorkflowDescription,
];
