
import { Context } from './Context'


class IpAddressLookupError extends Error {

  isIpAddressLookupError = true

  sdk = 'IpAddressLookup'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IpAddressLookupError
}

