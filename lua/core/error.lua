-- FreeElevation SDK error

local FreeElevationError = {}
FreeElevationError.__index = FreeElevationError


function FreeElevationError.new(code, msg, ctx)
  local self = setmetatable({}, FreeElevationError)
  self.is_sdk_error = true
  self.sdk = "FreeElevation"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FreeElevationError:error()
  return self.msg
end


function FreeElevationError:__tostring()
  return self.msg
end


return FreeElevationError
