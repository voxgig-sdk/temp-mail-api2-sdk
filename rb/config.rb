# TempMailApi2 SDK configuration

module TempMailApi2Config
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
        "name" => "TempMailApi2",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.boomlify.com/v1",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "temporary_email" => {},
        },
      },
      "entity" => {
        "temporary_email" => {
          "fields" => [
            {
              "name" => "attachments",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "body",
              "type" => "`$STRING`",
            },
            {
              "name" => "customDomain",
              "type" => "`$STRING`",
            },
            {
              "name" => "customDomainAvailable",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "domains",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "email",
              "type" => "`$STRING`",
            },
            {
              "name" => "expiresAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "from",
              "type" => "`$STRING`",
            },
            {
              "name" => "htmlBody",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "inboxUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "isRead",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "messages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "prefix",
              "type" => "`$STRING`",
            },
            {
              "name" => "receivedAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "subject",
              "type" => "`$STRING`",
            },
            {
              "name" => "to",
              "type" => "`$STRING`",
            },
            {
              "name" => "token",
              "type" => "`$STRING`",
            },
            {
              "name" => "total",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "validityPeriod",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "temporary_email",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/temp-mail/generate",
                  "parts" => [
                    "temp-mail",
                    "generate",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "user123@tempmail.boomlify.com",
                        "kind" => "param",
                        "name" => "email",
                        "orig" => "email",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/temp-mail/{email}/inbox",
                  "parts" => [
                    "temp-mail",
                    "{email}",
                    "inbox",
                  ],
                  "select" => {
                    "exist" => [
                      "email",
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "email",
                        "orig" => "email",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "message_id",
                        "orig" => "message_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/temp-mail/{email}/messages/{messageId}",
                  "parts" => [
                    "temp-mail",
                    "{email}",
                    "messages",
                    "{message_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "messageId" => "message_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "email",
                      "message_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/temp-mail/domains",
                  "parts" => [
                    "temp-mail",
                    "domains",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "email",
                        "orig" => "email",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/temp-mail/{email}/delete",
                  "parts" => [
                    "temp-mail",
                    "{email}",
                    "delete",
                  ],
                  "select" => {
                    "exist" => [
                      "email",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "temp_mail",
              ],
              [
                "temp_mail",
                "message",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    TempMailApi2Features.make_feature(name)
  end
end
