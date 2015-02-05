var express = require('express')

module.exports = function(app, socket, rootPath, passport) {
  var router = express.Router()

  //auth middleware
  var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

  //general routes for angular router
  router.get('/r/*', function(req, res) {
    res.sendFile(rootPath + '/public/index.html')
  })

  router.get('/u/*', function(req, res) {
    res.sendFile(rootPath + '/public/index.html')
  })

  //POSTS
  router.get('/posts/:room', function(req, res) {
    res.send(posts)
  })

  router.get('/post/:id', function(req, res) {
    res.send(db.getPost(req.body.id))
  })

  router.put('/editPost/:id', ensureAuthenticated, function(req, res) {
    res.send(db.getPost(req.body.id))
  })

  router.post('/post', function(req, res) {
    res.send('OK')
  })

  router.post('/upvotepost/:id', ensureAuthenticated, function(req, res) {
    db.postUpvote(req.body, (req.user) ? req.user.username : '')
    res.send('OK')
  })

  //COMMENTS
  router.get('/comments', function(req, res) {
    res.send(posts)
  })

  router.get('/comment/:postId/:id', function(req, res) {
    res.send(db.getPost(req.body.id))
  })

  router.put('/editComment/:postId/:id', ensureAuthenticated, function(req, res) {
    res.send(db.getPost(req.body.id))
  })

  router.post('/comment', function(req, res) {
    res.send('OK')
  })

  router.post('/upvotecomment/:postId/:id', ensureAuthenticated, function(req, res) {
    db.postUpvote(req.body, (req.user) ? req.user.username : '')
    res.send('OK')
  })


  //PROFILES
  router.get('/profile/:idOrName', function(req, res) {
    res.send(db.getProfile(req.body.id))
  })

  router.get('/profile/:idOrName/posts', function(req, res) {
    res.send(db.getProfile(req.body.id))
  })

  router.get('/profile/:idOrName/comments', function(req, res) {
    res.send(db.getProfile(req.body.id))
  })

  router.get('/profile/:idOrName/info', function(req, res) {
    res.send(db.getProfile(req.body.id))
  })

  router.put('/editProfile/:idOrName', ensureAuthenticated, function(req, res) {
    db.editProfile(req.body, req.user.username)
    res.send('OK')
  })

  //ROOMS
  router.post('/rooms', function(req, res) {
    var rooms = db.getRoomList()
    res.send(rooms)
  })

  //LOGIN

  app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });

  router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      if (req.user.username) {
        res.send({
          username: req.user.username,
          logged: true
        })
      } else {
        res.send({
          logged: false
        })
      }
    })


  //GENERAL
  router.get('*', function(req, res) {
    res.sendFile(rootPath + '/public/index.html')
  })

  return router
}
