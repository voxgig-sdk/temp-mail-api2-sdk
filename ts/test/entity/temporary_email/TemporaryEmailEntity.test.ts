

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TempMailApi2SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('TemporaryEmailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TEMP_MAIL_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('TEMP_MAIL_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TempMailApi2SDK.test()
    const ent = testsdk.TemporaryEmail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMP_MAIL_API2_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'temporary_email.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"attachments","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"body","req":false,"short":"Email body content","type":"`$STRING`","index$":1},{"active":true,"name":"customDomain","req":false,"short":"Custom domain for professional temporary email","type":"`$STRING`","index$":2},{"active":true,"name":"customDomainAvailable","req":false,"short":"Whether custom domains are supported","type":"`$BOOLEAN`","index$":3},{"active":true,"name":"domains","req":false,"type":"`$ARRAY`","index$":4},{"active":true,"format":"email","name":"email","req":false,"short":"Generated temporary email address","type":"`$STRING`","index$":5},{"active":true,"format":"date-time","name":"expiresAt","req":false,"short":"Expiration date of the temporary email","type":"`$STRING`","index$":6},{"active":true,"format":"email","name":"from","req":false,"short":"Sender email address","type":"`$STRING`","index$":7},{"active":true,"name":"htmlBody","req":false,"short":"HTML version of email body","type":"`$STRING`","index$":8},{"active":true,"name":"id","req":false,"short":"Unique message identifier","type":"`$STRING`","index$":9},{"active":true,"format":"uri","name":"inboxUrl","req":false,"short":"URL to access the inbox","type":"`$STRING`","index$":10},{"active":true,"name":"isRead","req":false,"short":"Whether the message has been read","type":"`$BOOLEAN`","index$":11},{"active":true,"name":"messages","req":false,"type":"`$ARRAY`","index$":12},{"active":true,"name":"prefix","req":false,"short":"Desired prefix for the email address","type":"`$STRING`","index$":13},{"active":true,"format":"date-time","name":"receivedAt","req":false,"short":"When the email was received","type":"`$STRING`","index$":14},{"active":true,"name":"subject","req":false,"short":"Email subject","type":"`$STRING`","index$":15},{"active":true,"format":"email","name":"to","req":false,"short":"Recipient email address","type":"`$STRING`","index$":16},{"active":true,"name":"token","req":false,"short":"Access token for managing this email address","type":"`$STRING`","index$":17},{"active":true,"name":"total","req":false,"short":"Total number of messages","type":"`$INTEGER`","index$":18},{"active":true,"name":"validityPeriod","req":false,"short":"Validity period in days (default: 60+ days)","type":"`$INTEGER`","index$":19}],"id":{"field":"id","name":"id"},"name":"temporary_email","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /temp-mail/generate","json":"{\"operationId\":\"generateTempEmail\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"customDomain\":{\"description\":\"Custom domain for professional temporary email\",\"example\":\"yourbusiness.com\",\"type\":\"string\"},\"prefix\":{\"description\":\"Desired prefix for the email address\",\"example\":\"user123\",\"type\":\"string\"},\"validityPeriod\":{\"description\":\"Validity period in days (default: 60+ days)\",\"example\":60,\"maximum\":90,\"minimum\":1,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Optional parameters for generating a temporary email\",\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"email\":{\"description\":\"Generated temporary email address\",\"example\":\"user123@tempmail.boomlify.com\",\"format\":\"email\",\"type\":\"string\"},\"expiresAt\":{\"description\":\"Expiration date of the temporary email\",\"example\":\"2024-03-15T12:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"inboxUrl\":{\"description\":\"URL to access the inbox\",\"example\":\"https://boomlify.com/inbox/user123\",\"format\":\"uri\",\"type\":\"string\"},\"token\":{\"description\":\"Access token for managing this email address\",\"example\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Temporary email address generated successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"message\":{\"example\":\"The request parameters are invalid\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"message\":{\"example\":\"The request parameters are invalid\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"message\":{\"example\":\"The request parameters are invalid\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]},{}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token obtained when generating a temporary email\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/temp-mail/generate","segments":[{"lit":"temp-mail"},{"lit":"generate"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"user123@tempmail.boomlify.com","kind":"param","name":"email","orig":"email","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /temp-mail/{email}/inbox","json":"{\"operationId\":\"getInboxMessages\",\"parameters\":[{\"description\":\"The temporary email address\",\"in\":\"path\",\"name\":\"email\",\"required\":true,\"schema\":{\"example\":\"user123@tempmail.boomlify.com\",\"format\":\"email\",\"type\":\"string\"}},{\"description\":\"Maximum number of messages to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of messages to skip\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"email\":{\"example\":\"user123@tempmail.boomlify.com\",\"format\":\"email\",\"type\":\"string\"},\"messages\":{\"items\":{\"properties\":{\"attachments\":{\"items\":{\"properties\":{\"contentType\":{\"example\":\"application/pdf\",\"type\":\"string\"},\"downloadUrl\":{\"example\":\"https://api.boomlify.com/v1/attachments/abc123\",\"format\":\"uri\",\"type\":\"string\"},\"filename\":{\"example\":\"document.pdf\",\"type\":\"string\"},\"size\":{\"description\":\"Size in bytes\",\"example\":102400,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Email body content\",\"example\":\"Thank you for signing up...\",\"type\":\"string\"},\"from\":{\"description\":\"Sender email address\",\"example\":\"sender@example.com\",\"format\":\"email\",\"type\":\"string\"},\"htmlBody\":{\"description\":\"HTML version of email body\",\"example\":\"<html><body>Thank you for signing up...</body></html>\",\"type\":\"string\"},\"id\":{\"description\":\"Unique message identifier\",\"example\":\"msg_123456789\",\"type\":\"string\"},\"isRead\":{\"description\":\"Whether the message has been read\",\"example\":false,\"type\":\"boolean\"},\"receivedAt\":{\"description\":\"When the email was received\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"subject\":{\"description\":\"Email subject\",\"example\":\"Welcome to our service\",\"type\":\"string\"},\"to\":{\"description\":\"Recipient email address\",\"example\":\"user123@tempmail.boomlify.com\",\"format\":\"email\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total number of messages\",\"example\":5,\"type\":\"integer\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Inbox messages retrieved successfully\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"message\":{\"example\":\"The request parameters are invalid\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Email address not found\"}},\"security\":[{\"ApiKeyAuth\":[]},{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token obtained when generating a temporary email\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/temp-mail/{email}/inbox","segments":[{"lit":"temp-mail"},{"var":"email"},{"lit":"inbox"}],"select":{"exist":["email","limit","offset"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"email","orig":"email","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"message_id","orig":"message_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /temp-mail/{email}/messages/{messageId}","json":"{\"operationId\":\"getMessage\",\"parameters\":[{\"description\":\"The temporary email address\",\"in\":\"path\",\"name\":\"email\",\"required\":true,\"schema\":{\"format\":\"email\",\"type\":\"string\"}},{\"description\":\"The message ID\",\"in\":\"path\",\"name\":\"messageId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"attachments\":{\"items\":{\"properties\":{\"contentType\":{\"example\":\"application/pdf\",\"type\":\"string\"},\"downloadUrl\":{\"example\":\"https://api.boomlify.com/v1/attachments/abc123\",\"format\":\"uri\",\"type\":\"string\"},\"filename\":{\"example\":\"document.pdf\",\"type\":\"string\"},\"size\":{\"description\":\"Size in bytes\",\"example\":102400,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Email body content\",\"example\":\"Thank you for signing up...\",\"type\":\"string\"},\"from\":{\"description\":\"Sender email address\",\"example\":\"sender@example.com\",\"format\":\"email\",\"type\":\"string\"},\"htmlBody\":{\"description\":\"HTML version of email body\",\"example\":\"<html><body>Thank you for signing up...</body></html>\",\"type\":\"string\"},\"id\":{\"description\":\"Unique message identifier\",\"example\":\"msg_123456789\",\"type\":\"string\"},\"isRead\":{\"description\":\"Whether the message has been read\",\"example\":false,\"type\":\"boolean\"},\"receivedAt\":{\"description\":\"When the email was received\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"subject\":{\"description\":\"Email subject\",\"example\":\"Welcome to our service\",\"type\":\"string\"},\"to\":{\"description\":\"Recipient email address\",\"example\":\"user123@tempmail.boomlify.com\",\"format\":\"email\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Message retrieved successfully\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"message\":{\"example\":\"The request parameters are invalid\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Message not found\"}},\"security\":[{\"ApiKeyAuth\":[]},{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token obtained when generating a temporary email\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/temp-mail/{email}/messages/{messageId}","rename":{"param":{"messageId":"message_id"}},"segments":[{"lit":"temp-mail"},{"var":"email"},{"lit":"messages"},{"var":"message_id"}],"select":{"exist":["email","message_id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /temp-mail/domains","json":"{\"operationId\":\"getAvailableDomains\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"customDomainAvailable\":{\"description\":\"Whether custom domains are supported\",\"example\":true,\"type\":\"boolean\"},\"domains\":{\"example\":[\"tempmail.boomlify.com\",\"disposable.boomlify.com\",\"temp.boomlify.com\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Available domains retrieved successfully\"}},\"security\":[{\"ApiKeyAuth\":[]},{}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token obtained when generating a temporary email\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/temp-mail/domains","segments":[{"lit":"temp-mail"},{"lit":"domains"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"email","orig":"email","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /temp-mail/{email}/delete","json":"{\"operationId\":\"deleteTempEmail\",\"parameters\":[{\"description\":\"The temporary email address to delete\",\"in\":\"path\",\"name\":\"email\",\"required\":true,\"schema\":{\"format\":\"email\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Temporary email address deleted successfully\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Email deleted successfully\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"message\":{\"example\":\"The request parameters are invalid\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Email address not found\"}},\"security\":[{\"ApiKeyAuth\":[]},{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token obtained when generating a temporary email\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/temp-mail/{email}/delete","segments":[{"lit":"temp-mail"},{"var":"email"},{"lit":"delete"}],"select":{"exist":["email"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["temp_mail"],["temp_mail","message"]]},"key$":"temporary_email","name__orig":"temporary_email","Name":"TemporaryEmail","name_":"temporary_email","name-":"temporary-email","NAME":"TEMPORARY_EMAIL","index$":0}, {"active":true,"entity":"temporary_email","key$":"BasicTemporaryEmailFlow","kind":"basic","name":"BasicTemporaryEmailFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"temporary_email_ref01"},"match":{"email":"email01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"temporary_email_ref01","srcdatavar":"temporary_email_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-temporary_email_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"temporary_email_ref01","suffix":"_rm0"},"match":{"id":"temporary_email01"},"op":"remove","spec":[],"valid":[],"index$":2}]}, 'TemporaryEmail')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const temporary_email_ref01_ent = client.TemporaryEmail()
    let temporary_email_ref01_data = setup.data.new.temporary_email['temporary_email_ref01']
    temporary_email_ref01_data['email'] = setup.idmap['email01']

    temporary_email_ref01_data = (await temporary_email_ref01_ent.create(temporary_email_ref01_data)).data()
    assert(null != temporary_email_ref01_data.id)


    // LOAD
    const temporary_email_ref01_match_dt0: any = {}
    temporary_email_ref01_match_dt0.id = temporary_email_ref01_data.id
    const temporary_email_ref01_data_dt0 = (await temporary_email_ref01_ent.load(temporary_email_ref01_match_dt0)).data()
    assert(temporary_email_ref01_data_dt0.id === temporary_email_ref01_data.id)


    // REMOVE
    const temporary_email_ref01_match_rm0: any = { id: temporary_email_ref01_data.id }
    await temporary_email_ref01_ent.remove(temporary_email_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/temporary_email/TemporaryEmailTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TempMailApi2SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['temporary_email01','temporary_email02','temporary_email03','temp_mail01','temp_mail02','temp_mail03','temp_mail01','temp_mail02','temp_mail03','message01','message02','message03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID': idmap,
    'TEMP_MAIL_API2_TEST_LIVE': 'FALSE',
    'TEMP_MAIL_API2_TEST_EXPLAIN': 'FALSE',
    'TEMP_MAIL_API2_APIKEY': '',
  })

  idmap = env['TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID']

  const live = 'TRUE' === env.TEMP_MAIL_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TEMP_MAIL_API2_TEST_TEMPORARY_EMAIL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TempMailApi2SDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
