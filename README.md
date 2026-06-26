# n8n-nodes-viingx

This is an n8n community node. It lets you connect n8n workflows to viingx systems.

viingx is used to work with structured entity data, files, localizations, workflows, authorization profiles, and webhook-driven events exposed by a viingx installation.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

- [n8n-nodes-viingx](#n8n-nodes-viingx)
  - [Installation](#installation)
  - [Operations](#operations)
    - [viingx](#viingx)
      - [Authorization](#authorization)
      - [Entity](#entity)
      - [Entity Localization](#entity-localization)
      - [Entity Type](#entity-type)
      - [GraphQL](#graphql)
      - [Locale](#locale)
      - [Response](#response)
      - [Setting](#setting)
      - [Share Link](#share-link)
      - [Workflow](#workflow)
    - [viingx Trigger](#viingx-trigger)
  - [Credentials](#credentials)
  - [Compatibility](#compatibility)
  - [Usage](#usage)
    - [Working With Entities](#working-with-entities)
    - [Working With Files](#working-with-files)
    - [Working With Localizations](#working-with-localizations)
    - [Trigger Webhooks](#trigger-webhooks)
    - [Trigger Responses](#trigger-responses)
  - [Resources](#resources)
  - [Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

The npm package name is:

```text
n8n-nodes-viingx
```

## Operations

### viingx

The `viingx` node supports these resources and operations:

#### Authorization

- Create Signed URLs: Create signed URLs for file access.
- Get User Profile: Get the profile of the currently authenticated user.
- Get User Profiles: Get all available user profiles.

#### Entity

- Create Entity: Create a new entity for a selected entity type and content locale.
- Create Media Entity From File Data: Create a new media entity from incoming binary file data.
- Delete Entity: Delete an entity by type, ID, and entity version.
- Export Layout Entity: Export a layout entity.
- Get Entities: List entities of a selected type, with optional query, sorting, and limit parameters.
- Get Entity: Read a single entity by type and ID.
- Get Entity Derivative File: Download a derivative file for an entity to an n8n binary property.
- Get Entity File: Download the primary file for an entity to an n8n binary property.
- Get Entity File Derivatives: List available file derivatives for an entity.
- Get Entity File Metadata: Read metadata for an entity's primary file.
- Get Entity History: Read the revision history for an entity.
- Get Entity Preview File: Download the preview file for an entity to an n8n binary property.
- Get Layout Entity Export Info: Read export information for a layout entity.
- Get Media Entity Cropped File: Download a cropped version of a media entity's file.
- Patch Entity: Partially update an entity by sending only the fields that should change.
- Suggest Media Entity Payload From Entity File: Suggest a media entity payload derived from an existing entity file.
- Suggest Media Entity Payload From File Data: Suggest a media entity payload from incoming binary file data.
- Update Entity: Replace an existing entity's content.
- Update Media Entity From File Data: Replace a media entity's file from incoming binary file data.
- Upload File: Upload an incoming binary file to viingx.

#### Entity Localization

- Create or Update Entity Localization: Create or replace a localization for an entity.
- Delete Entity Localization: Delete a localization for an entity.
- Get Entity Localization: Read a single localization for an entity.
- Get Entity Localization File: Download the file attached to an entity localization.
- Get Entity Localization File Metadata: Read metadata for an entity localization file.
- Get Entity Localizations: List all localizations for an entity.

#### Entity Type

- Create or Update Entity Type: Create or replace an entity type definition.
- Delete Entity Type: Delete an entity type.
- Get Entity Type: Read metadata for a single entity type.
- Get Entity Type Version: Read a specific version of an entity type.
- Get Entity Types: List all available entity types.

#### GraphQL

- Execute GraphQL: Execute a GraphQL query or mutation against the viingx API.

#### Locale

- Get Locale: Read a single locale by ID.
- Get Locales: List all available locales.

#### Response

Use this resource at the end of workflows started by non-subscription triggers to send the expected response payload back to viingx.

- Send Action Response: Send the result of an action invocation.
- Send Quality Gate Check Response: Send a pass or fail result for a quality gate check.
- Send Workflow Assignee Options Response: Send the list of allowed assignee user IDs.
- Send Workflow State Options Response: Send the list of allowed workflow states.

#### Setting

- Get System Settings: Read the system-level settings for the viingx instance.
- Get User Settings: Read the settings for the currently authenticated user.

#### Share Link

- Create Share Link: Create a share link for an entity.
- Delete Share Link: Delete a share link.

#### Workflow

- Get Entity Workflow Comments: Read workflow comments for an entity.
- My Assigned Entities: List entities assigned to the currently authenticated user.
- Suggest Assignees: Get suggested workflow assignees for an entity.
- Suggest States: Get suggested workflow states for an entity.
- Update Entity Workflow: Update the workflow state or assignee for an entity.

### viingx Trigger

The `viingx Trigger` node starts a workflow from viingx webhook calls.

- Action: Receives action events at the node webhook URL. Supports synchronous and asynchronous completion modes.
- Quality Gate Check: Receives quality gate check events at the node webhook URL.
- Subscription: Receives subscription events at the node webhook URL.
- Workflow Assignee Options: Receives workflow assignee option events at the node webhook URL.
- Workflow State Options: Receives workflow state option events at the node webhook URL.

## Credentials

Create `Viingx API` credentials in n8n and provide:

- Host URL: Base URL of your viingx instance, without the `/api/v1.0` suffix.
- API Key: API key for the viingx instance.

The node sends the API key as the `x-api-key` request header. n8n tests the credentials by calling `/api/v1.0/auth/profile` on the configured host.

## Compatibility

This package uses n8n Nodes API version 1 and `n8n-workflow` as a peer dependency.

The current development environment uses `n8n-workflow` 2.19.0 and `@n8n/node-cli` 0.28.0. There are no known version-specific incompatibilities.

## Usage

### Working With Entities

Most entity operations require an entity type. The node loads available entity types from the configured viingx instance, and you can also provide an entity type ID with an n8n expression.

For `Create Entity`, provide:

- Entity Type
- Content Locale
- Payload JSON

For `Get Entities`, the optional `Query` and `Sorting` fields use JSON. Example query:

```json
{
  "property": "content.payload.name",
  "op": "=",
  "value": "Test"
}
```

Example sorting:

```json
[
  {
    "property": "content.payload.name",
    "direction": "asc"
  }
]
```

For media entities, use `Create Media Entity From File Data` or `Update Media Entity From File Data` when the incoming n8n item contains binary data. Use `Suggest Media Entity Payload From File Data` to pre-fill payload fields from the file before creating.

### Working With Files

Use `Upload File` when the incoming n8n item contains binary data. Set `Input Binary Field` to the binary property name, for example `data`.

Use `Get Entity File` to download a viingx file into an n8n binary property. Set `Output Binary Property` to the property name that should receive the file. The same pattern applies to `Get Entity Derivative File`, `Get Entity Preview File`, `Get Media Entity Cropped File`, and the entity localization file operations.

### Working With Localizations

Use `Get Entity Localizations` to list all locale variants of an entity. Use `Create or Update Entity Localization` to create or replace a locale-specific content version. Use `Get Entity Localization File` to download the file attached to a localization.

### Trigger Webhooks

Use `viingx Trigger` when viingx should start an n8n workflow. Choose the matching event type, then configure viingx to send a POST request to the webhook URL shown by n8n for that trigger node.

For `Subscription`, the trigger responds immediately because it is notification-only. For `Action`, `Quality Gate Check`, `Workflow Assignee Options`, and `Workflow State Options`, connect the trigger workflow to the `viingx` node, choose the `Response` resource, and choose the matching operation.

### Trigger Responses

Use the `Response` resource in the `viingx` node at the end of workflows started by non-subscription triggers. Choose the operation that matches the trigger event so the node sends the expected response payload.

For asynchronous action triggers, set `Action Completion` to `Asynchronous` in `viingx Trigger`. The trigger returns HTTP 204 automatically, while the workflow continues and can update or finalize the invocation later.

For action responses, choose `Send Action Response`, then choose the response type:

- `Send Synchronous Response`: Returns the final action result to the invocation request.
- `Update Asynchronous Action Progress`: Sends progress to the invocation update endpoint using the invocation ID, token, and host URL from the trigger payload.
- `Finalize Asynchronous Action`: Sends the final action result to the invocation finalize endpoint.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [n8n community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/)
- [n8n expressions documentation](https://docs.n8n.io/code/expressions/)

## Version history

- 1.0.1: Current package version. CI publish workflow fix.
- 1.0.0: Full release. Added entity localization, entity type management, GraphQL, locale, response, setting, share link, and workflow resources. Extended entity and authorization operations.
