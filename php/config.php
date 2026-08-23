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
                "slug" => "temp-mail-api2",
                "version" => "0.0.1",
                "target" => "php",
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
              'short' => 'Email body content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'customDomain',
              'short' => 'Custom domain for professional temporary email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'customDomainAvailable',
              'short' => 'Whether custom domains are supported',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'domains',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'email',
              'short' => 'Generated temporary email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expiresAt',
              'short' => 'Expiration date of the temporary email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'from',
              'short' => 'Sender email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'htmlBody',
              'short' => 'HTML version of email body',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique message identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'inboxUrl',
              'short' => 'URL to access the inbox',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isRead',
              'short' => 'Whether the message has been read',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'messages',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'prefix',
              'short' => 'Desired prefix for the email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'receivedAt',
              'short' => 'When the email was received',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'subject',
              'short' => 'Email subject',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'to',
              'short' => 'Recipient email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'token',
              'short' => 'Access token for managing this email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total',
              'short' => 'Total number of messages',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'validityPeriod',
              'short' => 'Validity period in days (default: 60+ days)',
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
