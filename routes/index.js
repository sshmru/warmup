var express = require('express')


module.exports = function(app, db, socket, rootPath, passport) {
  var router = express.Router()

  var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

  router.get('/r/*', function(req, res) {
    res.sendFile(rootPath + '/public/index.html')
  })

  router.get('/u/*', function(req, res) {
    res.sendFile(rootPath + '/public/index.html')
  })

  router.post('/getpost', function(req, res) {
    res.send(db.getPost(req.body.id))
  })

  router.post('/getprofile', function(req, res) {
    console.log('getProfile')
    console.log(req.body)
    res.send(db.getProfile(req.body.id))
  })

  router.post('/editProfile',ensureAuthenticated, function(req, res) {
    console.log('editProfil')
    console.log(req.body)
    db.editProfile(req.body, req.user.username)
  })

  router.post('/posts', function(req, res) {
    var posts = []
    if (Object.keys(req.body).length > 0) {
      posts = db.filterPostList(req.body)
    } else {
      posts = db.getPostList()
    }
    res.send(posts)
  })

  router.post('/rooms', function(req, res){
    var rooms = db.getRoomList()
    res.send(rooms)
  })

  router.post('/newcomment', function(req, res) {
    console.log('newcomment')
    console.log(req.body)
    if (typeof req.body.postId === 'number') {
      db.newComment(req.body, (req.user) ? req.user.username : '')
      socket.updatePost(req.body.postId)
      res.send('ok')
    } else {
      res.send('no post id')
    }
  })

  router.post('/newpost', function(req, res) {
    console.log('newPost')
    console.log(req.body)
    db.newPost(req.body, (req.user) ? req.user.username : '')
    socket.updateList()
    res.send('ok')
  })

  router.post('/upvotepost', function(req, res) {
    db.postUpvote(req.body, (req.user) ? req.user.username : '')
    socket.updateList()
    socket.updatePost(req.body.id)
    res.send('ok')
  })

  router.post('/upvotecomment', function(req, res) {
    db.commentUpvote(req.body, (req.user) ? req.user.username : '')
    socket.updatePost(req.body.id)
    res.send('ok')
  })

  router.post('/editpost', ensureAuthenticated, function(req, res) {
    console.log('editPost')
    console.log(req.body)
    db.editPost(req.body, req.user.username)
    res.send('ok')
  })

  app.get('/logout', function(req, res) {
    console.log('logout')
    console.log(req.user.username)
    req.session.destroy();
    res.redirect('/');
  });

  router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      console.log('USERNAME: ' + (req.user.username));
      console.log(req.body)
      if (req.user.username) {
        res.send({
          username: req.user.username,
          logged: true
        })
      } else {
        console.log('false auth')
        res.send({
          logged: false
        })
      }

    })

  router.get('*', function(req, res) {
    res.sendFile(rootPath + '/public/index.html')
  })

  return router
}
