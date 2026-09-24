

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ProfanityCheckerSDK, BaseFeature, stdutil } from '../../..'

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


describe('CheckProfanityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PROFANITY_CHECKER_TEST_LIVE=TRUE.
  afterEach(liveDelay('PROFANITY_CHECKER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ProfanityCheckerSDK.test()
    const ent = testsdk.CheckProfanity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PROFANITY_CHECKER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'check_profanity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"flaggedWords":{"a":true,"h":"Flagged Words","n":"flaggedWords","r":false,"sh":"List of words that were flagged as profanity","t":"`$ARRAY`","key$":"flaggedWords","index$":0},"isProfanity":{"a":true,"h":"Is Profanity","n":"isProfanity","r":false,"sh":"Indicates whether profanity was detected in the message","t":"`$BOOLEAN`","key$":"isProfanity","index$":1},"message":{"a":true,"h":"Message","n":"message","r":true,"sh":"The text message to check for profanity","t":"`$STRING`","key$":"message","index$":2},"score":{"a":true,"fo":"float","h":"Score","n":"score","r":false,"sh":"Confidence score for profanity detection","t":"`$NUMBER`","key$":"score","index$":3}},"name":"check_profanity","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/","q":{},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"check_profanity","name__orig":"check_profanity","Name":"CheckProfanity","name_":"check_profanity","name-":"check-profanity","NAME":"CHECK_PROFANITY","index$":0}, {"active":true,"entity":"check_profanity","key$":"BasicCheckProfanityFlow","kind":"basic","name":"BasicCheckProfanityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"check_profanity_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'CheckProfanity', {"POST /":{"protocol":"http","operationId":"checkProfanity","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["message"],"properties":{"message":{"type":"string","description":"The text message to check for profanity","example":"This is a sample message to check","key$":"message"}},"index$":1},"examples":{"clean":{"summary":"Clean message example","value":{"message":"This is a nice clean message"}},"profane":{"summary":"Profane message example","value":{"message":"Hate speech f@#k!ng sucks"}}}}}},"responses":{"200":{"description":"Successful profanity check response","content":{"application/json":{"schema":{"type":"object","properties":{"isProfanity":{"type":"boolean","description":"Indicates whether profanity was detected in the message","key$":"isProfanity"},"score":{"type":"number","description":"Confidence score for profanity detection","format":"float","key$":"score"},"flaggedWords":{"type":"array","description":"List of words that were flagged as profanity","items":{"type":"string"},"key$":"flaggedWords"}},"index$":0},"examples":{"clean":{"summary":"Clean message result","value":{"isProfanity":false,"score":0,"flaggedWords":[]}},"profane":{"summary":"Profane message result","value":{"isProfanity":true,"score":0.95,"flaggedWords":["f@#k"]}}}}}},"400":{"description":"Bad request - invalid input","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}}},"example":{"error":"Message field is required"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}},"example":{"error":"Internal server error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const check_profanity_ref01_ent = client.CheckProfanity()
    let check_profanity_ref01_data = setup.data.new.check_profanity['check_profanity_ref01']

    check_profanity_ref01_data = (await check_profanity_ref01_ent.create(check_profanity_ref01_data)).data()
    assert(null != check_profanity_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/check_profanity/CheckProfanityTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ProfanityCheckerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['check_profanity01','check_profanity02','check_profanity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID': idmap,
    'PROFANITY_CHECKER_TEST_LIVE': 'FALSE',
    'PROFANITY_CHECKER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID']

  const live = 'TRUE' === env.PROFANITY_CHECKER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ProfanityCheckerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
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
    explain: 'TRUE' === env.PROFANITY_CHECKER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
