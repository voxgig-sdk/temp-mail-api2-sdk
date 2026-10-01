"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "temporary_email",
        "accessor": "TemporaryEmail",
        "op": "create",
        "method": "POST",
        "path": "/temp-mail/generate",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [],
        "status": 200,
        "sample": {
            "success": true,
            "data": {
                "email": "user123@tempmail.boomlify.com",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "expiresAt": "2024-03-15T12:00:00Z",
                "inboxUrl": "https://boomlify.com/inbox/user123"
            }
        },
        "idField": "id"
    },
    {
        "entity": "temporary_email",
        "accessor": "TemporaryEmail",
        "op": "load",
        "method": "GET",
        "path": "/temp-mail/{email}/inbox",
        "args": [
            {
                "name": "email",
                "wire": "email",
                "value": "user123@tempmail.boomlify.com"
            }
        ],
        "select": {
            "limit": "v1",
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "data": {
                "email": "user123@tempmail.boomlify.com",
                "messages": [
                    {
                        "attachments": [
                            {
                                "contentType": "application/pdf",
                                "downloadUrl": "https://api.boomlify.com/v1/attachments/abc123",
                                "filename": "document.pdf",
                                "size": 102400
                            }
                        ],
                        "body": "Thank you for signing up...",
                        "from": "sender@example.com",
                        "htmlBody": "<html><body>Thank you for signing up...</body></html>",
                        "id": "msg_123456789",
                        "isRead": false,
                        "receivedAt": "2024-01-15T10:30:00Z",
                        "subject": "Welcome to our service",
                        "to": "user123@tempmail.boomlify.com"
                    }
                ],
                "total": 5
            }
        },
        "idField": "id"
    },
    {
        "entity": "temporary_email",
        "accessor": "TemporaryEmail",
        "op": "load",
        "method": "GET",
        "path": "/temp-mail/{email}/messages/{messageId}",
        "args": [
            {
                "name": "email",
                "wire": "email",
                "value": "p1"
            },
            {
                "name": "message_id",
                "wire": "messageId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "data": {
                "id": "msg_123456789",
                "from": "sender@example.com",
                "to": "user123@tempmail.boomlify.com",
                "subject": "Welcome to our service",
                "body": "Thank you for signing up...",
                "htmlBody": "<html><body>Thank you for signing up...</body></html>",
                "receivedAt": "2024-01-15T10:30:00Z",
                "attachments": [
                    {
                        "contentType": "application/pdf",
                        "downloadUrl": "https://api.boomlify.com/v1/attachments/abc123",
                        "filename": "document.pdf",
                        "size": 102400
                    }
                ],
                "isRead": false
            }
        },
        "idField": "id"
    },
    {
        "entity": "temporary_email",
        "accessor": "TemporaryEmail",
        "op": "load",
        "method": "GET",
        "path": "/temp-mail/domains",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [],
        "status": 200,
        "sample": {
            "success": true,
            "data": {
                "customDomainAvailable": true,
                "domains": [
                    "tempmail.boomlify.com",
                    "disposable.boomlify.com",
                    "temp.boomlify.com"
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "temporary_email",
        "accessor": "TemporaryEmail",
        "op": "remove",
        "method": "DELETE",
        "path": "/temp-mail/{email}/delete",
        "args": [
            {
                "name": "email",
                "wire": "email",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "message": "Temporary email address deleted successfully"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map