var db = {}

var users = [{
  id:0,
  username: "piotr",
  password: "piotr"
},{
  id:1,
  username: "test",
  password: "test"
}]

var posts = [{
  author: "piotr",
  title: "warmup",
  tags: "angular express node warmup",
  content: "lets try this",
  updated: Date.now(),
  comments: [{
    author: 'rtoip',
    date: Date.now(),
    text: "will it work?"
  }]
}, {
  author: "whoknows",
  title: "test",
  tags: "lets make more",
  content: "hope it works",
  updated: Date.now(),
  comments: [{
    author: 'whoever',
    date: Date.now(),
    text: "dawww"
  }]
}]

db.verifyUser = function(username, password){
  for(var i = 0; i<users.length-1; i++){
    var user = users[i]
    if(user.username === username && user.password === password){
      return {
        logged: true,
        username: user.username, 
        id:user.id
      }
    }
  }
  return {logged: false}
}

db.getPosts = function() {
  return posts;
}

db.newPost = function(obj) {
  posts.push({
    author: obj.author || "anonymous",
    title: obj.title || "new post " + posts.length + 1,
    tags: obj.tags || "",
    content: obj.content || "no content",
    updated: Date.now(),
    comments: []
  })
}

module.exports = db
