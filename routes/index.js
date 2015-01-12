var express = require('express')


module.exports = function(app, db) {
console.log(db.posts)
  var posts = db.posts
  var router = express.Router()


  router.get('/posts', function(req, res) {
    res.send(posts)
  })

  router.get('*', function(req, res) {
    res.sendFile('public/index.html')
  })

  return router
}
