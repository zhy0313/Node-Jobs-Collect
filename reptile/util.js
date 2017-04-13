var INFO = {
  success: {
    code: '000',
    msg: 'ok'
  },
  parseError: {
    code: '101',
    msg: '解析过程报错...'
  },
  notParser: {
    code: '102',
    msg: '没有解析该地址的解析器'
  }
}
module.exports = {
  // 格式化返回数据
  successData: function (data) {
    return {
      code: INFO.success.code,
      msg: `解析出数据${data.length}条`,
      data: data
    }
  },
  parseErrorData: function () {
    return INFO.parseError
  },
  notParser: function () {
    return INFO.notParser
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