const config = require('../config')

module.exports = function (req, res, next) {
  if (config.unless.includes(req.url)) {
    return next()
  }


  next()
}