var db = {}

var users = [{
  id: 0,
  username: "piotr",
  password: "piotr",
  info: 'info o userze piotr',
  comments:[1],
  posts: [0]
}, {
  id: 1,
  username: "test",
  password: "test",
  info: 'info o userze test',
  comments:[0],
  posts: [1]
}]

var posts = [{
  id: 0,
  author: "piotr",
  title: "warmup",
  room: "room1",
  tags: "angular express node warmup",
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
  tags: "letsmake more",
  content: "hope it works",
  updated: Date.now(),
  score: 0,
  upvotes: [],
  comments: [1]
}]

var findUserByName = function(username){
  for(var user in users){
    if(users[user].username === username){
      return users[user]
    }
  }
}

var comments = [{
    id: 0,
    author: 'test',
    date: Date.now(),
    score: 0,
    upvotes: [],
    text: "will it work?"
  },{
    id: 1,
    author: 'piotr',
    date: Date.now(),
    score: 0,
    upvotes: [],
    text: "dawww"
  }]

db.getProfile = function(id) {
  console.log(id)
      return {
        username: users[id].username,
        info: users[id].info,
        comments: users[id].comments.map(function(a){
          return comments[a]
        }),
        posts: users[id].posts.map(function(a){
          return posts[a]
        })
      }
}

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
      if (item === 'room' && filter[item] === 'general') {

      } else if (filter.hasOwnProperty(item) && post[item] !== filter[item]) {
        return 0
      }
    }

    return true
  });
}

db.getPost = function(id) {
  var retPost = {}
  for(var prop in posts[id]){
    retPost[prop] = posts[id][prop]
  }
  retPost.comments = retPost.comments.map(function(a){
    return comments[a]
  })
  return retPost
}

db.getPostList = function() {
  return posts;
}


db.postUpvote = function(obj) {
  posts[obj.id].upvotes.push(obj.author)
  posts[obj.id].score += (obj.value > 0) ? 1 : -1
}

db.commentUpvote = function(obj) {
  comments[obj.commentId].upvotes.push(obj.author)
  comments[obj.commentId].score += (obj.value > 0) ? 1 : -1
}

db.newComment = function(obj) {
  var commentId = comments.length
  if(obj.author){
    var author = findUserByName(obj.author)
    if(author){
      author.comments.push(commentId)
    }
    
  }
    posts[obj.id].comments.push(commentId)
    comments.push({
    id: commentId,
    author: obj.author || "anonymous",
    text: obj.text || "no content",
    date: Date.now(),
    score: 0,
    upvotes: []
  })
}

db.newPost = function(obj) {
  var postId = comments.length
  if(obj.author){
    var author = findUserByName(obj.author)
    if(author){
      author.posts.push(postId)
    }
    
  }
  posts.push({
    id: postId,
    author: obj.author || "anonymous",
    room: obj.room || "general",
    title: obj.title || "new post " + (posts.length + 1),
    tags: obj.tags || "",
    content: obj.content || "no content",
    updated: Date.now(),
    score: 0,
    upvotes: [],
    comments: []
  })
}

module.exports = db
