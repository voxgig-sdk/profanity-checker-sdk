
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ProfanityCheckerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ProfanityCheckerSDK.test()
    equal(testsdk instanceof ProfanityCheckerSDK, true,
      'ProfanityCheckerSDK.test() must return a client synchronously')
  })

})
