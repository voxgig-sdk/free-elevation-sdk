# FreeElevation SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FreeElevation",
            "slug": "free-elevation",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://www.elevation-api.eu/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "elevation": {},
            },
        },
        "entity": {
      "elevation": {
        "fields": [
          {
            "name": "elevation",
            "short": "Elevation in meters",
            "type": "`$NUMBER`",
          },
          {
            "name": "latitude",
            "short": "Latitude of the point",
            "type": "`$NUMBER`",
          },
          {
            "name": "longitude",
            "short": "Longitude of the point",
            "type": "`$NUMBER`",
          },
        ],
        "name": "elevation",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "[[46.24566,6.17081],[46.85499,6.78134]]",
                      "kind": "query",
                      "name": "pts",
                      "orig": "pts",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/elevation",
                "parts": [
                  "elevation",
                ],
                "select": {
                  "exist": [
                    "pts",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 46.24566,
                      "kind": "param",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 6.17081,
                      "kind": "param",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "json",
                      "orig": "json",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/elevation/{lat}/{lon}",
                "parts": [
                  "elevation",
                  "{lat}",
                  "{lon}",
                ],
                "select": {
                  "exist": [
                    "json",
                    "lat",
                    "lon",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "elevation",
            ],
          ],
        },
      },
    },
    }
