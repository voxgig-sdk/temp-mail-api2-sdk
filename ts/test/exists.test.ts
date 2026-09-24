
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TempMailApi2SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TempMailApi2SDK.test()
    equal(testsdk instanceof TempMailApi2SDK, true,
      'TempMailApi2SDK.test() must return a client synchronously')
  })

})
