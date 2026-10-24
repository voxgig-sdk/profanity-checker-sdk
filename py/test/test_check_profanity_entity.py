# CheckProfanity entity test

import json
import os
import time

import pytest

from profanitychecker_sdk.utility.voxgig_struct import voxgig_struct as vs
from profanitychecker_sdk import ProfanityCheckerSDK
from profanitychecker_sdk.core import helpers
from profanitychecker_sdk.config import shared_config
from profanitychecker_sdk.feature.base_feature import ProfanityCheckerBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestCheckProfanityEntity:

    def test_should_create_instance(self):
        testsdk = ProfanityCheckerSDK.test(None, None)
        ent = testsdk.CheckProfanity(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ProfanityCheckerSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.CheckProfanity(None).create({"message": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _check_profanity_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "check_profanity." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # CREATE
        check_profanity_ref01_ent = client.CheckProfanity(None)
        check_profanity_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.check_profanity"), "check_profanity_ref01"))

        check_profanity_ref01_data = helpers.to_map(runner.entity_data(check_profanity_ref01_ent.create(check_profanity_ref01_data, None)))
        assert check_profanity_ref01_data is not None



def _check_profanity_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/check_profanity/CheckProfanityTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ProfanityCheckerSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["check_profanity01", "check_profanity02", "check_profanity03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID": idmap,
        "PROFANITY_CHECKER_TEST_LIVE": "FALSE",
        "PROFANITY_CHECKER_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("PROFANITY_CHECKER_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = ProfanityCheckerSDK(helpers.to_map(merged_opts))

    _live = env.get("PROFANITY_CHECKER_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("PROFANITY_CHECKER_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
