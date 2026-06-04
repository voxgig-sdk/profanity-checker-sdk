# ProfanityChecker SDK

Detect profanity in user-submitted text with a fast, vector-based filter

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Profanity Checker API

[Profanity.dev](https://www.profanity.dev) is a free, open-source profanity detection service created by [Josh (joshtriedcoding)](https://github.com/joschan21). It uses a vector-based approach rather than a large language model, which the author positions as a cheaper and faster alternative for filtering toxic content in web applications.

What you get from the API:

- A single POST endpoint at `https://vector.profanity.dev` that accepts a JSON body with a `message` field.
- A check of that message against the service's profanity model, returned as JSON.

Operational notes: no API key or authentication is documented. The freepublicapis.com catalogue page notes that CORS is currently disabled, so calls from a browser may need to be proxied through your own backend.

## Try it

**TypeScript**
```bash
npm install profanity-checker
```

**Python**
```bash
pip install profanity-checker-sdk
```

**PHP**
```bash
composer require voxgig/profanity-checker-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/profanity-checker-sdk/go
```

**Ruby**
```bash
gem install profanity-checker-sdk
```

**Lua**
```bash
luarocks install profanity-checker-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ProfanityCheckerSDK } from 'profanity-checker'

const client = new ProfanityCheckerSDK({})

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
cd go-mcp && go build -o profanity-checker-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "profanity-checker": {
      "command": "/abs/path/to/profanity-checker-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **CheckProfanity** | Submits a text string for profanity analysis via `POST https://vector.profanity.dev` with a JSON body of the form `{ "message": "..." }`. | `/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from profanitychecker_sdk import ProfanityCheckerSDK

client = ProfanityCheckerSDK({})

```

### PHP

```php
<?php
require_once 'profanitychecker_sdk.php';

$client = new ProfanityCheckerSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/profanity-checker-sdk/go"

client := sdk.NewProfanityCheckerSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "ProfanityChecker_sdk"

client = ProfanityCheckerSDK.new({})

```

### Lua

```lua
local sdk = require("profanity-checker_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ProfanityCheckerSDK.test()
const result = await client.CheckProfanity().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ProfanityCheckerSDK.test(None, None)
result, err = client.CheckProfanity(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ProfanityCheckerSDK::test(null, null);
[$result, $err] = $client->CheckProfanity(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.CheckProfanity(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ProfanityCheckerSDK.test(nil, nil)
result, err = client.CheckProfanity(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:CheckProfanity(nil):load(
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

## Using the Profanity Checker API

- Upstream: [https://www.profanity.dev](https://www.profanity.dev)

- Free to use, described by the author as "100% free & open-source".
- Source code is published on GitHub at [joschan21/profanity.dev](https://github.com/joschan21/profanity.dev).
- No published rate limits, pricing, or attribution requirements; check the repository for the current licence file before redistributing.

---

Generated from the Profanity Checker API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
