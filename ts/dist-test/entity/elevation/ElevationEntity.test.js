"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ElevationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FREE_ELEVATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FREE_ELEVATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FreeElevationSDK.test();
        const ent = testsdk.Elevation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FREE_ELEVATION_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'elevation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "elevation", "req": false, "short": "Elevation in meters", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "latitude", "req": false, "short": "Latitude of the point", "type": "`$NUMBER`", "index$": 2 }, { "active": true, "name": "longitude", "req": false, "short": "Longitude of the point", "type": "`$NUMBER`", "index$": 3 }], "id": { "field": "id", "name": "id", "parts": ["lat", "lon"], "sep": "/" }, "name": "elevation", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "[[46.24566,6.17081],[46.85499,6.78134]]", "kind": "query", "name": "pts", "orig": "pts", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /elevation", "json": "{\"operationId\":\"getMultipleElevations\",\"parameters\":[{\"description\":\"Array of coordinate pairs in format [[lat1,lon1],[lat2,lon2],[lat3,lon3]]. Coordinates use WGS-84 datum.\",\"example\":\"[[46.24566,6.17081],[46.85499,6.78134]]\",\"in\":\"query\",\"name\":\"pts\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"elevation\":{\"description\":\"Elevation in meters, or null if not available\",\"nullable\":true,\"type\":\"number\"},\"latitude\":{\"description\":\"Latitude of the point\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the point\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with elevation data for all provided coordinates\"},\"400\":{\"description\":\"Invalid request parameters\"},\"429\":{\"description\":\"Rate limit exceeded (10 requests per second limit on free plan)\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/elevation", "segments": [{ "lit": "elevation" }], "select": { "exist": ["pts"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 46.24566, "kind": "param", "name": "lat", "orig": "lat", "reqd": true, "type": "`$NUMBER`", "index$": 0 }, { "active": true, "example": 6.17081, "kind": "param", "name": "lon", "orig": "lon", "reqd": true, "type": "`$NUMBER`", "index$": 1 }], "query": [{ "active": true, "kind": "query", "name": "json", "orig": "json", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }] }, "contract": { "id": "GET /elevation/{lat}/{lon}", "json": "{\"operationId\":\"getSingleElevation\",\"parameters\":[{\"description\":\"Latitude of the location (WGS-84)\",\"example\":46.24566,\"in\":\"path\",\"name\":\"lat\",\"required\":true,\"schema\":{\"format\":\"double\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Longitude of the location (WGS-84)\",\"example\":6.17081,\"in\":\"path\",\"name\":\"lon\",\"required\":true,\"schema\":{\"format\":\"double\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},{\"description\":\"Append this parameter to have the result returned as JSON format\",\"in\":\"query\",\"name\":\"json\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"elevation\":42},\"schema\":{\"properties\":{\"elevation\":{\"description\":\"Elevation in meters\",\"type\":\"number\"}},\"type\":\"object\"}},\"text/plain\":{\"example\":\"42\",\"schema\":{\"example\":\"42\",\"type\":\"string\"}}},\"description\":\"Successful response with elevation data\"},\"429\":{\"description\":\"Rate limit exceeded (10 requests per second limit on free plan)\"},\"501\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"elevation\":{\"type\":\"null\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Point is not in the DEM dataset\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/elevation/{lat}/{lon}", "segments": [{ "lit": "elevation" }, { "var": "lat" }, { "var": "lon" }], "select": { "exist": ["json", "lat", "lon"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["elevation"]] }, "key$": "elevation", "name__orig": "elevation", "Name": "Elevation", "name_": "elevation", "name-": "elevation", "NAME": "ELEVATION", "index$": 0 }, { "active": true, "entity": "elevation", "key$": "BasicElevationFlow", "kind": "basic", "name": "BasicElevationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "elevation_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "elevation_ref01", "srcdatavar": "elevation_ref01_data", "suffix": "_dt0" }, "match": { "id": "elevation01", "lat": "lat01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-elevation_ref01" } }], "index$": 1 }] }, 'Elevation');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let elevation_ref01_data = Object.values(setup.data.existing.elevation)[0];
        // LIST
        const elevation_ref01_ent = client.Elevation();
        const elevation_ref01_match = {};
        const elevation_ref01_list = (await elevation_ref01_ent.list(elevation_ref01_match)).map((e) => e.data());
        // LOAD
        const elevation_ref01_match_dt0 = {};
        elevation_ref01_match_dt0.id = elevation_ref01_data.id;
        const elevation_ref01_data_dt0 = (await elevation_ref01_ent.load(elevation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(elevation_ref01_data_dt0.id === elevation_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/elevation/ElevationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FreeElevationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['elevation01', 'elevation02', 'elevation03', 'elevation01', 'elevation02', 'elevation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FREE_ELEVATION_TEST_ELEVATION_ENTID': idmap,
        'FREE_ELEVATION_TEST_LIVE': 'FALSE',
        'FREE_ELEVATION_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FREE_ELEVATION_TEST_ELEVATION_ENTID'];
    const live = 'TRUE' === env.FREE_ELEVATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FREE_ELEVATION_TEST_ELEVATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FreeElevationSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FREE_ELEVATION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ElevationEntity.test.js.map