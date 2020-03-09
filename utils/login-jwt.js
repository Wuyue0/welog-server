
//引入验证jsonwebtoken 
//jsonwebtoken：基于 jwt 的概念实现安全的加密方案库，实现加密token和解析token的功能。
const jwt = require('jsonwebtoken')
//引入express-jwt
//express-jwt：express-jwt
//是在jsonwebtoken的基础上做了上层封装，基于express框架下认证 jwt 的中间件，来实现jwt的认证功能。
const expressJwt = require('express-jwt')
//自定义的jwt密钥
const { PRIVATE_KEY } = require('./constant')

//验证token是否过期
const jwtAuth = expressJwt({
  //设置密钥
  secret: PRIVATE_KEY,
  //设置为true表示校验，false表示不校验
  credentialsRequired: true,
  //自定义获取token的函数
  getToken: (req) => {
    if (req.headers.authorization) {
      return req.headers.authorization
    } else if (req.query && req.query.token) {
      return req.query.token
    }
  }
  //设置jwt认证白名单,比如说/user/login登录接口不需要拦截是否登录
}).unless({
  path: [
    '/',
    '/user/login'
  ]
})

//jwt-token解析
function decode(req) {
  const token = req.get('Authorization')
  return jwt.verify(token, PRIVATE_KEY)
}
module.exports = {
  jwtAuth,
  decode
}
