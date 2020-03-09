const mysql = require('mysql')
const config = require('./config')

//连接mysql
function connect() {
  const { host, user, password, database } = config
  return mysql.createConnection({
    host,
    user,
    password,
    database
  })
}


//新建查询连接
function querySql(sql) { 
  const conn = connect()
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      //释放连接
      conn.end()
    }
  })
}

//查询一条语句
function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql).then(results => {
      if (results && results.length > 0) {
        resolve(results[0])
      } else {
        resolve(null)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  querySql,
  queryOne
}
