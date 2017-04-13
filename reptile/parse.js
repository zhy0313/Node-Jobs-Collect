var cheerio = require('cheerio');

/**
 *  解析类
 *  从HTML中，解析出需要的数据
 */

// 解析智联招聘数据
function zlzp(html) {
  var $ = cheerio.load(html, { decodeEntities: false })
  var ths = []
  var data = []

  $("table").each(function (i, e) {
    if (i === 0) {
      $(e).find('th').each(function (k, e2) {
        ths.push($(e2).text())
      })
    } else {
      var obj = {}
      $(e).find('td').each(function (j, e1) {
        var key = ths[j] || '要求'
        obj[key] = $(e1).text()
      })
      data.push(obj)
    }
  })
  return data
}

// 解析内推网数据
function ntw(html) {
  var $ = cheerio.load(html, { decodeEntities: false })
  var data = []
  $('.list-items').eq(0).find('li').each(function (index, element) {
    var info = {}

    var $jobInfo = $(element)
    info.jobName = $jobInfo.find('.mt5 a').text().trim()
    info.url = $jobInfo.find('.mt5 a').attr('href')
    info.pubdate = $jobInfo.find('.mt5 .ml10').text().trim()
    info.salaryRange = $jobInfo.find('.mr10').text().trim()
    info.condition = $jobInfo.find('.mr10').next().text().trim()
    info.ntnum = $jobInfo.find('.ntnum .mt5 span').text().trim()
    info.company = $jobInfo.find('.grey.mt5 span').eq(0).text().replace('[', '').replace(']', '').trim()

    data.push(info)
  })
  return data
}


module.exports = {
  zlzp: zlzp,
  ntw: ntw
}