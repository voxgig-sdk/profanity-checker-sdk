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
              "active" => true,
              "name" => "flagged_word",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "is_profanity",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "message",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "score",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 3,
            },
          ],
          "name" => "check_profanity",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "POST",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
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
