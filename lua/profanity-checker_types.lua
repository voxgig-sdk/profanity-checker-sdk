-- Typed models for the ProfanityChecker SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CheckProfanity
---@field flagged_word? table
---@field is_profanity? boolean
---@field message string
---@field score? number

---@class CheckProfanityCreateData
---@field flagged_word? table
---@field is_profanity? boolean
---@field message string
---@field score? number

local M = {}

return M
