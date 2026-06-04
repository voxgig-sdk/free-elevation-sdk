package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/free-elevation-sdk/go"
	"github.com/voxgig-sdk/free-elevation-sdk/go/core"

	vs "github.com/voxgig-sdk/free-elevation-sdk/go/utility/struct"
)

func TestElevationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Elevation(nil)
		if ent == nil {
			t.Fatal("expected non-nil ElevationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := elevationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "elevation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FREEELEVATION_TEST_ELEVATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		elevationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.elevation", setup.data)))
		var elevationRef01Data map[string]any
		if len(elevationRef01DataRaw) > 0 {
			elevationRef01Data = core.ToMapAny(elevationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = elevationRef01Data

		// LIST
		elevationRef01Ent := client.Elevation(nil)
		elevationRef01Match := map[string]any{}

		elevationRef01ListResult, err := elevationRef01Ent.List(elevationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, elevationRef01ListOk := elevationRef01ListResult.([]any)
		if !elevationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", elevationRef01ListResult)
		}

		// LOAD
		elevationRef01MatchDt0 := map[string]any{}
		elevationRef01DataDt0Loaded, err := elevationRef01Ent.Load(elevationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if elevationRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func elevationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "elevation", "ElevationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read elevation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse elevation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"elevation01", "elevation02", "elevation03", "lat01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FREEELEVATION_TEST_ELEVATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FREEELEVATION_TEST_ELEVATION_ENTID": idmap,
		"FREEELEVATION_TEST_LIVE":      "FALSE",
		"FREEELEVATION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FREEELEVATION_TEST_ELEVATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FREEELEVATION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewFreeElevationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FREEELEVATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FREEELEVATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
