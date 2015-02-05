var express = require('express')

var exists = function(thing) {
  return typeof thing !== 'undefined'
}

module.exports = function(app, socket, rootPath, passport, db) {
  var router = express.Router()

  //auth middleware
  var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated() && req.user) {
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

  //to allow async calls for db, provide res.send bound to res as callback

  //POSTS
  router.get('/posts', function(req, res) {
    var filters = req.body.filters || {}
    var room = 'general'
    db.getPosts(room, filters, res.send.bind(res))
  })

  router.get('/posts/:room', function(req, res) {
    var filters = req.body.filters || {}
    var room = req.params.room || 'general'
    db.getPosts(room, filters, res.send.bind(res))
  })

  router.get('/post/:id', function(req, res) {
    var id = req.params.id
    if (exists(id)) {
      db.getPost(id, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.put('/editpost/:id', ensureAuthenticated, function(req, res) {
    var id = req.params.id || req.body.id
    var user = req.user.username
    var data = req.body.data
    if (exists(id) && data && user) {
      db.editPost(id, data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.post('/post', function(req, res) {
    var user = (req.user) ? req.user.username : 'Anonymous'
    var data = req.body.data
    if (data) {
      db.addPost(data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.post('/votepost/:id', ensureAuthenticated, function(req, res) {
    var id = req.params.id || req.body.id
    var user = req.user.username
    var data = req.body.data
    if (exists(id) && user && data) {
      db.votePost(id, data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  //COMMENTS
  router.get('/comments/:postId', function(req, res) {
    var filters = res.body.filters || {}
    var postId = req.params.postId
    if (exists(postId)) {
      db.getComments(postId, filters, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.get('/comment/:postId/:id', function(req, res) {
    var postId = req.params.postId
    var id = req.params.id
    if (exists(id) && exists(postId)) {
      db.getComment(postId, id, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.put('/editComment/:postId/:id', ensureAuthenticated, function(req, res) {
    var postId = req.params.postId
    var id = req.params.id
    var user = req.user.username
    var data = req.body.data
    if (exists(id) && exists(postId) && user && data) {
      db.editComment(postId, id, data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.post('/comment/:postId/:id', function(req, res) {
    var postId = req.params.postId
    var id = req.params.id
    var user = (req.user) ? req.user.username : 'Anonymous'
    var data = req.body.data
    if (exists(id) && exists(postId)) {
      db.addComment(postId, id, data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.post('/votecomment/:postId/:id', ensureAuthenticated, function(req, res) {
    var postId = req.params.postId
    var id = req.params.id
    var user = req.user.username
    var data = req.body.data
    if (exists(id) && exists(postId) && user && data) {
      db.voteComment(postId, id, data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })


  //PROFILES
  router.get('/profile/:idOrName', function(req, res) {
    var idOrName = req.params.idOrName
    var data = req.body.data
    if (exists(idOrName)) {
      db.getProfile(idOrName, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })


  router.put('/editProfile/:idOrName', ensureAuthenticated, function(req, res) {
    var idOrName = req.params.idOrName
    var user = req.user.username
    var data = req.body.data
    if (exists(idOrName) && user) {
      db.editProfile(idOrName, data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  //ROOMS
  router.get('/rooms', function(req, res) {
    db.getRooms(res.send.bind(res))
  })

  //LOGIN

  router.post('/logout', function(req, res) {
    var user = (req.user) ? req.user.username : 'Anonymous'
    console.log('user logout:' + user)
    req.session.destroy();
    res.send('OK');
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
