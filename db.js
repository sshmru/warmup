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
  id: 0,
  author: "piotr",
  title: "warmup",
  room: "room1",
  tags: "angular express node warmup",
  content: "lets try this",
  updated: Date.now(),
  comments: [{
    author: 'rtoip',
    date: Date.now(),
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

db.filterPostList = function(filter) {
  return posts.filter(function(post){
    for(var item in filter){
      if(filter.hasOwnProperty(item)){
        return post[item] === filter[item]
      }
    }
  });
}

db.getPostList = function() {
  return posts;
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
    comments: []
  })
}

module.exports = db
