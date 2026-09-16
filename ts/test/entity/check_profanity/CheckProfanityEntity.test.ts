

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"flaggedWords","req":false,"short":"List of words that were flagged as profanity","type":"`$ARRAY`","index$":0},{"active":true,"name":"isProfanity","req":false,"short":"Indicates whether profanity was detected in the message","type":"`$BOOLEAN`","index$":1},{"active":true,"name":"message","req":true,"short":"The text message to check for profanity","type":"`$STRING`","index$":2},{"active":true,"format":"float","name":"score","req":false,"short":"Confidence score for profanity detection","type":"`$NUMBER`","index$":3}],"name":"check_profanity","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /","json":"{\"operationId\":\"checkProfanity\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"clean\":{\"summary\":\"Clean message example\",\"value\":{\"message\":\"This is a nice clean message\"}},\"profane\":{\"summary\":\"Profane message example\",\"value\":{\"message\":\"Hate speech f@#k!ng sucks\"}}},\"schema\":{\"properties\":{\"message\":{\"description\":\"The text message to check for profanity\",\"example\":\"This is a sample message to check\",\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"clean\":{\"summary\":\"Clean message result\",\"value\":{\"flaggedWords\":[],\"isProfanity\":false,\"score\":0}},\"profane\":{\"summary\":\"Profane message result\",\"value\":{\"flaggedWords\":[\"f@#k\"],\"isProfanity\":true,\"score\":0.95}}},\"schema\":{\"properties\":{\"flaggedWords\":{\"description\":\"List of words that were flagged as profanity\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"isProfanity\":{\"description\":\"Indicates whether profanity was detected in the message\",\"type\":\"boolean\"},\"score\":{\"description\":\"Confidence score for profanity detection\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful profanity check response\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Message field is required\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid input\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Internal server error\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/","segments":[],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"check_profanity","name__orig":"check_profanity","Name":"CheckProfanity","name_":"check_profanity","name-":"check-profanity","NAME":"CHECK_PROFANITY","index$":0}, {"active":true,"entity":"check_profanity","key$":"BasicCheckProfanityFlow","kind":"basic","name":"BasicCheckProfanityFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"check_profanity_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'CheckProfanity')
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
  
