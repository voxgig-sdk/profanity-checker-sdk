# ProfanityChecker SDK configuration

module ProfanityCheckerConfig
  def self.make_config
    {
      "main" => {
        "name" => "ProfanityChecker",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://vector.profanity.dev",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "check_profanity" => {},
        },
      },
      "entity" => {
        "check_profanity" => {
          "fields" => [
            {
              "name" => "flagged_word",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "is_profanity",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "message",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "score",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 3,
            },
          ],
          "name" => "check_profanity",
          "op" => {
            "create" => {
              "name" => "create",
              "points" => [
                {
                  "method" => "POST",
                  "orig" => "/",
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "parts" => [],
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "create",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ProfanityCheckerFeatures.make_feature(name)
  end
end
