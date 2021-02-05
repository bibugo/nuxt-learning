const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()
const API_URL = process.env.API_URL || 'http://localhost:3000/local-api/v1'

export default function(req, res, next) {
  proxy.web(req, res, {
    target: API_URL
  })
}