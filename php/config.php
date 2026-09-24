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
                "base" => "https://api.boomlify.com/v1",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-API-Key",
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
              'title' => 'Attachments',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'body',
              'title' => 'Body',
              'type' => '`$STRING`',
              'short' => 'Email body content',
            ],
            [
              'name' => 'customDomain',
              'title' => 'Custom Domain',
              'type' => '`$STRING`',
              'short' => 'Custom domain for professional temporary email',
            ],
            [
              'name' => 'customDomainAvailable',
              'title' => 'Custom Domain Available',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether custom domains are supported',
            ],
            [
              'name' => 'domains',
              'title' => 'Domains',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'short' => 'Generated temporary email address',
              'format' => 'email',
            ],
            [
              'name' => 'expiresAt',
              'title' => 'Expires At',
              'type' => '`$STRING`',
              'short' => 'Expiration date of the temporary email',
              'format' => 'date-time',
            ],
            [
              'name' => 'from',
              'title' => 'From',
              'type' => '`$STRING`',
              'short' => 'Sender email address',
              'format' => 'email',
            ],
            [
              'name' => 'htmlBody',
              'title' => 'Html Body',
              'type' => '`$STRING`',
              'short' => 'HTML version of email body',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique message identifier',
            ],
            [
              'name' => 'inboxUrl',
              'title' => 'Inbox Url',
              'type' => '`$STRING`',
              'short' => 'URL to access the inbox',
              'format' => 'uri',
            ],
            [
              'name' => 'isRead',
              'title' => 'Is Read',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the message has been read',
            ],
            [
              'name' => 'messages',
              'title' => 'Messages',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'prefix',
              'title' => 'Prefix',
              'type' => '`$STRING`',
              'short' => 'Desired prefix for the email address',
            ],
            [
              'name' => 'receivedAt',
              'title' => 'Received At',
              'type' => '`$STRING`',
              'short' => 'When the email was received',
              'format' => 'date-time',
            ],
            [
              'name' => 'subject',
              'title' => 'Subject',
              'type' => '`$STRING`',
              'short' => 'Email subject',
            ],
            [
              'name' => 'to',
              'title' => 'To',
              'type' => '`$STRING`',
              'short' => 'Recipient email address',
              'format' => 'email',
            ],
            [
              'name' => 'token',
              'title' => 'Token',
              'type' => '`$STRING`',
              'short' => 'Access token for managing this email address',
            ],
            [
              'name' => 'total',
              'title' => 'Total',
              'type' => '`$INTEGER`',
              'short' => 'Total number of messages',
            ],
            [
              'name' => 'validityPeriod',
              'title' => 'Validity Period',
              'type' => '`$INTEGER`',
              'short' => 'Validity period in days (default: 60+ days)',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'temporary_email',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/temp-mail/generate',
                  'segments' => [
                    [
                      'lit' => 'temp-mail',
                    ],
                    [
                      'lit' => 'generate',
                    ],
                  ],
                  'parts' => [
                    'temp-mail',
                    'generate',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/temp-mail/{email}/inbox',
                  'segments' => [
                    [
                      'lit' => 'temp-mail',
                    ],
                    [
                      'var' => 'email',
                    ],
                    [
                      'lit' => 'inbox',
                    ],
                  ],
                  'parts' => [
                    'temp-mail',
                    '{email}',
                    'inbox',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'email',
                        'orig' => 'email',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'user123@tempmail.boomlify.com',
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                      'limit',
                      'offset',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/temp-mail/{email}/messages/{messageId}',
                  'segments' => [
                    [
                      'lit' => 'temp-mail',
                    ],
                    [
                      'var' => 'email',
                    ],
                    [
                      'lit' => 'messages',
                    ],
                    [
                      'var' => 'message_id',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'email',
                        'orig' => 'email',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'message_id',
                        'orig' => 'message_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                      'message_id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/temp-mail/domains',
                  'segments' => [
                    [
                      'lit' => 'temp-mail',
                    ],
                    [
                      'lit' => 'domains',
                    ],
                  ],
                  'parts' => [
                    'temp-mail',
                    'domains',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/temp-mail/{email}/delete',
                  'segments' => [
                    [
                      'lit' => 'temp-mail',
                    ],
                    [
                      'var' => 'email',
                    ],
                    [
                      'lit' => 'delete',
                    ],
                  ],
                  'parts' => [
                    'temp-mail',
                    '{email}',
                    'delete',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'email',
                        'orig' => 'email',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                    ],
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
        return TempMailApi2Features::make_feature($name);
    }
}
