-- ProfanityChecker SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ProfanityChecker",
      slug = "profanity-checker",
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
            ["short"] = "List of words that were flagged as profanity",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "isProfanity",
            ["short"] = "Indicates whether profanity was detected in the message",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "message",
            ["req"] = true,
            ["short"] = "The text message to check for profanity",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "float",
            ["name"] = "score",
            ["short"] = "Confidence score for profanity detection",
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
                ["segments"] = {},
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
