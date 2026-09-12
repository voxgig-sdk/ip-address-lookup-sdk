-- IpAddressLookup SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "IpAddressLookup",
      slug = "ip-address-lookup",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://ipty.org",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_ip_address"] = {},
      },
    },
    entity = {
      ["get_ip_address"] = {
        ["fields"] = {
          {
            ["name"] = "asn",
            ["short"] = "Autonomous System Number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isp",
            ["short"] = "Internet Service Provider",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "organization",
            ["short"] = "Organization owning the IP range",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_ip_address",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["segments"] = {},
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.network`",
                },
                ["parts"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
