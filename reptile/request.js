var superagent = require('superagent')

var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'

/**
 * 抓取页面HTMl数据
 */
function get() {
  switch (arguments.length) {
    case 2:
      _get(arguments[0], {}, arguments[1])
      break
    case 3:
      _get(arguments[0], arguments[1], arguments[2])
      break
  }
}

/**
 * 获取HTML
 * @param {any} url 
 */
function _get(url, params, callback) {
  url = `${url}${generatorParam(params)}`

  superagent.get(url)
    .set('User-Agent', userAgent)
    .end(function (err, res) {
      if (err) return err.stack
      callback(null, res.text)
    })

}
/**
 * {name:'zhongxia',age:18} 对象变成 name=zhongxia&age=18 格式的
 * @param {any} params 
 * @returns 
 */
function generatorParam(params) {
  var paramStr = ''
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      paramStr += `&${key}=${encodeURI(params[key])}`
    }
  }
  return paramStr
}

module.exports = {
  get: get
}