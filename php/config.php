<?php
declare(strict_types=1);

// ProfanityChecker SDK configuration

class ProfanityCheckerConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ProfanityChecker",
                "slug" => "profanity-checker",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://vector.profanity.dev",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "check_profanity" => [],
                ],
            ],
            "entity" => [
        'check_profanity' => [
          'fields' => [
            [
              'name' => 'flaggedWords',
              'short' => 'List of words that were flagged as profanity',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'isProfanity',
              'short' => 'Indicates whether profanity was detected in the message',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'message',
              'req' => true,
              'short' => 'The text message to check for profanity',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'float',
              'name' => 'score',
              'short' => 'Confidence score for profanity detection',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'check_profanity',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/',
                  'segments' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ProfanityCheckerFeatures::make_feature($name);
    }
}
