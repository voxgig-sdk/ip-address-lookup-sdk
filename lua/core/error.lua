-- IpAddressLookup SDK error

local IpAddressLookupError = {}
IpAddressLookupError.__index = IpAddressLookupError


function IpAddressLookupError.new(code, msg, ctx)
  local self = setmetatable({}, IpAddressLookupError)
  self.is_sdk_error = true
  self.sdk = "IpAddressLookup"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IpAddressLookupError:error()
  return self.msg
end


function IpAddressLookupError:__tostring()
  return self.msg
end


return IpAddressLookupError
