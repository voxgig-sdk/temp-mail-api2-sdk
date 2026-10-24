package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/temp-mail-api2-sdk/go"
	"github.com/voxgig-sdk/temp-mail-api2-sdk/go/core"

	vs "github.com/voxgig-sdk/temp-mail-api2-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const temporary_emailEntityLiveStrict = true


func TestTemporaryEmailEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.TemporaryEmail(nil)
		if ent == nil {
			t.Fatal("expected non-nil TemporaryEmailEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.TemporaryEmail(nil).Load(map[string]any{"email": 1, "message_id": "x"}, nil)
		if sdkerr, ok := err.(*core.TempMailApi2Error); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := temporary_emailBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "temporary_email." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"email01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, temporary_emailEntityLiveStrict, "Live entity test blocked: needs %s via TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		temporaryEmailRef01Ent := client.TemporaryEmail(nil)
		temporaryEmailRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "temporary_email"}), "temporary_email_ref01"))
		temporaryEmailRef01Data["email"] = setup.idmap["email01"]

		temporaryEmailRef01DataResult, err := temporaryEmailRef01Ent.Create(temporaryEmailRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		temporaryEmailRef01Data = core.ToMapAny(entityData(temporaryEmailRef01DataResult))
		if temporaryEmailRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if temporaryEmailRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		temporaryEmailRef01MatchDt0 := map[string]any{
			"id": temporaryEmailRef01Data["id"],
		}
		temporaryEmailRef01DataDt0Loaded, err := temporaryEmailRef01Ent.Load(temporaryEmailRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		temporaryEmailRef01DataDt0LoadResult := core.ToMapAny(entityData(temporaryEmailRef01DataDt0Loaded))
		if temporaryEmailRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if temporaryEmailRef01DataDt0LoadResult["id"] != temporaryEmailRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		temporaryEmailRef01MatchRm0 := map[string]any{
			"id": temporaryEmailRef01Data["id"],
		}
		_, err = temporaryEmailRef01Ent.Remove(temporaryEmailRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func temporary_emailBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "temporary_email", "TemporaryEmailTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read temporary_email test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse temporary_email test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"temporary_email01", "temporary_email02", "temporary_email03", "email01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID": idmap,
		"TEMP_MAIL_API2_TEST_LIVE":      "FALSE",
		"TEMP_MAIL_API2_TEST_EXPLAIN":   "FALSE",
		"TEMP_MAIL_API2_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TEMP_MAIL_API2_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["TEMP_MAIL_API2_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewTempMailApi2SDK(core.ToMapAny(mergedOpts))
	}

	live := env["TEMP_MAIL_API2_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TEMP_MAIL_API2_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
