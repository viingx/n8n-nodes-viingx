# n8n-nodes-viingx

This is an n8n community node. It lets you connect n8n workflows to viingx systems.

viingx is used to work with structured entity data, files, authorization profiles, and webhook-driven events exposed by a viingx installation.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

- [n8n-nodes-viingx](#n8n-nodes-viingx)
  - [Installation](#installation)
  - [Operations](#operations)
    - [viingx](#viingx)
      - [Authorization](#authorization)
      - [Entity](#entity)
    - [viingx Trigger](#viingx-trigger)
  - [Credentials](#credentials)
  - [Compatibility](#compatibility)
  - [Usage](#usage)
    - [Working With Entities](#working-with-entities)
    - [Working With Files](#working-with-files)
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

- Read User Profile: Read the profile of the currently authenticated user.
- List User Profiles: List available user profiles.

#### Entity

- Create Entity: Create a new entity for a selected entity type and content locale.
- Delete Entity: Delete an entity by type, ID, and entity version.
- List Entities: List entities of a selected type, with optional query, sorting, and limit parameters.
- List Entity Types: List all available entity types.
- Patch Entity: Partially update an entity by ID.
- Read Entity: Read a single entity by type and ID.
- Read Entity File: Download an entity file to an n8n binary property.
- Read Entity Type: Read metadata for a single entity type.
- Update Entity: Update an existing entity by ID.
- Upload File: Upload an incoming binary file to viingx.

### viingx Trigger

The `viingx Trigger` node starts a workflow from viingx webhook calls.

- Action: Receives action events at the node webhook URL.
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

For `List Entities`, the optional `Query` and `Sorting` fields use JSON. Example query:

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

### Working With Files

Use `Upload File` when the incoming n8n item contains binary data. Set `Input Binary Field` to the binary property name, for example `data`.

Use `Read Entity File` to download a viingx file into an n8n binary property. Set `Output Binary Property` to the property name that should receive the file.

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

- 0.1.3: Current package version. Provides viingx authorization, entity, file, and trigger webhook support.
