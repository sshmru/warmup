var express = require('express')


module.exports = function(app, db) {
  var router = express.Router()


  router.get('/posts', function(req, res) {
    var posts = db.getPosts()
    res.send(posts)
  })


  router.post('/newpost', function(req, res) {
    db.newPost(req.body)
    res.send('ok')
  })

  router.get('*', function(req, res) {
    res.sendFile('public/index.html')
  })

  return router
}
