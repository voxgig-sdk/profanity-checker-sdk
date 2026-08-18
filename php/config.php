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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'isProfanity',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'message',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'score',
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
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
