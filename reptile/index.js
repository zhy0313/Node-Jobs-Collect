var express = require('express')
var cheerio = require('cheerio')

var request = require('./request.js')
var config = require('./config.js')
var util = require('./util.js')

var router = express.Router()

// 动态挂载抓取的路由
for (var i = 0; i < config.sites.length; i++) {
  var site = config.sites[i]
  router.get('/' + site.name, function (req, res, next) {
    var params = util.formatParams(site.params, req.query)
    request.get(site.url, params, function (err, html) {
      if (err) next(err)
      var data = site.parse(html)
      res.send(util.successData(data))
    })
  })
}


module.exports = router;