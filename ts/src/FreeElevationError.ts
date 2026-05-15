
import { Context } from './Context'


class FreeElevationError extends Error {

  isFreeElevationError = true

  sdk = 'FreeElevation'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FreeElevationError
}

