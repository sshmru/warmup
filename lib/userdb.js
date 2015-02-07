var db = {}
var users = [{
  id: 0,
  username: "piotr",
  password: "piotr",
}, {
  id: 1,
  username: "test",
  password: "test",
}]

//used by passport only
db.findByUsername = function(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

//used by passport only
db.findById = function(id, fn) {
  if (users[id]) {
    fn(null, users[id]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

module.exports = db
