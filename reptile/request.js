var iconv = require('iconv-lite')
var request = require('request')
var objectAssign = require('object-assign')


var headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
  'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
  'Cookie': '_ga=GA1.2.311229505.1489152662'
}

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
 * 抓去HTML页面内容
 * @param {any} url 
 * @param {any} params 
 * @param {any} callback 
 */
function _get(options, params, callback) {
  options.url = `${options.url}${generatorParam(params)}`
  defaultOptions = {
    headers: headers,
    encoding: null  // 关键代码
  }
  options = objectAssign(defaultOptions, options)
  request(options, function (err, sres, body) {
    debugger
    var html = iconv.decode(body, options.chatset || 'utf-8')
    callback(null, html)
  });
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