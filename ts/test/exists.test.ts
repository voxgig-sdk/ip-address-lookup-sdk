
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpAddressLookupSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IpAddressLookupSDK.test()
    equal(testsdk instanceof IpAddressLookupSDK, true,
      'IpAddressLookupSDK.test() must return a client synchronously')
  })

})
