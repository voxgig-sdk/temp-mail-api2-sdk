# TempMailApi2 TypeScript SDK Reference

Complete API reference for the TempMailApi2 TypeScript SDK.


## TempMailApi2SDK

### Constructor

```ts
new TempMailApi2SDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TempMailApi2SDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = TempMailApi2SDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `TempMailApi2SDK` instance in test mode.


### Instance Methods

#### `TemporaryEmail(data?: object)`

Create a new `TemporaryEmail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemporaryEmailEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `TempMailApi2SDK.test()`.

**Returns:** `TempMailApi2SDK` instance in test mode.


---

## TemporaryEmailEntity

```ts
const temporary_email = client.TemporaryEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `any[]` | No |  |
| `body` | `string` | No |  |
| `customDomain` | `string` | No |  |
| `customDomainAvailable` | `boolean` | No |  |
| `domains` | `any[]` | No |  |
| `email` | `string` | No |  |
| `expiresAt` | `string` | No |  |
| `from` | `string` | No |  |
| `htmlBody` | `string` | No |  |
| `id` | `string` | No |  |
| `inboxUrl` | `string` | No |  |
| `isRead` | `boolean` | No |  |
| `messages` | `any[]` | No |  |
| `prefix` | `string` | No |  |
| `receivedAt` | `string` | No |  |
| `subject` | `string` | No |  |
| `to` | `string` | No |  |
| `token` | `string` | No |  |
| `total` | `number` | No |  |
| `validityPeriod` | `number` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.TemporaryEmail().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TemporaryEmail().load({ email: 'email', message_id: 'message_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.TemporaryEmail().remove({ email: 'email' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemporaryEmailEntity` instance with the same client and
options.

#### `client()`

Return the parent `TempMailApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new TempMailApi2SDK({
  feature: {
    test: { active: true },
  }
})
```

