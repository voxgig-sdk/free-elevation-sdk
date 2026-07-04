# Elevation entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from freeelevation_sdk import FreeElevationSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestElevationEntity:

    def test_should_create_instance(self):
        testsdk = FreeElevationSDK.test(None, None)
        ent = testsdk.Elevation(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _elevation_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "elevation." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set FREEELEVATION_TEST_ELEVATION_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        elevation_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.elevation")))
        elevation_ref01_data = None
        if len(elevation_ref01_data_raw) > 0:
            elevation_ref01_data = helpers.to_map(elevation_ref01_data_raw[0][1])

        # LIST
        elevation_ref01_ent = client.Elevation(None)
        elevation_ref01_match = {}

        elevation_ref01_list_result = elevation_ref01_ent.list(elevation_ref01_match, None)
        assert isinstance(elevation_ref01_list_result, list)

        # LOAD
        elevation_ref01_match_dt0 = {}
        elevation_ref01_data_dt0_loaded = elevation_ref01_ent.load(elevation_ref01_match_dt0, None)
        assert elevation_ref01_data_dt0_loaded is not None



def _elevation_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/elevation/ElevationTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = FreeElevationSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["elevation01", "elevation02", "elevation03", "lat01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "FREEELEVATION_TEST_ELEVATION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "FREEELEVATION_TEST_ELEVATION_ENTID": idmap,
        "FREEELEVATION_TEST_LIVE": "FALSE",
        "FREEELEVATION_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("FREEELEVATION_TEST_ELEVATION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("FREEELEVATION_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = FreeElevationSDK(helpers.to_map(merged_opts))

    _live = env.get("FREEELEVATION_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("FREEELEVATION_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
