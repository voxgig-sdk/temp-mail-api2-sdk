import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "temporary_email",
    "accessor": "TemporaryEmail",
    "op": "create",
    "method": "POST",
    "path": "/temp-mail/generate",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
            "filename": "document.pdf",
            "contentType": "application/pdf",
            "size": 102400,
            "downloadUrl": "https://api.boomlify.com/v1/attachments/abc123"
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
    "path": "/temp-mail/{email}/inbox",
    "args": [
      {
        "name": "email",
        "wire": "email",
        "value": "user123@tempmail.boomlify.com"
      }
    ],
    "select": {
      "limit": 20,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
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
            "id": "msg_123456789",
            "from": "sender@example.com",
            "to": "user123@tempmail.boomlify.com",
            "subject": "Welcome to our service",
            "body": "Thank you for signing up...",
            "htmlBody": "<html><body>Thank you for signing up...</body></html>",
            "receivedAt": "2024-01-15T10:30:00Z",
            "attachments": [
              {
                "filename": "document.pdf",
                "contentType": "application/pdf",
                "size": 102400,
                "downloadUrl": "https://api.boomlify.com/v1/attachments/abc123"
              }
            ],
            "isRead": false
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
    "path": "/temp-mail/domains",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "success": true,
      "data": {
        "domains": [
          "tempmail.boomlify.com",
          "disposable.boomlify.com",
          "temp.boomlify.com"
        ],
        "customDomainAvailable": true
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
