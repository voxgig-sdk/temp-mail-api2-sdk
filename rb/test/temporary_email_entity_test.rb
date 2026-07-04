# TemporaryEmail entity test

require "minitest/autorun"
require "json"
require_relative "../TempMailApi2_sdk"
require_relative "runner"

class TemporaryEmailEntityTest < Minitest::Test
  def test_create_instance
    testsdk = TempMailApi2SDK.test(nil, nil)
    ent = testsdk.TemporaryEmail(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = temporary_email_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "temporary_email." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    temporary_email_ref01_ent = client.TemporaryEmail(nil)
    temporary_email_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.temporary_email"), "temporary_email_ref01"))
    temporary_email_ref01_data["email"] = setup[:idmap]["email01"]

    temporary_email_ref01_data_result = temporary_email_ref01_ent.create(temporary_email_ref01_data, nil)
    temporary_email_ref01_data = Helpers.to_map(temporary_email_ref01_data_result)
    assert !temporary_email_ref01_data.nil?

    # LOAD
    temporary_email_ref01_match_dt0 = {}
    temporary_email_ref01_data_dt0_loaded = temporary_email_ref01_ent.load(temporary_email_ref01_match_dt0, nil)
    assert !temporary_email_ref01_data_dt0_loaded.nil?

    # REMOVE
    temporary_email_ref01_match_rm0 = {
      "id" => temporary_email_ref01_data["id"],
    }
    temporary_email_ref01_ent.remove(temporary_email_ref01_match_rm0, nil)

  end
end

def temporary_email_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "temporary_email", "TemporaryEmailTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = TempMailApi2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["temporary_email01", "temporary_email02", "temporary_email03", "temp_mail01", "temp_mail02", "temp_mail03", "message01", "message02", "message03", "email01"],
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
  entid_env_raw = ENV["TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID" => idmap,
    "TEMPMAILAPI__TEST_LIVE" => "FALSE",
    "TEMPMAILAPI__TEST_EXPLAIN" => "FALSE",
    "TEMPMAILAPI__APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["TEMPMAILAPI__TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["TEMPMAILAPI__APIKEY"],
      },
      extra || {},
    ])
    client = TempMailApi2SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["TEMPMAILAPI__TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["TEMPMAILAPI__TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
