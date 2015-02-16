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
    console.log('unauthorized attempt')
    res.send('NOT AUTHENTICATED')
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
    if (filters.room === 'general') {
      delete filters.room
    }
    db.getPosts(filters, res.send.bind(res))
  })

  router.get('/posts/:room', function(req, res) {
    var filters = req.body.filters || {}
    filters.room = req.params.room
    if (filters.room === 'general') {
      delete filters.room
    }
    db.getPosts(filters, res.send.bind(res))
  })

  //doesnt provide comments ! make separate call to get em
  router.get('/post/:id', function(req, res) {
    var id = req.params.id
    db.getPost(id, res.send.bind(res))
  })

  router.put('/post/:id', ensureAuthenticated, function(req, res) {
    var user = req.user.username
    if (req.body) {
      db.editPost(req.params.id, req.body.content, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.post('/post', function(req, res) {
    var user = (req.user) ? req.user.username : 'Anonymous'
    var data = req.body
    if (data) {
      db.addPost(data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.post('/votepost/:id/:value', ensureAuthenticated, function(req, res) {
    var user = req.user.username
    var id = Number(req.params.id)
    var value = Number(req.params.value)
    if (user) {
      db.votePost(id, value, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  //COMMENTS
  router.get('/comments/:postId', function(req, res) {
    var filters
    if (req.body && req.body.filters) {
      filters = res.body.filters || {}
    }
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

  router.put('/editcomment/:id', ensureAuthenticated, function(req, res) {
    var id = req.params.id
    var user = req.user.username
    var data = req.body.data
    if (exists(id) && user && data) {
      db.editComment(id, data, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })

  router.post('/comment/:postId', function(req, res) {
    var postId = req.params.postId
    var user = (req.user) ? req.user.username : 'Anonymous'
    var data = req.body
    db.addComment(postId, data, user, res.send.bind(res))
  })

  router.post('/votecomment/:postId/:id/:value', ensureAuthenticated, function(req, res) {
    var user = req.user.username
    var id = Number(req.params.id)
    var postId = Number(req.params.value)
    var value = Number(req.params.value)
    if (user) {
      db.voteComment(postId, id, value, user, res.send.bind(res))
    } else {
      res.send('BAD REQUEST')
    }
  })


  //PROFILES
  router.get('/profile/:idOrName', function(req, res) {
    var idOrName = req.params.idOrName
    var data = req.body.data
    db.getProfile(idOrName, res.send.bind(res))
  })


  router.put('/profile/:idOrName', ensureAuthenticated, function(req, res) {
    var idOrName = req.params.idOrName
    var user = req.user.username
    var data = req.body.info
    db.editProfile(idOrName, data, user, res.send.bind(res))
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
