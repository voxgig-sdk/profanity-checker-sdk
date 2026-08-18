-- ProfanityChecker SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ProfanityChecker",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://vector.profanity.dev",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["check_profanity"] = {},
      },
    },
    entity = {
      ["check_profanity"] = {
        ["fields"] = {
          {
            ["name"] = "flaggedWords",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "isProfanity",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "message",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "score",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "check_profanity",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/",
                ["parts"] = {},
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
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
