const randRange = (min = 0, max = 100) =>
  Math.floor(Math.random() * (max - min + 1) + min)
const createSession = _ =>
  intToStr(randRange(0, Number.MAX_SAFE_INTEGER))

const intToStr = n => n.toString(36)
const hashStr = str => {
  let h1 = 5381
  let h2 = 52711
  let i = (str += '').length
  while (i--) {
    const char = str.charCodeAt(i)
    h1 = (h1 * 33) ^ char
    h2 = (h2 * 33) ^ char
  }
  return intToStr((h1 >>> 0) * 4096 + (h2 >>> 0))
}

const csrfHash = (secret, session, expires) =>
  `${hashStr(secret + session)}${hashStr(secret + expires)}${hashStr(secret + session + expires)}`

const isValidCSRF = (secret, session, csrf) => {
  const [expires, hash] = csrf.split('|')
  const current = Date.now() < parseInt(expires, 36)
  const reproducible = hash === csrfHash(secret, session, expires)
  return current && reproducible
}

const validate = secret => (session, csrf) =>
  csrf && session && isValidCSRF(secret, session, csrf)

const create = (secret, ttl) => (session, csrf) => {
  const expires = intToStr(Date.now() + ttl)
  session = session || createSession()
  csrf = csrf || `${expires}|${csrfHash(secret, session, expires)}`
  return {session, csrf}
}

export default (secret, ttl = 3600000) => ({
  create: create(secret, ttl),
  validate: validate(secret)
})
