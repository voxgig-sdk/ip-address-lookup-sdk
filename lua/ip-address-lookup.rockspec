package = "voxgig-sdk-ip-address-lookup"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ip-address-lookup-sdk.git"
}
description = {
  summary = "IpAddressLookup SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ip-address-lookup_sdk"] = "ip-address-lookup_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
