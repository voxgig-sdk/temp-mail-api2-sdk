# TempMailApi2 Python SDK Reference

Complete API reference for the TempMailApi2 Python SDK.


## TempMailApi2SDK

### Constructor

```python
from temp-mail-api2_sdk import TempMailApi2SDK

client = TempMailApi2SDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TempMailApi2SDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = TempMailApi2SDK.test()
```


### Instance Methods

#### `TemporaryEmail(data=None)`

Create a new `TemporaryEmailEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## TemporaryEmailEntity

```python
temporary_email = client.TemporaryEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `custom_domain` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | No |  |
| `prefix` | ``$STRING`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |
| `validity_period` | ``$INTEGER`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.TemporaryEmail().create({
})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.TemporaryEmail().load({"id": "temporary_email_id"})
```

#### `remove(reqmatch, ctrl=None) -> tuple`

Remove the entity matching the given criteria.

```python
result, err = client.TemporaryEmail().remove({"id": "temporary_email_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemporaryEmailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = TempMailApi2SDK({
    "feature": {
        "test": {"active": True},
    },
})
```

