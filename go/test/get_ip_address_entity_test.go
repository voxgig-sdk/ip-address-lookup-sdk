package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ip-address-lookup-sdk"
	"github.com/voxgig-sdk/ip-address-lookup-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGetIpAddressEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetIpAddress(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetIpAddressEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_ip_addressBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_ip_address." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set IPADDRESSLOOKUP_TEST_GET_IP_ADDRESS_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getIpAddressRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_ip_address", setup.data)))
		var getIpAddressRef01Data map[string]any
		if len(getIpAddressRef01DataRaw) > 0 {
			getIpAddressRef01Data = core.ToMapAny(getIpAddressRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getIpAddressRef01Data

		// LOAD
		getIpAddressRef01Ent := client.GetIpAddress(nil)
		getIpAddressRef01MatchDt0 := map[string]any{}
		getIpAddressRef01DataDt0Loaded, err := getIpAddressRef01Ent.Load(getIpAddressRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if getIpAddressRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func get_ip_addressBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_ip_address", "GetIpAddressTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_ip_address test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_ip_address test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_ip_address01", "get_ip_address02", "get_ip_address03"},
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
	entidEnvRaw := os.Getenv("IPADDRESSLOOKUP_TEST_GET_IP_ADDRESS_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IPADDRESSLOOKUP_TEST_GET_IP_ADDRESS_ENTID": idmap,
		"IPADDRESSLOOKUP_TEST_LIVE":      "FALSE",
		"IPADDRESSLOOKUP_TEST_EXPLAIN":   "FALSE",
		"IPADDRESSLOOKUP_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["IPADDRESSLOOKUP_TEST_GET_IP_ADDRESS_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IPADDRESSLOOKUP_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["IPADDRESSLOOKUP_APIKEY"],
			},
			extra,
		})
		client = sdk.NewIpAddressLookupSDK(core.ToMapAny(mergedOpts))
	}

	live := env["IPADDRESSLOOKUP_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IPADDRESSLOOKUP_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
