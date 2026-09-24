"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TemporaryEmailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TEMP_MAIL_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TEMP_MAIL_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TempMailApi2SDK.test();
        const ent = testsdk.TemporaryEmail();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TEMP_MAIL_API2_TEST_LIVE;
        for (const op of ['create', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'temporary_email.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "attachments": { "a": true, "h": "Attachments", "n": "attachments", "r": false, "t": "`$ARRAY`", "key$": "attachments", "index$": 0 }, "body": { "a": true, "h": "Body", "n": "body", "r": false, "sh": "Email body content", "t": "`$STRING`", "key$": "body", "index$": 1 }, "customDomain": { "a": true, "h": "Custom Domain", "n": "customDomain", "r": false, "sh": "Custom domain for professional temporary email", "t": "`$STRING`", "key$": "customDomain", "index$": 2 }, "customDomainAvailable": { "a": true, "h": "Custom Domain Available", "n": "customDomainAvailable", "r": false, "sh": "Whether custom domains are supported", "t": "`$BOOLEAN`", "key$": "customDomainAvailable", "index$": 3 }, "domains": { "a": true, "h": "Domains", "n": "domains", "r": false, "t": "`$ARRAY`", "key$": "domains", "index$": 4 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": false, "sh": "Generated temporary email address", "t": "`$STRING`", "key$": "email", "index$": 5 }, "expiresAt": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expiresAt", "r": false, "sh": "Expiration date of the temporary email", "t": "`$STRING`", "key$": "expiresAt", "index$": 6 }, "from": { "a": true, "fo": "email", "h": "From", "n": "from", "r": false, "sh": "Sender email address", "t": "`$STRING`", "key$": "from", "index$": 7 }, "htmlBody": { "a": true, "h": "Html Body", "n": "htmlBody", "r": false, "sh": "HTML version of email body", "t": "`$STRING`", "key$": "htmlBody", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique message identifier", "t": "`$STRING`", "key$": "id", "index$": 9 }, "inboxUrl": { "a": true, "fo": "uri", "h": "Inbox Url", "n": "inboxUrl", "r": false, "sh": "URL to access the inbox", "t": "`$STRING`", "key$": "inboxUrl", "index$": 10 }, "isRead": { "a": true, "h": "Is Read", "n": "isRead", "r": false, "sh": "Whether the message has been read", "t": "`$BOOLEAN`", "key$": "isRead", "index$": 11 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": false, "t": "`$ARRAY`", "key$": "messages", "index$": 12 }, "prefix": { "a": true, "h": "Prefix", "n": "prefix", "r": false, "sh": "Desired prefix for the email address", "t": "`$STRING`", "key$": "prefix", "index$": 13 }, "receivedAt": { "a": true, "fo": "date-time", "h": "Received At", "n": "receivedAt", "r": false, "sh": "When the email was received", "t": "`$STRING`", "key$": "receivedAt", "index$": 14 }, "subject": { "a": true, "h": "Subject", "n": "subject", "r": false, "sh": "Email subject", "t": "`$STRING`", "key$": "subject", "index$": 15 }, "to": { "a": true, "fo": "email", "h": "To", "n": "to", "r": false, "sh": "Recipient email address", "t": "`$STRING`", "key$": "to", "index$": 16 }, "token": { "a": true, "h": "Token", "n": "token", "r": false, "sh": "Access token for managing this email address", "t": "`$STRING`", "key$": "token", "index$": 17 }, "total": { "a": true, "h": "Total", "n": "total", "r": false, "sh": "Total number of messages", "t": "`$INTEGER`", "key$": "total", "index$": 18 }, "validityPeriod": { "a": true, "h": "Validity Period", "n": "validityPeriod", "r": false, "sh": "Validity period in days (default: 60+ days)", "t": "`$INTEGER`", "key$": "validityPeriod", "index$": 19 } }, "id": { "field": "id", "name": "id" }, "name": "temporary_email", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /temp-mail/generate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/temp-mail/generate", "q": {}, "r": {}, "s": [{ "lit": "temp-mail" }, { "lit": "generate" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /temp-mail/{email}/inbox", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "user123@tempmail.boomlify.com", "k": "param", "n": "email", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/temp-mail/{email}/inbox", "q": { "exist": ["email", "limit", "offset"] }, "r": {}, "s": [{ "lit": "temp-mail" }, { "var": "email" }, { "lit": "inbox" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /temp-mail/{email}/messages/{messageId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "email", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "message_id", "or": "message_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/temp-mail/{email}/messages/{messageId}", "q": { "exist": ["email", "message_id"] }, "r": { "param": { "messageId": "message_id" } }, "s": [{ "lit": "temp-mail" }, { "var": "email" }, { "lit": "messages" }, { "var": "message_id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /temp-mail/domains", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/temp-mail/domains", "q": {}, "r": {}, "s": [{ "lit": "temp-mail" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /temp-mail/{email}/delete", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "email", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/temp-mail/{email}/delete", "q": { "exist": ["email"] }, "r": {}, "s": [{ "lit": "temp-mail" }, { "var": "email" }, { "lit": "delete" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "temporary_email", "name__orig": "temporary_email", "Name": "TemporaryEmail", "name_": "temporary_email", "name-": "temporary-email", "NAME": "TEMPORARY_EMAIL", "index$": 0 }, { "active": true, "entity": "temporary_email", "key$": "BasicTemporaryEmailFlow", "kind": "basic", "name": "BasicTemporaryEmailFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "temporary_email_ref01" }, "m": { "email": "email01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "temporary_email_ref01", "srcdatavar": "temporary_email_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-temporary_email_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "temporary_email_ref01", "suffix": "_rm0" }, "m": { "id": "temporary_email01" }, "o": "remove", "s": [], "v": [], "index$": 2 }] }, 'TemporaryEmail', { "POST /temp-mail/generate": { "protocol": "http", "operationId": "generateTempEmail", "requestBody": { "description": "Optional parameters for generating a temporary email", "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "customDomain": { "type": "string", "description": "Custom domain for professional temporary email", "example": "yourbusiness.com", "key$": "customDomain" }, "prefix": { "type": "string", "description": "Desired prefix for the email address", "example": "user123", "key$": "prefix" }, "validityPeriod": { "type": "integer", "description": "Validity period in days (default: 60+ days)", "minimum": 1, "maximum": 90, "example": 60, "key$": "validityPeriod" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Temporary email address generated successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "data": { "type": "object", "properties": { "email": { "type": "string", "format": "email", "description": "Generated temporary email address", "example": "user123@tempmail.boomlify.com", "key$": "email" }, "token": { "type": "string", "description": "Access token for managing this email address", "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "key$": "token" }, "expiresAt": { "type": "string", "format": "date-time", "description": "Expiration date of the temporary email", "example": "2024-03-15T12:00:00Z", "key$": "expiresAt" }, "inboxUrl": { "type": "string", "format": "uri", "description": "URL to access the inbox", "example": "https://boomlify.com/inbox/user123", "key$": "inboxUrl" } }, "index$": 0 } } } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "example": "INVALID_REQUEST" }, "message": { "type": "string", "example": "The request parameters are invalid" } } } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Too many requests - Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "example": "INVALID_REQUEST" }, "message": { "type": "string", "example": "The request parameters are invalid" } } } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "example": "INVALID_REQUEST" }, "message": { "type": "string", "example": "The request parameters are invalid" } } } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }, {}], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "JWT token obtained when generating a temporary email" } } }, "GET /temp-mail/{email}/inbox": { "protocol": "http", "operationId": "getInboxMessages", "responses": { "200": { "description": "Inbox messages retrieved successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "data": { "key$": "data", "properties": { "email": { "example": "user123@tempmail.boomlify.com", "format": "email", "type": "string", "key$": "email" }, "messages": { "items": { "properties": { "attachments": { "items": { "properties": { "contentType": { "example": "application/pdf", "type": "string" }, "downloadUrl": { "example": "https://api.boomlify.com/v1/attachments/abc123", "format": "uri", "type": "string" }, "filename": { "example": "document.pdf", "type": "string" }, "size": { "description": "Size in bytes", "example": 102400, "type": "integer" } }, "type": "object" }, "type": "array" }, "body": { "description": "Email body content", "example": "Thank you for signing up...", "type": "string" }, "from": { "description": "Sender email address", "example": "sender@example.com", "format": "email", "type": "string" }, "htmlBody": { "description": "HTML version of email body", "example": "<html><body>Thank you for signing up...</body></html>", "type": "string" }, "id": { "description": "Unique message identifier", "example": "msg_123456789", "type": "string" }, "isRead": { "description": "Whether the message has been read", "example": false, "type": "boolean" }, "receivedAt": { "description": "When the email was received", "example": "2024-01-15T10:30:00Z", "format": "date-time", "type": "string" }, "subject": { "description": "Email subject", "example": "Welcome to our service", "type": "string" }, "to": { "description": "Recipient email address", "example": "user123@tempmail.boomlify.com", "format": "email", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/EmailMessage" }, "type": "array", "key$": "messages" }, "total": { "description": "Total number of messages", "example": 5, "type": "integer", "key$": "total" } }, "type": "object", "index$": 0 } } } } } }, "404": { "description": "Email address not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "example": "INVALID_REQUEST" }, "message": { "type": "string", "example": "The request parameters are invalid" } } } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "email", "in": "path", "required": true, "description": "The temporary email address", "schema": { "type": "string", "format": "email", "example": "user123@tempmail.boomlify.com" }, "index$": 0 }, { "name": "limit", "in": "query", "required": false, "description": "Maximum number of messages to return", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 1 }, { "name": "offset", "in": "query", "required": false, "description": "Number of messages to skip", "schema": { "type": "integer", "minimum": 0, "default": 0 }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }, { "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "JWT token obtained when generating a temporary email" } } }, "GET /temp-mail/{email}/messages/{messageId}": { "protocol": "http", "operationId": "getMessage", "responses": { "200": { "description": "Message retrieved successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "data": { "type": "object", "properties": { "id": { "description": "Unique message identifier", "example": "msg_123456789", "type": "string", "key$": "id" }, "from": { "description": "Sender email address", "example": "sender@example.com", "format": "email", "type": "string", "key$": "from" }, "to": { "description": "Recipient email address", "example": "user123@tempmail.boomlify.com", "format": "email", "type": "string", "key$": "to" }, "subject": { "description": "Email subject", "example": "Welcome to our service", "type": "string", "key$": "subject" }, "body": { "description": "Email body content", "example": "Thank you for signing up...", "type": "string", "key$": "body" }, "htmlBody": { "description": "HTML version of email body", "example": "<html><body>Thank you for signing up...</body></html>", "type": "string", "key$": "htmlBody" }, "receivedAt": { "description": "When the email was received", "example": "2024-01-15T10:30:00Z", "format": "date-time", "type": "string", "key$": "receivedAt" }, "attachments": { "items": { "properties": { "contentType": { "example": "application/pdf", "type": "string" }, "downloadUrl": { "example": "https://api.boomlify.com/v1/attachments/abc123", "format": "uri", "type": "string" }, "filename": { "example": "document.pdf", "type": "string" }, "size": { "description": "Size in bytes", "example": 102400, "type": "integer" } }, "type": "object" }, "type": "array", "key$": "attachments" }, "isRead": { "description": "Whether the message has been read", "example": false, "type": "boolean", "key$": "isRead" } }, "x-ref": "#/components/schemas/EmailMessage", "index$": 0 } } } } } }, "404": { "description": "Message not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "example": "INVALID_REQUEST" }, "message": { "type": "string", "example": "The request parameters are invalid" } } } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "email", "in": "path", "required": true, "description": "The temporary email address", "schema": { "type": "string", "format": "email" }, "index$": 0 }, { "name": "messageId", "in": "path", "required": true, "description": "The message ID", "schema": { "type": "string" }, "index$": 1 }], "security": [{ "ApiKeyAuth": [] }, { "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "JWT token obtained when generating a temporary email" } } }, "GET /temp-mail/domains": { "protocol": "http", "operationId": "getAvailableDomains", "responses": { "200": { "description": "Available domains retrieved successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "data": { "key$": "data", "properties": { "customDomainAvailable": { "description": "Whether custom domains are supported", "example": true, "type": "boolean", "key$": "customDomainAvailable" }, "domains": { "example": ["tempmail.boomlify.com", "disposable.boomlify.com", "temp.boomlify.com"], "items": { "type": "string" }, "type": "array", "key$": "domains" } }, "type": "object", "index$": 0 } } } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }, {}], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "JWT token obtained when generating a temporary email" } } }, "DELETE /temp-mail/{email}/delete": { "protocol": "http", "operationId": "deleteTempEmail", "responses": { "200": { "description": "Email deleted successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "message": { "type": "string", "example": "Temporary email address deleted successfully" } } } } } }, "404": { "description": "Email address not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "example": "INVALID_REQUEST" }, "message": { "type": "string", "example": "The request parameters are invalid" } } } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "email", "in": "path", "required": true, "description": "The temporary email address to delete", "schema": { "type": "string", "format": "email" }, "index$": 0 }], "security": [{ "ApiKeyAuth": [] }, { "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication" }, "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "JWT token obtained when generating a temporary email" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const temporary_email_ref01_ent = client.TemporaryEmail();
        let temporary_email_ref01_data = setup.data.new.temporary_email['temporary_email_ref01'];
        temporary_email_ref01_data['email'] = setup.idmap['email01'];
        temporary_email_ref01_data = (await temporary_email_ref01_ent.create(temporary_email_ref01_data)).data();
        (0, node_assert_1.default)(null != temporary_email_ref01_data.id);
        // LOAD
        const temporary_email_ref01_match_dt0 = {};
        temporary_email_ref01_match_dt0.id = temporary_email_ref01_data.id;
        const temporary_email_ref01_data_dt0 = (await temporary_email_ref01_ent.load(temporary_email_ref01_match_dt0)).data();
        (0, node_assert_1.default)(temporary_email_ref01_data_dt0.id === temporary_email_ref01_data.id);
        // REMOVE
        const temporary_email_ref01_match_rm0 = { id: temporary_email_ref01_data.id };
        await temporary_email_ref01_ent.remove(temporary_email_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/temporary_email/TemporaryEmailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TempMailApi2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['temporary_email01', 'temporary_email02', 'temporary_email03', 'email01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID': idmap,
        'TEMP_MAIL_API2_TEST_LIVE': 'FALSE',
        'TEMP_MAIL_API2_TEST_EXPLAIN': 'FALSE',
        'TEMP_MAIL_API2_APIKEY': '',
    });
    idmap = env['TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID'];
    const live = 'TRUE' === env.TEMP_MAIL_API2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TempMailApi2SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.TEMP_MAIL_API2_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.TEMP_MAIL_API2_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=TemporaryEmailEntity.test.js.map