const { querySql, queryOne } = require('../sql/index')

//登录
function login(username, password) {
  const query = `select * from admin_user where username ='${username}' and password ='${password}'`
  return querySql(query)
}

//通过用户名查询用户
function findUser(username) {
  const query = `select id, username, nickname from admin_user where username = '${username}'`
  return queryOne(query)
}

module.exports = {
  login,
  findUser
}
