

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"t":"`$ARRAY`","key$":"attachments","index$":0},"body":{"a":true,"h":"Body","n":"body","r":false,"sh":"Email body content","t":"`$STRING`","key$":"body","index$":1},"customDomain":{"a":true,"h":"Custom Domain","n":"customDomain","r":false,"sh":"Custom domain for professional temporary email","t":"`$STRING`","key$":"customDomain","index$":2},"customDomainAvailable":{"a":true,"h":"Custom Domain Available","n":"customDomainAvailable","r":false,"sh":"Whether custom domains are supported","t":"`$BOOLEAN`","key$":"customDomainAvailable","index$":3},"domains":{"a":true,"h":"Domains","n":"domains","r":false,"t":"`$ARRAY`","key$":"domains","index$":4},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"sh":"Generated temporary email address","t":"`$STRING`","key$":"email","index$":5},"expiresAt":{"a":true,"fo":"date-time","h":"Expires At","n":"expiresAt","r":false,"sh":"Expiration date of the temporary email","t":"`$STRING`","key$":"expiresAt","index$":6},"from":{"a":true,"fo":"email","h":"From","n":"from","r":false,"sh":"Sender email address","t":"`$STRING`","key$":"from","index$":7},"htmlBody":{"a":true,"h":"Html Body","n":"htmlBody","r":false,"sh":"HTML version of email body","t":"`$STRING`","key$":"htmlBody","index$":8},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique message identifier","t":"`$STRING`","key$":"id","index$":9},"inboxUrl":{"a":true,"fo":"uri","h":"Inbox Url","n":"inboxUrl","r":false,"sh":"URL to access the inbox","t":"`$STRING`","key$":"inboxUrl","index$":10},"isRead":{"a":true,"h":"Is Read","n":"isRead","r":false,"sh":"Whether the message has been read","t":"`$BOOLEAN`","key$":"isRead","index$":11},"messages":{"a":true,"h":"Messages","n":"messages","r":false,"t":"`$ARRAY`","key$":"messages","index$":12},"prefix":{"a":true,"h":"Prefix","n":"prefix","r":false,"sh":"Desired prefix for the email address","t":"`$STRING`","key$":"prefix","index$":13},"receivedAt":{"a":true,"fo":"date-time","h":"Received At","n":"receivedAt","r":false,"sh":"When the email was received","t":"`$STRING`","key$":"receivedAt","index$":14},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"sh":"Email subject","t":"`$STRING`","key$":"subject","index$":15},"to":{"a":true,"fo":"email","h":"To","n":"to","r":false,"sh":"Recipient email address","t":"`$STRING`","key$":"to","index$":16},"token":{"a":true,"h":"Token","n":"token","r":false,"sh":"Access token for managing this email address","t":"`$STRING`","key$":"token","index$":17},"total":{"a":true,"h":"Total","n":"total","r":false,"sh":"Total number of messages","t":"`$INTEGER`","key$":"total","index$":18},"validityPeriod":{"a":true,"h":"Validity Period","n":"validityPeriod","r":false,"sh":"Validity period in days (default: 60+ days)","t":"`$INTEGER`","key$":"validityPeriod","index$":19}},"id":{"field":"id","name":"id"},"name":"temporary_email","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /temp-mail/generate","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/temp-mail/generate","q":{},"r":{},"s":[{"lit":"temp-mail"},{"lit":"generate"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /temp-mail/{email}/inbox","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"user123@tempmail.boomlify.com","k":"param","n":"email","or":"email","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/temp-mail/{email}/inbox","q":{"exist":["email","limit","offset"]},"r":{},"s":[{"lit":"temp-mail"},{"var":"email"},{"lit":"inbox"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /temp-mail/{email}/messages/{messageId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"email","or":"email","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"message_id","or":"messageId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/temp-mail/{email}/messages/{messageId}","q":{"exist":["email","message_id"]},"r":{"param":{"messageId":"message_id"}},"s":[{"lit":"temp-mail"},{"var":"email"},{"lit":"messages"},{"var":"message_id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /temp-mail/domains","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/temp-mail/domains","q":{},"r":{},"s":[{"lit":"temp-mail"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /temp-mail/{email}/delete","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"email","or":"email","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/temp-mail/{email}/delete","q":{"exist":["email"]},"r":{},"s":[{"lit":"temp-mail"},{"var":"email"},{"lit":"delete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"temporary_email","name__orig":"temporary_email","Name":"TemporaryEmail","name_":"temporary_email","name-":"temporary-email","NAME":"TEMPORARY_EMAIL","index$":0}, {"active":true,"entity":"temporary_email","key$":"BasicTemporaryEmailFlow","kind":"basic","name":"BasicTemporaryEmailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"temporary_email_ref01"},"m":{"email":"email01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"temporary_email_ref01","srcdatavar":"temporary_email_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-temporary_email_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"temporary_email_ref01","suffix":"_rm0"},"m":{"id":"temporary_email01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'TemporaryEmail', {"POST /temp-mail/generate":{"protocol":"http","requestBody":{"description":"Optional parameters for generating a temporary email","required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"customDomain":{"type":"string","description":"Custom domain for professional temporary email","example":"yourbusiness.com","key$":"customDomain"},"prefix":{"type":"string","description":"Desired prefix for the email address","example":"user123","key$":"prefix"},"validityPeriod":{"type":"integer","description":"Validity period in days (default: 60+ days)","minimum":1,"maximum":90,"example":60,"key$":"validityPeriod"}},"index$":1}}}},"parameters":[]},"GET /temp-mail/{email}/inbox":{"protocol":"http","parameters":[{"name":"email","in":"path","required":true,"description":"The temporary email address","schema":{"type":"string","format":"email","example":"user123@tempmail.boomlify.com"},"index$":0},{"name":"limit","in":"query","required":false,"description":"Maximum number of messages to return","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":1},{"name":"offset","in":"query","required":false,"description":"Number of messages to skip","schema":{"type":"integer","minimum":0,"default":0},"index$":2}]},"GET /temp-mail/{email}/messages/{messageId}":{"protocol":"http","parameters":[{"name":"email","in":"path","required":true,"description":"The temporary email address","schema":{"type":"string","format":"email"},"index$":0},{"name":"messageId","in":"path","required":true,"description":"The message ID","schema":{"type":"string"},"index$":1}]},"GET /temp-mail/domains":{"protocol":"http","parameters":[]},"DELETE /temp-mail/{email}/delete":{"protocol":"http","parameters":[{"name":"email","in":"path","required":true,"description":"The temporary email address to delete","schema":{"type":"string","format":"email"},"index$":0}]}})
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
    ['temporary_email01','temporary_email02','temporary_email03','email01'],
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
  
