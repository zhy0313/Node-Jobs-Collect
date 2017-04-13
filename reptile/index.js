var express = require('express')
var cheerio = require('cheerio')

var request = require('./request.js')
var config = require('./config.js')
var util = require('./util.js')

var Jobs = require('./model/jobs.js')

var router = express.Router()

// 动态挂载抓取的路由
for (var i = 0; i < config.sites.length; i++) {
  var site = config.sites[i]
  /** 
   * 2017-04-13 17:31:48
   * FLAG: site 的 内存会一直占用【这个叫内存使用，不叫内存占用，因为site信息有用处】
   * 不过问题不大，应该site的配置信息很小，不是大量的数据
   * 
   * 不使用必要的话，等请求接口的时候，site 的值 会一直等于 sites 数组的最后一个
   * */
  !(function (site) {
    router.get('/' + site.name, function (req, res, next) {
      var params = util.formatParams(site.params, req.query)
      request.get({ url: site.url, chatset: site.chatset }, params, function (err, html) {
        if (err) next(err)
        if (site.parse && typeof site.parse === 'function') {
          var data = site.parse(html)
          if (config.saveToMySql) {
            Jobs.inserts(data, site.name, req.query)
          }
          res.send(util.successData(data))
        } else {
          res.send(util.notParser())
        }
      })
    })
  })(site)
}


module.exports = router;