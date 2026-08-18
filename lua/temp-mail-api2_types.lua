-- Typed models for the TempMailApi2 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class TemporaryEmail
---@field attachments? table
---@field body? string
---@field customDomain? string
---@field customDomainAvailable? boolean
---@field domains? table
---@field email? string
---@field expiresAt? string
---@field from? string
---@field htmlBody? string
---@field id? string
---@field inboxUrl? string
---@field isRead? boolean
---@field messages? table
---@field prefix? string
---@field receivedAt? string
---@field subject? string
---@field to? string
---@field token? string
---@field total? number
---@field validityPeriod? number

---@class TemporaryEmailLoadMatch
---@field email string
---@field message_id string

---@class TemporaryEmailCreateData
---@field attachments? table
---@field body? string
---@field customDomain? string
---@field customDomainAvailable? boolean
---@field domains? table
---@field email? string
---@field expiresAt? string
---@field from? string
---@field htmlBody? string
---@field id? string
---@field inboxUrl? string
---@field isRead? boolean
---@field messages? table
---@field prefix? string
---@field receivedAt? string
---@field subject? string
---@field to? string
---@field token? string
---@field total? number
---@field validityPeriod? number

---@class TemporaryEmailRemoveMatch
---@field email string

local M = {}

return M
