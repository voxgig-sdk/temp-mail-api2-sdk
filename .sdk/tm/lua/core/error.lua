-- TempMailApi2 SDK error

local TempMailApi2Error = {}
TempMailApi2Error.__index = TempMailApi2Error


function TempMailApi2Error.new(code, msg, ctx)
  local self = setmetatable({}, TempMailApi2Error)
  self.is_sdk_error = true
  self.sdk = "TempMailApi2"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TempMailApi2Error:error()
  return self.msg
end


function TempMailApi2Error:__tostring()
  return self.msg
end


return TempMailApi2Error
