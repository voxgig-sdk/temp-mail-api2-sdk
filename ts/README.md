# TempMailApi2 TypeScript SDK



The TypeScript SDK for the TempMailApi2 API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.TemporaryEmail()` — each with a small set of operations (`load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/temp-mail-api2-sdk/releases](https://github.com/voxgig-sdk/temp-mail-api2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { TempMailApi2SDK } from '@voxgig-sdk/temp-mail-api2'

const client = new TempMailApi2SDK({
  apikey: process.env.TEMP_MAIL_API2_APIKEY,
})
```

### 3. Load a temporaryemail

TemporaryEmail is nested under email, so provide the `email`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const temporaryemail = await client.TemporaryEmail().load({
    email: 'example_email',
    message_id: 'example_message_id',
  })
  console.log(temporaryemail)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created TemporaryEmail ENTITY (.data() for the record)
const created = await client.TemporaryEmail().create({
  attachments: [],
  body: 'example_body',
})

// Remove
await client.TemporaryEmail().remove({
  email: 'example_email',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const temporaryemail = await client.TemporaryEmail().load({ email: "example", message_id: "example" })
  console.log(temporaryemail)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = TempMailApi2SDK.test()

const temporaryemail = await client.TemporaryEmail().load({ email: 'example_email', message_id: 'example_message_id' })
// temporaryemail is the entity, populated with mock response data
// — call temporaryemail.data() for the record itself
console.log(temporaryemail)
```

You can also use the instance method:

```ts
const client = new TempMailApi2SDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.TemporaryEmail()

// First call runs the operation and stores its result
await entity.load({ email: 'example_email', message_id: 'example_message_id' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new TempMailApi2SDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
TEMP_MAIL_API2_TEST_LIVE=TRUE
TEMP_MAIL_API2_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### TempMailApi2SDK

#### Constructor

```ts
new TempMailApi2SDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `TemporaryEmail(data?)` | `TemporaryEmailEntity` | Create a TemporaryEmail entity instance. |
| `tester(testopts?, sdkopts?)` | `TempMailApi2SDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `TempMailApi2SDK.test(testopts?, sdkopts?)` | `TempMailApi2SDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): TempMailApi2SDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### TemporaryEmail

| Field | Description |
| --- | --- |
| `attachments` |  |
| `body` | Email body content |
| `customDomain` | Custom domain for professional temporary email |
| `customDomainAvailable` | Whether custom domains are supported |
| `domains` |  |
| `email` | Generated temporary email address |
| `expiresAt` | Expiration date of the temporary email |
| `from` | Sender email address |
| `htmlBody` | HTML version of email body |
| `id` | Unique message identifier |
| `inboxUrl` | URL to access the inbox |
| `isRead` | Whether the message has been read |
| `messages` |  |
| `prefix` | Desired prefix for the email address |
| `receivedAt` | When the email was received |
| `subject` | Email subject |
| `to` | Recipient email address |
| `token` | Access token for managing this email address |
| `total` | Total number of messages |
| `validityPeriod` | Validity period in days (default: 60+ days) |

Operations: create, load, remove.

API path: `/temp-mail/generate`



## Entities


### TemporaryEmail

Create an instance: `const temporary_email = client.TemporaryEmail()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `any[]` |  |
| `body` | `string` | Email body content |
| `customDomain` | `string` | Custom domain for professional temporary email |
| `customDomainAvailable` | `boolean` | Whether custom domains are supported |
| `domains` | `any[]` |  |
| `email` | `string` | Generated temporary email address |
| `expiresAt` | `string` | Expiration date of the temporary email |
| `from` | `string` | Sender email address |
| `htmlBody` | `string` | HTML version of email body |
| `id` | `string` | Unique message identifier |
| `inboxUrl` | `string` | URL to access the inbox |
| `isRead` | `boolean` | Whether the message has been read |
| `messages` | `any[]` |  |
| `prefix` | `string` | Desired prefix for the email address |
| `receivedAt` | `string` | When the email was received |
| `subject` | `string` | Email subject |
| `to` | `string` | Recipient email address |
| `token` | `string` | Access token for managing this email address |
| `total` | `number` | Total number of messages |
| `validityPeriod` | `number` | Validity period in days (default: 60+ days) |

#### Example: Load

```ts
const temporary_email = await client.TemporaryEmail().load({ email: 'email', message_id: 'message_id' })
```

#### Example: Create

```ts
const temporary_email = await client.TemporaryEmail().create({
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
temp-mail-api2/
├── src/
│   ├── TempMailApi2SDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { TempMailApi2SDK } from '@voxgig-sdk/temp-mail-api2'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const temporaryemail = client.TemporaryEmail()
await temporaryemail.load({ email: "example", message_id: "example" })

// temporaryemail.data() now returns the temporaryemail data from the last `load`
// temporaryemail.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
