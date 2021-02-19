const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

const jwt = require('../lib/jwt')
app.use(jwt)
const acl = require('../lib/acl')
app.use(acl)

const routes = require('./routes')
app.use('/', routes)

module.exports = app