
import { Context } from './Context'


class ProfanityCheckerError extends Error {

  isProfanityCheckerError = true

  sdk = 'ProfanityChecker'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ProfanityCheckerError
}

