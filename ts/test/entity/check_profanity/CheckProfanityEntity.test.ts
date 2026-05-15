
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { ProfanityCheckerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('CheckProfanityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PROFANITYCHECKER_TEST_LIVE=TRUE.
  afterEach(liveDelay('PROFANITYCHECKER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ProfanityCheckerSDK.test()
    const ent = testsdk.CheckProfanity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PROFANITY_CHECKER_TEST_LIVE
    for (const op of ['create']) {
      if (maybeSkipControl(t, 'entityOp', 'check_profanity.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const check_profanity_ref01_ent = client.CheckProfanity()
    let check_profanity_ref01_data = setup.data.new.check_profanity['check_profanity_ref01']

    check_profanity_ref01_data = await check_profanity_ref01_ent.create(check_profanity_ref01_data)
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID': idmap,
    'PROFANITY_CHECKER_TEST_LIVE': 'FALSE',
    'PROFANITY_CHECKER_TEST_EXPLAIN': 'FALSE',
    'PROFANITY_CHECKER_APIKEY': 'NONE',
  })

  idmap = env['PROFANITY_CHECKER_TEST_CHECK_PROFANITY_ENTID']

  const live = 'TRUE' === env.PROFANITY_CHECKER_TEST_LIVE

  if (live) {
    client = new ProfanityCheckerSDK(merge([
      {
        apikey: env.PROFANITY_CHECKER_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
