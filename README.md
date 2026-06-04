# FreeElevation SDK

Look up the elevation in metres for any point on Earth using ESA Copernicus DEM data

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Free Elevation API

The Free Elevation API is a small public service that returns the elevation, in metres, of any latitude/longitude pair on Earth. It is operated by Frank Villaro-Dixon at [elevation-api.eu](https://www.elevation-api.eu/) and is backed by digital elevation data from the European Space Agency's [Copernicus](https://www.copernicus.eu/) programme.

What you get from the API:

- A single-point lookup at `GET /v1/elevation/{lat}/{lon}` returning the elevation in metres (append `?json` for a JSON response).
- A batch lookup at `GET /v1/elevation?pts=[[lat,lon],[lat,lon],...]` for multiple coordinates in one request.
- Coordinates use WGS-84. Points outside the dataset return `null` (or HTTP 501).

Operational notes: the free plan is capped at roughly 10 requests/second, no API key or authentication is required, and CORS is enabled so the endpoints can be called directly from browsers. Paid plans with higher limits and SLA support are available from the operator.

## Try it

**TypeScript**
```bash
npm install free-elevation
```

**Python**
```bash
pip install free-elevation-sdk
```

**PHP**
```bash
composer require voxgig/free-elevation-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/free-elevation-sdk/go
```

**Ruby**
```bash
gem install free-elevation-sdk
```

**Lua**
```bash
luarocks install free-elevation-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FreeElevationSDK } from 'free-elevation'

const client = new FreeElevationSDK({})

// List all elevations
const elevations = await client.Elevation().list()
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
cd go-mcp && go build -o free-elevation-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "free-elevation": {
      "command": "/abs/path/to/free-elevation-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Elevation** | Elevation readings in metres above sea level for a given WGS-84 latitude/longitude, served from `GET /v1/elevation/{lat}/{lon}` for a single point or `GET /v1/elevation?pts=[[lat,lon],...]` for batched lookups. | `/elevation` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from freeelevation_sdk import FreeElevationSDK

client = FreeElevationSDK({})

# List all elevations
elevations, err = client.Elevation(None).list(None, None)

# Load a specific elevation
elevation, err = client.Elevation(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'freeelevation_sdk.php';

$client = new FreeElevationSDK([]);

// List all elevations
[$elevations, $err] = $client->Elevation(null)->list(null, null);

// Load a specific elevation
[$elevation, $err] = $client->Elevation(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/free-elevation-sdk/go"

client := sdk.NewFreeElevationSDK(map[string]any{})

// List all elevations
elevations, err := client.Elevation(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FreeElevation_sdk"

client = FreeElevationSDK.new({})

# List all elevations
elevations, err = client.Elevation(nil).list(nil, nil)

# Load a specific elevation
elevation, err = client.Elevation(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("free-elevation_sdk")

local client = sdk.new({})

-- List all elevations
local elevations, err = client:Elevation(nil):list(nil, nil)

-- Load a specific elevation
local elevation, err = client:Elevation(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FreeElevationSDK.test()
const result = await client.Elevation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FreeElevationSDK.test(None, None)
result, err = client.Elevation(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FreeElevationSDK::test(null, null);
[$result, $err] = $client->Elevation(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Elevation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FreeElevationSDK.test(nil, nil)
result, err = client.Elevation(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Elevation(nil):load(
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

## Using the Free Elevation API

- Upstream: [https://www.elevation-api.eu/](https://www.elevation-api.eu/)

- Service published under a "no rights reserved" stance (effectively CC0) by Frank Villaro-Dixon.
- Underlying elevation data comes from the European Space Agency's Copernicus program; downstream users should credit ESA Copernicus where appropriate.
- The free tier is rate limited (see the operational notes); paid plans exist for higher throughput.

---

Generated from the Free Elevation API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
