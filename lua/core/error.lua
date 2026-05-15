-- ProfanityChecker SDK error

local ProfanityCheckerError = {}
ProfanityCheckerError.__index = ProfanityCheckerError


function ProfanityCheckerError.new(code, msg, ctx)
  local self = setmetatable({}, ProfanityCheckerError)
  self.is_sdk_error = true
  self.sdk = "ProfanityChecker"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ProfanityCheckerError:error()
  return self.msg
end


function ProfanityCheckerError:__tostring()
  return self.msg
end


return ProfanityCheckerError
