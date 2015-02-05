var _ = require('lodash');

var db = {}

var rooms = [{
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

db.getPosts = function(filters, callback){
  console.log('getPosts' + JSON.stringify(filters))
  var result = _.filter(posts, filters)
  callback(result)
}

db.getPost = function(id, callback){
  console.log('getPost' + id)
  callback(posts[id])
}

//--------------------------------------------------------------------------------
db.editPost = function(id, data, user, callback){
  console.log('editPost')
  callback('editPost')
}

db.addPost = function(data, user, callback){
  console.log('addPost')
  callback('addPost')
}

db.votePost = function(id, data, user, callback){
  console.log('votePost')
  callback('votePost')
}

db.getComments = function(postId, filters, callback){
  console.log('getComments')
  var result = posts[postId].comments.map(function(id){
    return comments[id]
  })
  callback(result)
}

db.editComment = function(id, data, user, callback){
  console.log('editComment')
  callback('editComment')
}

db.addComment = function(postId, data, user, callback){
  console.log('addComment')
  callback('addComment')
}

db.voteComment = function(postId, id, data, user, callback){
  console.log('getProfile')
  callback('getProfile')
}

db.getProfile = function(idOrName, user, callback){
  console.log('getProfile')
  callback('getProfile')
}

db.editProfile = function(idOrName, data, user, callback){
  console.log('editProfile')
  callback('editProfile')
}

db.getRooms = function(callback){
  console.log('rooms')
  callback(rooms)
}

module.exports = db
