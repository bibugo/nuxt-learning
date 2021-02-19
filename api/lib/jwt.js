const { createVerifier } = require('fast-jwt')

const config = require('../config')

module.exports = function (req, res, next) {
  if (config.unless.includes(req.url)) {
    return next()
  }

  let token, type
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1]
    type = 'bearer'
  } else if (req.query && req.query.token) {
    token = req.query.token
    type = 'query'
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token
    type = 'cookie'
  }

  const verifySync = createVerifier({ key: config.accessTokenKey })
  const payload = verifySync(token)

  console.log(payload)
  // console.log(req.url)

  next()
}