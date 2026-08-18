<?php
declare(strict_types=1);

// TempMailApi2 SDK configuration

class TempMailApi2Config
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
                "name" => "TempMailApi2",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.boomlify.com/v1",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "temporary_email" => [],
                ],
            ],
            "entity" => [
        'temporary_email' => [
          'fields' => [
            [
              'name' => 'attachments',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'body',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'customDomain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'customDomainAvailable',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'domains',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expiresAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'from',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'htmlBody',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'inboxUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isRead',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'messages',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'prefix',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'receivedAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'subject',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'to',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'token',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'validityPeriod',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'temporary_email',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/temp-mail/generate',
                  'parts' => [
                    'temp-mail',
                    'generate',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
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
                        'example' => 'user123@tempmail.boomlify.com',
                        'kind' => 'param',
                        'name' => 'email',
                        'orig' => 'email',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/temp-mail/{email}/inbox',
                  'parts' => [
                    'temp-mail',
                    '{email}',
                    'inbox',
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                      'limit',
                      'offset',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'email',
                        'orig' => 'email',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'message_id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/temp-mail/{email}/messages/{messageId}',
                  'parts' => [
                    'temp-mail',
                    '{email}',
                    'messages',
                    '{message_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'messageId' => 'message_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                      'message_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/temp-mail/domains',
                  'parts' => [
                    'temp-mail',
                    'domains',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'email',
                        'orig' => 'email',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/temp-mail/{email}/delete',
                  'parts' => [
                    'temp-mail',
                    '{email}',
                    'delete',
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'temp_mail',
              ],
              [
                'temp_mail',
                'message',
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
        return TempMailApi2Features::make_feature($name);
    }
}
