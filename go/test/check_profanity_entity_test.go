package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/profanity-checker-sdk"
	"github.com/voxgig-sdk/profanity-checker-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCheckProfanityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CheckProfanity(nil)
		if ent == nil {
			t.Fatal("expected non-nil CheckProfanityEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := check_profanityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "check_profanity." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set PROFANITYCHECKER_TEST_CHECK_PROFANITY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		checkProfanityRef01Ent := client.CheckProfanity(nil)
		checkProfanityRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "check_profanity"}, setup.data), "check_profanity_ref01"))

		checkProfanityRef01DataResult, err := checkProfanityRef01Ent.Create(checkProfanityRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		checkProfanityRef01Data = core.ToMapAny(checkProfanityRef01DataResult)
		if checkProfanityRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func check_profanityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "check_profanity", "CheckProfanityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read check_profanity test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse check_profanity test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"check_profanity01", "check_profanity02", "check_profanity03"},
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
	entidEnvRaw := os.Getenv("PROFANITYCHECKER_TEST_CHECK_PROFANITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PROFANITYCHECKER_TEST_CHECK_PROFANITY_ENTID": idmap,
		"PROFANITYCHECKER_TEST_LIVE":      "FALSE",
		"PROFANITYCHECKER_TEST_EXPLAIN":   "FALSE",
		"PROFANITYCHECKER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["PROFANITYCHECKER_TEST_CHECK_PROFANITY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PROFANITYCHECKER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["PROFANITYCHECKER_APIKEY"],
			},
			extra,
		})
		client = sdk.NewProfanityCheckerSDK(core.ToMapAny(mergedOpts))
	}

	live := env["PROFANITYCHECKER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PROFANITYCHECKER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
