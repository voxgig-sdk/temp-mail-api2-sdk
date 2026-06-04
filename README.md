# TempMailApi2 SDK

Generate disposable email addresses and read incoming messages via Boomlify's temp mail API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Temp Mail API

[Boomlify](https://boomlify.com) is a temporary email service that lets you create disposable inbox addresses on demand. This SDK wraps its public API, served from `https://api.boomlify.com/v1`, so you can integrate ephemeral mail flows into automated signups, testing pipelines, or privacy-sensitive workflows.

The service is aimed at avoiding spam, protecting your real address when trying out services, and giving developers a way to verify email-based flows without burning real inboxes. Boomlify also advertises support for custom domains and a multi-inbox dashboard on its consumer site.

Use the API to mint a new temporary email address and poll its inbox for messages. Refer to Boomlify's own site for the canonical authentication, rate-limit, and retention details.

## Try it

**TypeScript**
```bash
npm install temp-mail-api2
```

**Python**
```bash
pip install temp-mail-api2-sdk
```

**PHP**
```bash
composer require voxgig/temp-mail-api2-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/temp-mail-api2-sdk/go
```

**Ruby**
```bash
gem install temp-mail-api2-sdk
```

**Lua**
```bash
luarocks install temp-mail-api2-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { TempMailApi2SDK } from 'temp-mail-api2'

const client = new TempMailApi2SDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o temp-mail-api2-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "temp-mail-api2": {
      "command": "/abs/path/to/temp-mail-api2-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **TemporaryEmail** | A disposable email address minted by Boomlify, along with the messages delivered to it; covered by the SDK operations grouped under the `temporary_email` entity. | `/temp-mail/generate` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from tempmailapi2_sdk import TempMailApi2SDK

client = TempMailApi2SDK({})


# Load a specific temporaryemail
temporaryemail, err = client.TemporaryEmail(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'tempmailapi2_sdk.php';

$client = new TempMailApi2SDK([]);


// Load a specific temporaryemail
[$temporaryemail, $err] = $client->TemporaryEmail(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/temp-mail-api2-sdk/go"

client := sdk.NewTempMailApi2SDK(map[string]any{})

```

### Ruby

```ruby
require_relative "TempMailApi2_sdk"

client = TempMailApi2SDK.new({})


# Load a specific temporaryemail
temporaryemail, err = client.TemporaryEmail(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("temp-mail-api2_sdk")

local client = sdk.new({})


-- Load a specific temporaryemail
local temporaryemail, err = client:TemporaryEmail(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = TempMailApi2SDK.test()
const result = await client.TemporaryEmail().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = TempMailApi2SDK.test(None, None)
result, err = client.TemporaryEmail(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = TempMailApi2SDK::test(null, null);
[$result, $err] = $client->TemporaryEmail(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.TemporaryEmail(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = TempMailApi2SDK.test(nil, nil)
result, err = client.TemporaryEmail(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:TemporaryEmail(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Temp Mail API

- Upstream: [https://boomlify.com](https://boomlify.com)

---

Generated from the Temp Mail API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
