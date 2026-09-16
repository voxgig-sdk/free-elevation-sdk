<?php
declare(strict_types=1);

// FreeElevation SDK configuration

class FreeElevationConfig
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
                "name" => "FreeElevation",
                "slug" => "free-elevation",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://www.elevation-api.eu/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "elevation" => [],
                ],
            ],
            "entity" => [
        'elevation' => [
          'fields' => [
            [
              'name' => 'elevation',
              'short' => 'Elevation in meters',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'latitude',
              'short' => 'Latitude of the point',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'longitude',
              'short' => 'Longitude of the point',
              'type' => '`$NUMBER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
            'parts' => [
              'lat',
              'lon',
            ],
            'sep' => '/',
          ],
          'name' => 'elevation',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '[[46.24566,6.17081],[46.85499,6.78134]]',
                        'kind' => 'query',
                        'name' => 'pts',
                        'orig' => 'pts',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/elevation',
                  'segments' => [
                    [
                      'lit' => 'elevation',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'pts',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'elevation',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 46.24566,
                        'kind' => 'param',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 6.17081,
                        'kind' => 'param',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'json',
                        'orig' => 'json',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/elevation/{lat}/{lon}',
                  'segments' => [
                    [
                      'lit' => 'elevation',
                    ],
                    [
                      'var' => 'lat',
                    ],
                    [
                      'var' => 'lon',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'json',
                      'lat',
                      'lon',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'elevation',
                    '{lat}',
                    '{lon}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'elevation',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FreeElevationFeatures::make_feature($name);
    }
}
