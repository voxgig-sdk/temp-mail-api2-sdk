-- TemporaryEmail entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("temp-mail-api2_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("TemporaryEmailEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:TemporaryEmail(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = temporary_email_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "temporary_email." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local temporary_email_ref01_ent = client:TemporaryEmail(nil)
    local temporary_email_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.temporary_email"), "temporary_email_ref01"))
    temporary_email_ref01_data["email"] = setup.idmap["email01"]

    local temporary_email_ref01_data_result, err = temporary_email_ref01_ent:create(temporary_email_ref01_data, nil)
    assert.is_nil(err)
    temporary_email_ref01_data = helpers.to_map(temporary_email_ref01_data_result)
    assert.is_not_nil(temporary_email_ref01_data)

    -- LOAD
    local temporary_email_ref01_match_dt0 = {}
    local temporary_email_ref01_data_dt0_loaded, err = temporary_email_ref01_ent:load(temporary_email_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(temporary_email_ref01_data_dt0_loaded)

    -- REMOVE
    local temporary_email_ref01_match_rm0 = {
      id = temporary_email_ref01_data["id"],
    }
    local _, err = temporary_email_ref01_ent:remove(temporary_email_ref01_match_rm0, nil)
    assert.is_nil(err)

  end)
end)

function temporary_email_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/temporary_email/TemporaryEmailTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read temporary_email test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "temporary_email01", "temporary_email02", "temporary_email03", "temp_mail01", "temp_mail02", "temp_mail03", "message01", "message02", "message03", "email01" },
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
  local entid_env_raw = os.getenv("TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID"] = idmap,
    ["TEMPMAILAPI__TEST_LIVE"] = "FALSE",
    ["TEMPMAILAPI__TEST_EXPLAIN"] = "FALSE",
    ["TEMPMAILAPI__APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["TEMPMAILAPI__TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["TEMPMAILAPI__APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["TEMPMAILAPI__TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["TEMPMAILAPI__TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
