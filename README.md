# IpAddressLookup SDK

Look up your public IP address and basic network info over plain HTTP

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About IP Address Lookup

IP Address Lookup is a small public-IP service reachable at `https://ipty.org` (with the API hosted at `https://api.ipty.org`). It is catalogued on [Free Public APIs](https://freepublicapis.com/ip-address-lookup) as a no-key endpoint for retrieving the caller's public IP address along with associated network information.

What you get from the API:

- The caller's public IP address
- Associated network information returned in the response

Operational notes: no authentication is required and CORS is disabled, so calls must be made from a server or non-browser client. At the time of cataloguing on Free Public APIs the endpoint was reported as unreachable, so availability should be verified before relying on it in production.

## Try it

**TypeScript**
```bash
npm install ip-address-lookup
```

**Python**
```bash
pip install ip-address-lookup-sdk
```

**PHP**
```bash
composer require voxgig/ip-address-lookup-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ip-address-lookup-sdk/go
```

**Ruby**
```bash
gem install ip-address-lookup-sdk
```

**Lua**
```bash
luarocks install ip-address-lookup-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { IpAddressLookupSDK } from 'ip-address-lookup'

const client = new IpAddressLookupSDK({})

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
cd go-mcp && go build -o ip-address-lookup-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ip-address-lookup": {
      "command": "/abs/path/to/ip-address-lookup-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **GetIpAddress** | Returns the caller's public IP address and associated network information from the root endpoint at `https://api.ipty.org`. | `/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from ipaddresslookup_sdk import IpAddressLookupSDK

client = IpAddressLookupSDK({})


# Load a specific getipaddress
getipaddress, err = client.GetIpAddress(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'ipaddresslookup_sdk.php';

$client = new IpAddressLookupSDK([]);


// Load a specific getipaddress
[$getipaddress, $err] = $client->GetIpAddress(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ip-address-lookup-sdk/go"

client := sdk.NewIpAddressLookupSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "IpAddressLookup_sdk"

client = IpAddressLookupSDK.new({})


# Load a specific getipaddress
getipaddress, err = client.GetIpAddress(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("ip-address-lookup_sdk")

local client = sdk.new({})


-- Load a specific getipaddress
local getipaddress, err = client:GetIpAddress(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = IpAddressLookupSDK.test()
const result = await client.GetIpAddress().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = IpAddressLookupSDK.test(None, None)
result, err = client.GetIpAddress(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = IpAddressLookupSDK::test(null, null);
[$result, $err] = $client->GetIpAddress(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetIpAddress(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = IpAddressLookupSDK.test(nil, nil)
result, err = client.GetIpAddress(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetIpAddress(nil):load(
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

## Using the IP Address Lookup

- Upstream: [https://ipty.org](https://ipty.org)
- API docs: [https://freepublicapis.com/ip-address-lookup](https://freepublicapis.com/ip-address-lookup)

---

Generated from the IP Address Lookup OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
