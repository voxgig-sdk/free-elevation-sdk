# Elevation entity test

require "minitest/autorun"
require "json"
require_relative "../FreeElevation_sdk"
require_relative "runner"

class ElevationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FreeElevationSDK.test(nil, nil)
    ent = testsdk.Elevation(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = elevation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "elevation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FREEELEVATION_TEST_ELEVATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    elevation_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.elevation")))
    elevation_ref01_data = nil
    if elevation_ref01_data_raw.length > 0
      elevation_ref01_data = Helpers.to_map(elevation_ref01_data_raw[0][1])
    end

    # LIST
    elevation_ref01_ent = client.Elevation(nil)
    elevation_ref01_match = {}

    elevation_ref01_list_result, err = elevation_ref01_ent.list(elevation_ref01_match, nil)
    assert_nil err
    assert elevation_ref01_list_result.is_a?(Array)

    # LOAD
    elevation_ref01_match_dt0 = {}
    elevation_ref01_data_dt0_loaded, err = elevation_ref01_ent.load(elevation_ref01_match_dt0, nil)
    assert_nil err
    assert !elevation_ref01_data_dt0_loaded.nil?

  end
end

def elevation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "elevation", "ElevationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FreeElevationSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["elevation01", "elevation02", "elevation03", "lat01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FREEELEVATION_TEST_ELEVATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FREEELEVATION_TEST_ELEVATION_ENTID" => idmap,
    "FREEELEVATION_TEST_LIVE" => "FALSE",
    "FREEELEVATION_TEST_EXPLAIN" => "FALSE",
    "FREEELEVATION_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["FREEELEVATION_TEST_ELEVATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FREEELEVATION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["FREEELEVATION_APIKEY"],
      },
      extra || {},
    ])
    client = FreeElevationSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FREEELEVATION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FREEELEVATION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
