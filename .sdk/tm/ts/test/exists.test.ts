
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeElevationSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FreeElevationSDK.test()
    equal(testsdk instanceof FreeElevationSDK, true,
      'FreeElevationSDK.test() must return a client synchronously')
  })

})
