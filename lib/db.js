var _ = require('lodash');

var db = {}

var users = [{
  id: 0,
  username: "piotr",
  info: 'info o userze piotr',
  comments: [1],
  posts: [0]
}, {
  id: 1,
  username: "test",
  info: 'info o userze test',
  comments: [0],
  posts: [1]
}]

var rooms = [{
  name: 'general',
  info: 'default room'
},{
  name: 'room1',
  info: 'room 1 info'
}, {
  name: 'room2',
  info: 'room 2 info'
}]

var posts = [{
  id: 0,
  author: "piotr",
  title: "warmup",
  room: "room1",
  tags: ['angular', 'express', 'node', 'warmup'],
  content: "lets try this",
  updated: Date.now(),
  score: 0,
  voters: [],
  comments: [0]
}, {
  id: 1,
  author: "test",
  title: "testTile",
  room: "general",
  tags: ['letsmake', 'more'],
  content: "hope it works",
  updated: Date.now(),
  score: 0,
  voters: [],
  comments: [1]
}]

var comments = [{
  id: 0,
  author: 'test',
  date: Date.now(),
  score: 0,
  voters: [],
  text: "will it work?"
}, {
  id: 1,
  author: 'piotr',
  date: Date.now(),
  score: 0,
  voters: [],
  text: "dawww"
}]

var Post = function(obj, user){
  return {
    id: posts.length,
    author: user || "anonymous",
    room: obj.room || "general",
    title: obj.title || "new post " + (posts.length + 1),
    tags: obj.tags.replace(/[^a-zA-Z #]/g, '').split('#') || [], //#awe, #er-go -> ['awe', 'er-go]
    content: obj.content || "no content",
    updated: Date.now(),
    score: 0,
    voters: [],
    comments: []
  }
}

var Comment = function(obj,user){
  return {
    id: comments.length,
    author: user || "anonymous",
    text: obj.text || "no content",
    date: Date.now(),
    score: 0,
    voters: []
  }
}


db.getPosts = function(filters, callback) {
  console.log('getPosts' + JSON.stringify(filters))
  var result = _.filter(posts, filters)
  callback(result)
}

db.getPost = function(id, callback) {
  console.log('getPost' + id)
  callback(posts[id])
}

//--------------------------------------------------------------------------------
db.editPost = function(id, data, user, callback) {
  if(posts[id].author === user){
    posts[id].content = data
    callback('editPost')
  }else{
    callback('User not allowed to edit post')
  }
  console.log('editPost')
}

db.addPost = function(data, user, callback) {
  var newPost = new Post(data, user)
  var userObj = _.find(users, {username: user})
  if(userObj){
    userObj.posts.push(newPost.id)
    console.log(userObj)
  }
  if(data.room){
    if(_.find(rooms, {name: data.room})){
//might push post to to room list
    }else{
      rooms.push({
        name: data.room,
        info: "custom room"
      })
    }
  }
  posts.push(newPost)
  console.log('addPost')
  callback('/r/'+ newPost.room +'/' + newPost.id)
}

db.votePost = function(id, value, user, callback) {
  if (posts[id].voters.indexOf(user) !== -1) {
    callback('Already voted')
    console.log('Already voted')
  } else {
    posts[id].score += (value) ? 1 : -1
    posts[id].voters.push(user)
    console.log('votePost')
    callback('votePost')
  }
}

db.getComments = function(postId, filters, callback) {
  console.log('getComments')
  var result = posts[postId].comments.map(function(id) {
    return comments[id]
  })
  callback(result)
}

db.editComment = function(id, data, user, callback) {
  console.log('editComment')
  callback('editComment')
}

db.addComment = function(postId, data, user, callback) {
  var newComment = new Comment(data, user)
  var userObj = _.find(users, {username: user})
  if(userObj){
    userObj.comments.push(newComment.id)
  }
  if(posts[postId]){
    posts[postId].comments.push(newComment.id)
  }
  comments.push(newComment)

  callback('addComment')
}

db.voteComment = function(postId, id, value, user, callback) {
  if (comments[id].voters.indexOf(user) !== -1) {
    callback('Already voted')
    console.log('Already voted')
  } else {
    comments[id].score += (value) ? 1 : -1
    comments[id].voters.push(user)
    console.log('voceComment')
    callback('voteComment')
  }
}

db.getProfile = function(idOrName, callback) {
  console.log('getProfile')
  var found
  var result = {}
  var id = Number(idOrName)
  if (typeof id === 'number' && users[id]) {
    found = users[id]
  } else {
    found = _.find(users, {
      username: idOrName
    })
  }
  if (found) {
    for (var prop in found) {
      result[prop] = found[prop]
    }
    result.posts = found.posts.map(function(id) {
      return posts[id]
    })
    result.comments = found.comments.map(function(id) {
      return comments[id]
    })
    callback(result)
    console.log(result)
  } else {
    callback('PROFILE DOESNT EXIST')
  }
}

db.editProfile = function(idOrName, data, user, callback) {
  var profile
  var id = Number(idOrName)
  if (typeof id === 'number' && users[id]) {
    profile = users[id]
  } else {
    profile = _.find(users, {
      username: idOrName
    })
  }
  if(profile.username === user){
    profile.info = data
    callback('editProfile')
  }else{
    callback('User not allowed to edit post')
  }
  console.log('editProfile')
}

db.getRooms = function(callback) {
  console.log('rooms')
  callback(rooms)
}

module.exports = db
