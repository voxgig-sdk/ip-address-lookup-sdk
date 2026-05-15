
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpAddressLookupSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IpAddressLookupSDK.test()
    equal(null !== testsdk, true)
  })

})
