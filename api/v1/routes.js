const { Router } = require('express')
const router = Router()

// router.use('/user', require('./user'))

const auth = require('./auth')
router.post('/auth/login', auth.login)
router.post('/auth/refresh', auth.refresh)
router.get('/auth/user', auth.user)
router.get('/auth/meta', auth.meta)


router.get('/inspire', (req, res) => {
  res.json({
    status: 'OK',
    words: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson'
  })
})

module.exports = router