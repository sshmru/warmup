var express = require('express')


module.exports = function(app, db, socket) {
  var router = express.Router()


  router.get('/r/*', function(req, res) {
    res.send('')
  })

  router.get('/posts', function(req, res) {
    var posts = db.getPosts()
    res.send(posts)
  })

  router.post('/newpost', function(req, res) {
    db.newPost(req.body)
    socket.newPost()
    res.send('ok')
  })

  router.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
  })

  return router
}
