"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'TempMailApi2',
        slug: "temp-mail-api2",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.boomlify.com/v1",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            temporary_email: {},
        }
    };
    entity = {
        "temporary_email": {
            "fields": [
                {
                    "name": "attachments",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "body",
                    "short": "Email body content",
                    "type": "`$STRING`"
                },
                {
                    "name": "customDomain",
                    "short": "Custom domain for professional temporary email",
                    "type": "`$STRING`"
                },
                {
                    "name": "customDomainAvailable",
                    "short": "Whether custom domains are supported",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "domains",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "email",
                    "name": "email",
                    "short": "Generated temporary email address",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "expiresAt",
                    "short": "Expiration date of the temporary email",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "from",
                    "short": "Sender email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "htmlBody",
                    "short": "HTML version of email body",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique message identifier",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "inboxUrl",
                    "short": "URL to access the inbox",
                    "type": "`$STRING`"
                },
                {
                    "name": "isRead",
                    "short": "Whether the message has been read",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "messages",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "prefix",
                    "short": "Desired prefix for the email address",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "receivedAt",
                    "short": "When the email was received",
                    "type": "`$STRING`"
                },
                {
                    "name": "subject",
                    "short": "Email subject",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "to",
                    "short": "Recipient email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "token",
                    "short": "Access token for managing this email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "total",
                    "short": "Total number of messages",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "validityPeriod",
                    "short": "Validity period in days (default: 60+ days)",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                    "lit": "temp-mail"
                                },
                                {
                                    "lit": "generate"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "parts": [
                                "temp-mail",
                                "generate"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/temp-mail/{email}/inbox",
                            "segments": [
                                {
                                    "lit": "temp-mail"
                                },
                                {
                                    "var": "email"
                                },
                                {
                                    "lit": "inbox"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "email",
                                    "limit",
                                    "offset"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "parts": [
                                "temp-mail",
                                "{email}",
                                "inbox"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "email",
                                        "orig": "email",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "message_id",
                                        "orig": "message_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/temp-mail/{email}/messages/{messageId}",
                            "rename": {
                                "param": {
                                    "messageId": "message_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "temp-mail"
                                },
                                {
                                    "var": "email"
                                },
                                {
                                    "lit": "messages"
                                },
                                {
                                    "var": "message_id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "email",
                                    "message_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "parts": [
                                "temp-mail",
                                "{email}",
                                "messages",
                                "{message_id}"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/temp-mail/domains",
                            "segments": [
                                {
                                    "lit": "temp-mail"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "parts": [
                                "temp-mail",
                                "domains"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/temp-mail/{email}/delete",
                            "segments": [
                                {
                                    "lit": "temp-mail"
                                },
                                {
                                    "var": "email"
                                },
                                {
                                    "lit": "delete"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "email"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "temp-mail",
                                "{email}",
                                "delete"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "temp_mail"
                    ],
                    [
                        "temp_mail",
                        "message"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map