# TempMailApi2 Ruby SDK Reference

Complete API reference for the TempMailApi2 Ruby SDK.


## TempMailApi2SDK

### Constructor

```ruby
require_relative 'TempMailApi2_sdk'

client = TempMailApi2SDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TempMailApi2SDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = TempMailApi2SDK.test
```


### Instance Methods

#### `TemporaryEmail(data = nil)`

Create a new `TemporaryEmail` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## TemporaryEmailEntity

```ruby
temporary_email = client.TemporaryEmail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `Array` | No |  |
| `body` | `String` | No | Email body content |
| `customDomain` | `String` | No | Custom domain for professional temporary email |
| `customDomainAvailable` | `Boolean` | No | Whether custom domains are supported |
| `domains` | `Array` | No |  |
| `email` | `String` | No | Generated temporary email address |
| `expiresAt` | `String` | No | Expiration date of the temporary email |
| `from` | `String` | No | Sender email address |
| `htmlBody` | `String` | No | HTML version of email body |
| `id` | `String` | No | Unique message identifier |
| `inboxUrl` | `String` | No | URL to access the inbox |
| `isRead` | `Boolean` | No | Whether the message has been read |
| `messages` | `Array` | No |  |
| `prefix` | `String` | No | Desired prefix for the email address |
| `receivedAt` | `String` | No | When the email was received |
| `subject` | `String` | No | Email subject |
| `to` | `String` | No | Recipient email address |
| `token` | `String` | No | Access token for managing this email address |
| `total` | `Integer` | No | Total number of messages |
| `validityPeriod` | `Integer` | No | Validity period in days (default: 60+ days) |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.TemporaryEmail.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TemporaryEmail.load({ "email" => "email", "message_id" => "message_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.TemporaryEmail.remove({ "email" => "email" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TemporaryEmailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = TempMailApi2SDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

