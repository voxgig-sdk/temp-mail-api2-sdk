-- Typed models for the TempMailApi2 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class TemporaryEmail
---@field custom_domain? string
---@field data? table
---@field prefix? string
---@field success? boolean
---@field validity_period? number

---@class TemporaryEmailLoadMatch
---@field email? string
---@field message_id? string

---@class TemporaryEmailCreateData
---@field custom_domain? string
---@field data? table
---@field prefix? string
---@field success? boolean
---@field validity_period? number

---@class TemporaryEmailRemoveMatch
---@field email string

local M = {}

return M
