const { createSigner, createVerifier, createDecoder } = require('fast-jwt')
const config = require('../config')
const user = require("../db/user")

function createToken(payload) {
  const signRefresh = createSigner({ key: config.refreshTokenKey, expiresIn: Function(`'use strict'; return (${config.refreshTokenLife})`)() * 1000 })
  payload._type = 'refresh'
  let refreshToken = signRefresh({ payload: payload })
  const signAccess = createSigner({ key: config.accessTokenKey, expiresIn: Function(`'use strict'; return (${config.accessTokenLife})`)() * 1000 })
  payload._type = 'access'
  let accessToken = signAccess(payload)
  return { accessToken, refreshToken }
}

exports.login = function (req, res) {
  let username = req.body.username
  let password = req.body.password

  if (!username || !password || password !== 'zzz') {
    return res.status(401).send()
  }

  let payload = {
    username: username
  }

  const { accessToken, refreshToken } = createToken(payload)

  res.status(200).json({
    token: accessToken,
    refresh_token: refreshToken,
  })
}

exports.refresh = function (req, res) {
  let refreshToken = req.body.refresh_token

  if (!refreshToken) {
    return res.status(403).send()
  }

  const verify = createVerifier({ key: config.refreshTokenKey })
  let { payload } = verify(refreshToken)

  if (payload._type != 'refresh') {
    return res.status(401).send()
  }

  const newToken = createToken(payload)

  res.status(200).json({
    token: newToken.accessToken,
    refresh_token: newToken.refreshToken,
  })
}

exports.user = function (req, res) {
  user.findByPk(1)
    .then(data => {
      const result = (({ username, name }) => ({ username, name }))(data.get())
      res.status(200).json({ user: result })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
}

exports.meta = function (req, res) {
  res.status(200).json({
    menuitems: [
      {
        action: "mdi-cog-outline",
        items: [
          { title: "Inspire", to: "/inspire" },
          { title: "Help", to: "/help" },
        ],
        title: "Settings",
      },
      {
        action: "mdi-tag",
        items: [
          { title: "Form", to: "/form" },
          { title: "Builder", to: "/form/builder" },
        ],
        title: "System",
      },
    ],
  })
}
