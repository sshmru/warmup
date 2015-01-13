var express = require('express')


module.exports = function(app, db, socket, rootPath) {
  var router = express.Router()


  router.get('/r/*', function(req, res) {
    res.sendFile(rootPath + '/public/index.html')
  })

  router.post('/getpost', function(req, res) {
    res.send(db.getPost(req.body.id))
  })


  router.post('/posts', function(req, res) {
    if(Object.keys(req.body).length > 0){
      var posts = db.filterPostList(req.body)
    }else{
      var posts = db.getPostList()
    }
    res.send(posts)
  })

  router.post('/newcomment', function(req, res) {
      console.log(req.body)
    if(typeof req.body.id  === 'number'){
      db.newComment(req.body)
      socket.updatePost(req.body.id)
      res.send('ok')
    }else{
      res.send('no post id')
    }
  })

  router.post('/newpost', function(req, res) {
    db.newPost(req.body)
    socket.updateList()
    res.send('ok')
  })

  router.post('/upvotepost', function(req, res) {
    db.postUpvote(req.body)
    socket.updateList()
    socket.updatePost(req.body.id)
    res.send('ok')
  })

  router.post('/upvotecomment', function(req, res) {
    db.commentUpvote(req.body)
    socket.updatePost(req.body.id)
    res.send('ok')
  })

  router.post('/login', function(req, res) {
    console.log(req.body)
    var result = db.verifyUser(req.body.username, req.body.password)
    console.log(result)
    res.send(result)
  })

  router.get('*', function(req, res) {
    res.sendFile(rootPath + '/public/index.html')
  })

  return router
}
