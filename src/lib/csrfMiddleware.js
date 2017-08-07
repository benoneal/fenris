import uuid from 'uuid/v4'
import validate from 'uuid-validate'

const CSRF = 'x-csrf'
const ONE_DAY = 24 * 60 * 60 * 1000

const shouldValidate = (req) => {
  const method = req.method.toUpperCase()
  return method !== "GET" && method !== "HEAD"
}

const hasValidToken = (req) => {
  const areUUIDs = validate(req.cookies[CSRF], 4) && validate(req.headers[CSRF], 4)
  const areEqual = req.cookies[CSRF] === req.headers[CSRF]
  return areUUIDs && areEqual
}

const attachCSRF = (res, token, next) => {
  res.header(CSRF, token)
  res.cookie(CSRF, token, {maxAge: ONE_DAY})
  return next()
}

const csrfMiddleware = (req, res, next) => {
  const token = req.cookies[CSRF] || uuid()
  if (shouldValidate(req)) {
    if (hasValidToken(req)) {
      attachCSRF(res, token, next)
    } else {
      return next(new Error('INVALID CSRF TOKEN')) 
    }
  } else {
    attachCSRF(res, token, next)
  }
}

export default csrfMiddleware