var CODE = {
  success: '000',
  parseError: '101'
}
module.exports = {
  // 格式化返回数据
  successData: function (data) {
    return {
      code: CODE.success,
      msg: `解析出数据${data.length}条`,
      data: data
    }
  },
  parseErrorData: function (data) {
    return {
      code: CODE.parseError,
      msg: `解析出数据${data.length}条`,
      data: data
    }
  },
  /**
   * 对各个采集网站的参数做差异化处理
   * 统一化各个网站的参数名 eg: { city:'lj', keyword:'kw' }
   * 参数 eg: { city:'xiamen', keyword:'web' }
   * return { lj:'xiamen', kw:'web' }
   */
  formatParams: function (keyObj, valObj) {
    var param = {}
    for (var key in keyObj) {
      if (keyObj.hasOwnProperty(key) && valObj[key]) {
        var val = keyObj[key]
        param[val] = valObj[key]
      }
    }
    return param
  }
}