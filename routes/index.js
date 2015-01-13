var express = require('express')


module.exports = function(app, db, socket) {
  var router = express.Router()


  router.get('/r/*', function(req, res) {
    res.send('')
  })

  router.post('/posts', function(req, res) {
    if(Object.keys(req.body).length > 0){
      var posts = db.filterPostList(req.body)
    }else{
      var posts = db.getPostList()
    }
    res.send(posts)
  })

  router.post('/newpost', function(req, res) {
    db.newPost(req.body)
    socket.newPost()
    res.send('ok')
  })

  router.post('/login', function(req, res) {
    console.log(req.body)
    var result = db.verifyUser(req.body.username, req.body.password)
    console.log(result)
    res.send(result)
  })

  router.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
  })

  return router
}
