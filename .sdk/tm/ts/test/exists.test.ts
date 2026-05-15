
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeElevationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FreeElevationSDK.test()
    equal(null !== testsdk, true)
  })

})
