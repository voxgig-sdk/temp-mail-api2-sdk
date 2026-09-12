"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
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
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
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