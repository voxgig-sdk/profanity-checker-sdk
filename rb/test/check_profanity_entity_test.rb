# CheckProfanity entity test

require "minitest/autorun"
require "json"
require_relative "../ProfanityChecker_sdk"
require_relative "runner"

class CheckProfanityEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ProfanityCheckerSDK.test(nil, nil)
    ent = testsdk.CheckProfanity(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ProfanityCheckerConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ProfanityCheckerSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CheckProfanity(nil).create({ "message" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = check_profanity_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "check_profanity." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    check_profanity_ref01_ent = client.CheckProfanity(nil)
    check_profanity_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.check_profanity"), "check_profanity_ref01"))

    check_profanity_ref01_data_result = check_profanity_ref01_ent.create(check_profanity_ref01_data, nil)
    check_profanity_ref01_data = Helpers.to_map(check_profanity_ref01_data_result.respond_to?(:data_get) ? check_profanity_ref01_data_result.data_get : check_profanity_ref01_data_result)
    assert !check_profanity_ref01_data.nil?

  end
end

def check_profanity_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "check_profanity", "CheckProfanityTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ProfanityCheckerSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["check_profanity01", "check_profanity02", "check_profanity03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID" => idmap,
    "PROFANITY_CHECKER_TEST_LIVE" => "FALSE",
    "PROFANITY_CHECKER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PROFANITY_CHECKER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = ProfanityCheckerSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PROFANITY_CHECKER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PROFANITY_CHECKER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
