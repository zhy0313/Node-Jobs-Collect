/**
 *  解析类
 *  从HTML中，解析出需要的数据
 */
var iconv = require('iconv-lite')
var cheerio = require('cheerio')

// 解析智联招聘数据
function zlzp(html) {
  var FIELDS = {
    '职位名称': 'title',
    '公司名称': 'company',
    '职位月薪': 'salary',
    '工作地点': 'city',
    '发布日期': 'pubdate',
    'condition': 'condition'
  }
  var $ = cheerio.load(html, { decodeEntities: false })
  var ths = []
  var data = []
  $("table").each(function (i, e) {
    if (i === 0) {
      $(e).find('th').each(function (k, e2) {
        ths.push($(e2).text().trim())
      })
    } else {
      var obj = {}
      $(e).find('td').each(function (j, e1) {
        var key = ths[j] || 'condition'
        obj[FIELDS[key]] = $(e1).text().trim()
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
    info.title = $jobInfo.find('.mt5 a').text().trim()
    info.company = $jobInfo.find('.grey.mt5 span').eq(0).text().replace('[', '').replace(']', '').trim()
    info.url = $jobInfo.find('.mt5 a').attr('href')
    info.pubdate = $jobInfo.find('.mt5 .ml10').text().trim()
    info.salary = $jobInfo.find('.mr10').text().trim()
    info.condition = $jobInfo.find('.mr10').next().text().trim()
    info.ntnum = $jobInfo.find('.ntnum .mt5 span').text().trim()

    data.push(info)
  })
  return data
}


// 解析51job
function job_51(html) {
  var $ = cheerio.load(html, { decodeEntities: false })
  var data = []
  $('.dw_table .el').not('.title').each(function (index, element) {
    var info = {}
    var $jobInfo = $(element)
    info.title = $jobInfo.find('.t1 a').text().trim()
    info.url = $jobInfo.find('.t1 a').attr('href').trim()
    info.company = $jobInfo.find('.t2 a').text().trim()
    info.city = $jobInfo.find('.t3').text().trim()
    info.salary = $jobInfo.find('.t4').text().trim()
    info.pubdate = $jobInfo.find('.t5').text().trim()
    data.push(info)
  })
  return data
}

// 解析51job
function liepin(html) {
  var $ = cheerio.load(html, { decodeEntities: false })
  var data = []
  $('.sojob-list li').each(function (index, element) {
    var info = {}
    var $jobInfo = $(element)

    info.title = $jobInfo.find('h3').text().trim()
    info.url = $jobInfo.find('h3 a').attr('href')
    info.company = $jobInfo.find('.company-info .company-name a').attr('title')
    info.industry = $jobInfo.find('.company-info .industry-link').text()
    info.condition = $jobInfo.find('.condition').attr('title')
    info.city = $jobInfo.find('.condition .area').text()
    info.salary = $jobInfo.find('.condition .text-warning').text()
    info.pubdate = $jobInfo.find('.time-info time').text()
    info.edu = $jobInfo.find('.condition .edu').text()
    info.exp = $jobInfo.find('.condition span').last().text()
    info.temptation = $jobInfo.find('.temptation span').text()

    data.push(info)
  })
  return data
}



module.exports = {
  zlzp: zlzp,
  ntw: ntw,
  job_51: job_51,
  liepin: liepin
}