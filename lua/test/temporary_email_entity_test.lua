-- TemporaryEmail entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("temp-mail-api2_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("TemporaryEmailEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:TemporaryEmail(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:TemporaryEmail(nil):load({ ["email"] = 1, ["message_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
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
    if setup.live then
      for _, _live_key in ipairs({"email01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID")
        end
      end
    end
    local client = setup.client

    -- CREATE
    local temporary_email_ref01_ent = client:TemporaryEmail(nil)
    local temporary_email_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.temporary_email"), "temporary_email_ref01"))
    temporary_email_ref01_data["email"] = setup.idmap["email01"]

    local temporary_email_ref01_data_result, err = temporary_email_ref01_ent:create(temporary_email_ref01_data, nil)
    assert.is_nil(err)
    temporary_email_ref01_data = helpers.to_map(type(temporary_email_ref01_data_result) == 'table' and temporary_email_ref01_data_result.data_get and temporary_email_ref01_data_result:data_get() or temporary_email_ref01_data_result)
    assert.is_not_nil(temporary_email_ref01_data)
    assert.is_not_nil(temporary_email_ref01_data["id"])

    -- LOAD
    local temporary_email_ref01_match_dt0 = {
      id = temporary_email_ref01_data["id"],
    }
    local temporary_email_ref01_data_dt0_loaded, err = temporary_email_ref01_ent:load(temporary_email_ref01_match_dt0, nil)
    assert.is_nil(err)
    local temporary_email_ref01_data_dt0_load_result = helpers.to_map(type(temporary_email_ref01_data_dt0_loaded) == 'table' and temporary_email_ref01_data_dt0_loaded.data_get and temporary_email_ref01_data_dt0_loaded:data_get() or temporary_email_ref01_data_dt0_loaded)
    assert.is_not_nil(temporary_email_ref01_data_dt0_load_result)
    assert.are.equal(temporary_email_ref01_data_dt0_load_result["id"], temporary_email_ref01_data["id"])

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
    { "temporary_email01", "temporary_email02", "temporary_email03", "email01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID"] = idmap,
    ["TEMP_MAIL_API2_TEST_LIVE"] = "FALSE",
    ["TEMP_MAIL_API2_TEST_EXPLAIN"] = "FALSE",
    ["TEMP_MAIL_API2_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["TEMP_MAIL_API2_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["TEMP_MAIL_API2_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["TEMP_MAIL_API2_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["TEMP_MAIL_API2_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
