"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'FreeElevation',
        slug: "free-elevation",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://www.elevation-api.eu/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            elevation: {},
        }
    };
    entity = {
        "elevation": {
            "fields": [
                {
                    "name": "elevation",
                    "title": "Elevation",
                    "type": "`$NUMBER`",
                    "short": "Elevation in meters"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "short": "Latitude of the point"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "short": "Longitude of the point"
                }
            ],
            "id": {
                "field": "id",
                "name": "id",
                "parts": [
                    "lat",
                    "lon"
                ],
                "sep": "/"
            },
            "name": "elevation",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/elevation",
                            "segments": [
                                {
                                    "lit": "elevation"
                                }
                            ],
                            "parts": [
                                "elevation"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "pts",
                                        "orig": "pts",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "[[46.24566,6.17081],[46.85499,6.78134]]"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "pts"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/elevation/{lat}/{lon}",
                            "segments": [
                                {
                                    "lit": "elevation"
                                },
                                {
                                    "var": "lat"
                                },
                                {
                                    "var": "lon"
                                }
                            ],
                            "parts": [
                                "elevation",
                                "{lat}",
                                "{lon}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "lat",
                                        "orig": "lat",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 46.24566
                                    },
                                    {
                                        "name": "lon",
                                        "orig": "lon",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 6.17081
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "json",
                                        "orig": "json",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "json",
                                    "lat",
                                    "lon"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map