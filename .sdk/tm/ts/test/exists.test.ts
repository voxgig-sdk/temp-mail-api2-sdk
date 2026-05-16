
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TempMailApi2SDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TempMailApi2SDK.test()
    equal(null !== testsdk, true)
  })

})
