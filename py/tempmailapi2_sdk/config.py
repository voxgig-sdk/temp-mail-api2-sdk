# TempMailApi2 SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "TempMailApi2",
            "slug": "temp-mail-api2",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.boomlify.com/v1",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "temporary_email": {},
            },
        },
        "entity": {
      "temporary_email": {
        "fields": [
          {
            "name": "attachments",
            "type": "`$ARRAY`",
          },
          {
            "name": "body",
            "short": "Email body content",
            "type": "`$STRING`",
          },
          {
            "name": "customDomain",
            "short": "Custom domain for professional temporary email",
            "type": "`$STRING`",
          },
          {
            "name": "customDomainAvailable",
            "short": "Whether custom domains are supported",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "domains",
            "type": "`$ARRAY`",
          },
          {
            "format": "email",
            "name": "email",
            "short": "Generated temporary email address",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "expiresAt",
            "short": "Expiration date of the temporary email",
            "type": "`$STRING`",
          },
          {
            "format": "email",
            "name": "from",
            "short": "Sender email address",
            "type": "`$STRING`",
          },
          {
            "name": "htmlBody",
            "short": "HTML version of email body",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique message identifier",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "inboxUrl",
            "short": "URL to access the inbox",
            "type": "`$STRING`",
          },
          {
            "name": "isRead",
            "short": "Whether the message has been read",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "messages",
            "type": "`$ARRAY`",
          },
          {
            "name": "prefix",
            "short": "Desired prefix for the email address",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "receivedAt",
            "short": "When the email was received",
            "type": "`$STRING`",
          },
          {
            "name": "subject",
            "short": "Email subject",
            "type": "`$STRING`",
          },
          {
            "format": "email",
            "name": "to",
            "short": "Recipient email address",
            "type": "`$STRING`",
          },
          {
            "name": "token",
            "short": "Access token for managing this email address",
            "type": "`$STRING`",
          },
          {
            "name": "total",
            "short": "Total number of messages",
            "type": "`$INTEGER`",
          },
          {
            "name": "validityPeriod",
            "short": "Validity period in days (default: 60+ days)",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "temporary_email",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/temp-mail/generate",
                "segments": [
                  {
                    "lit": "temp-mail",
                  },
                  {
                    "lit": "generate",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "temp-mail",
                  "generate",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "user123@tempmail.boomlify.com",
                      "kind": "param",
                      "name": "email",
                      "orig": "email",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/temp-mail/{email}/inbox",
                "segments": [
                  {
                    "lit": "temp-mail",
                  },
                  {
                    "var": "email",
                  },
                  {
                    "lit": "inbox",
                  },
                ],
                "select": {
                  "exist": [
                    "email",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "temp-mail",
                  "{email}",
                  "inbox",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "email",
                      "orig": "email",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "message_id",
                      "orig": "message_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/temp-mail/{email}/messages/{messageId}",
                "rename": {
                  "param": {
                    "messageId": "message_id",
                  },
                },
                "segments": [
                  {
                    "lit": "temp-mail",
                  },
                  {
                    "var": "email",
                  },
                  {
                    "lit": "messages",
                  },
                  {
                    "var": "message_id",
                  },
                ],
                "select": {
                  "exist": [
                    "email",
                    "message_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "temp-mail",
                  "{email}",
                  "messages",
                  "{message_id}",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/temp-mail/domains",
                "segments": [
                  {
                    "lit": "temp-mail",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "temp-mail",
                  "domains",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "email",
                      "orig": "email",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/temp-mail/{email}/delete",
                "segments": [
                  {
                    "lit": "temp-mail",
                  },
                  {
                    "var": "email",
                  },
                  {
                    "lit": "delete",
                  },
                ],
                "select": {
                  "exist": [
                    "email",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "temp-mail",
                  "{email}",
                  "delete",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
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
