
import { Context } from './Context'


class TempMailApi2Error extends Error {

  isTempMailApi2Error = true

  sdk = 'TempMailApi2'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TempMailApi2Error
}

