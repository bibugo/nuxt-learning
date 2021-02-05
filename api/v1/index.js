const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

app.post('/auth/login', (req, res) => {
  res.json({
    access_token: '1234567890',
    refresh_token: '2345678901',
  })
})
app.post('/auth/refresh', (req, res) => {
  res.json({
    access_token: '1234567890',
    refresh_token: '2345678901',
  })
})
app.get('/auth/user', (req, res) => {
  res.json({
    user: {
      id: 1,
      name: "Supper Man",
      email: "jon.snow@asoiaf.com"
    }
  })
})

app.get('/inspire', (req, res) => {
  res.json({
    words: 'First, solve the problem. Then, write the code.',
    author:'- John Johnson'
  })
})

module.exports = app