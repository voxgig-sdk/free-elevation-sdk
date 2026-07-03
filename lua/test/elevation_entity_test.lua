-- Elevation entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("free-elevation_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ElevationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Elevation(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = elevation_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "elevation." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set FREEELEVATION_TEST_ELEVATION_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local elevation_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.elevation")))
    local elevation_ref01_data = nil
    if #elevation_ref01_data_raw > 0 then
      elevation_ref01_data = helpers.to_map(elevation_ref01_data_raw[1][2])
    end

    -- LIST
    local elevation_ref01_ent = client:Elevation(nil)
    local elevation_ref01_match = {}

    local elevation_ref01_list_result, err = elevation_ref01_ent:list(elevation_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(elevation_ref01_list_result)

    -- LOAD
    local elevation_ref01_match_dt0 = {}
    local elevation_ref01_data_dt0_loaded, err = elevation_ref01_ent:load(elevation_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(elevation_ref01_data_dt0_loaded)

  end)
end)

function elevation_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/elevation/ElevationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read elevation test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "elevation01", "elevation02", "elevation03", "lat01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("FREEELEVATION_TEST_ELEVATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["FREEELEVATION_TEST_ELEVATION_ENTID"] = idmap,
    ["FREEELEVATION_TEST_LIVE"] = "FALSE",
    ["FREEELEVATION_TEST_EXPLAIN"] = "FALSE",
    ["FREEELEVATION_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["FREEELEVATION_TEST_ELEVATION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["FREEELEVATION_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["FREEELEVATION_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["FREEELEVATION_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["FREEELEVATION_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
