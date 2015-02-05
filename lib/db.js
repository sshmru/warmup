var db = {}

var rooms = [{
  name: 'room1',
  info: 'room 1 info'
}, {
  name: 'room2',
  info: 'room 2 info'
}]

var users = [{
  id: 0,
  username: "piotr",
  password: "piotr",
  info: 'info o userze piotr',
  comments: [1],
  posts: [0]
}, {
  id: 1,
  username: "test",
  password: "test",
  info: 'info o userze test',
  comments: [0],
  posts: [1]
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
  upvotes: [],
  comments: [0]
}, {
  id: 1,
  author: "test",
  title: "testTile",
  room: "room2",
  tags: ['letsmake', 'more'],
  content: "hope it works",
  updated: Date.now(),
  score: 0,
  upvotes: [],
  comments: [1]
}]


db.getPosts = function(room, filters, callback){
  console.log('getPosts')
  callback('getPosts')
}

db.getPost = function(id, callback){
  console.log('getPost')
  callback('getPost')
}

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
  console.log('addComment')
  callback('addComment')
}

db.editComment = function(postId, id, data, user, callback){
  console.log('addComment')
  callback('addComment')
}

db.addComment = function(postId, id, data, user, callback){
  console.log('voteComment')
  callback('voteComment')
}

db.voteComment = function(postId, id, data, user, callback){
  console.log('getProfile')
  callback('getProfile')
}

db.getProfile = function(idOrName, user, callback){
  console.log('editProfile')
  callback('editProfile')
}

db.editProfile = function(idOrName, data, user, callback){
  console.log('editProfile')
  callback('editProfile')
}

db.getRooms = function(callback){
  console.log('rooms')
  callback('rooms')
}

module.exports = db
