# ProfanityChecker SDK configuration

module ProfanityCheckerConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ProfanityChecker",
        "slug" => "profanity-checker",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "name" => "flaggedWords",
              "short" => "List of words that were flagged as profanity",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "isProfanity",
              "short" => "Indicates whether profanity was detected in the message",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "message",
              "req" => true,
              "short" => "The text message to check for profanity",
              "type" => "`$STRING`",
            },
            {
              "format" => "float",
              "name" => "score",
              "short" => "Confidence score for profanity detection",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "check_profanity",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/",
                  "segments" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [],
                },
              ],
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
