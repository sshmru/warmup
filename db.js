var db = {}

var users = [{
  id: 0,
  username: "piotr",
  password: "piotr"
}, {
  id: 1,
  username: "test",
  password: "test"
}]

var posts = [{
  id: 0,
  author: "piotr",
  title: "warmup",
  room: "room1",
  tags: "angular express node warmup",
  content: "lets try this",
  updated: Date.now(),
  upvotes: [],
  comments: [{
    id: 0,
    author: 'rtoip',
    date: Date.now(),
    upvotes: [],
    text: "will it work?"
  }]
}, {
  id: 1,
  author: "author",
  title: "testTile",
  room: "room2",
  tags: "letsmake more",
  content: "hope it works",
  updated: Date.now(),
  upvotes: [],
  comments: [{
    id: 0,
    author: 'whoever',
    date: Date.now(),
    upvotes: [],
    text: "dawww"
  }]
}]

db.verifyUser = function(username, password) {
  for (var i = 0; i < users.length - 1; i++) {
    var user = users[i]
    if (user.username === username && user.password === password) {
      return {
        logged: true,
        username: user.username,
        id: user.id
      }
    }
  }
  return {
    logged: false
  }
}

db.filterPostList = function(filter) {
  return posts.filter(function(post) {
    for (var item in filter) {
      if (filter.hasOwnProperty(item)) {
        if (post[item] !== filter[item]) {
          return 0
        }
      }
    }
    return true
  });
}

db.getPost = function(id) {
  return posts[id]
}

db.getPostList = function() {
  return posts;
}

db.postUpvote = function(obj) {
  posts[obj.id].upvotes.push(obj.author)
}

db.commentUpvote = function(obj) {
  posts[obj.id].comments[obj.commentId].upvotes.push(obj.author)
}

db.newComment = function(obj) {
  posts[obj.id].comments.push({
    id: posts[obj.id].comments.length,
    author: obj.author || "anonymous",
    text: obj.text || "no content",
    date: Date.now(),
    upvotes: []
  })
}

db.newPost = function(obj) {
  posts.push({
    id: posts.length,
    author: obj.author || "anonymous",
    room: obj.room || "general",
    title: obj.title || "new post " + posts.length + 1,
    tags: obj.tags || "",
    content: obj.content || "no content",
    updated: Date.now(),
    upvotes: [],
    comments: []
  })
}

module.exports = db
