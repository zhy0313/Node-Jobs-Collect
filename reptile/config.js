var parse = require('./parse.js')
// module.exports = {
//   // 内推网
//   ntw: 'http://www.neitui.me/?name=job&handle=lists&city=%E5%9F%8E%E5%B8%82&keyword=Web%E5%89%8D%E7%AB%AF',
//   // 智联招聘
//   zlzp: 'http://sou.zhaopin.com/jobs/searchresult.ashx?1=1',
// }

var config = {
  sites: [
    {
      name: 'ntw',
      url: 'http://www.neitui.me/?name=job&handle=lists',
      parse: parse.ntw,
      params: {
        keyword: 'keyword',
        city: 'city',
        salary_min: 'sf',
        salary_max: 'st',
        exp: ''
      }
    },
    {
      name: 'zlzp',
      url: 'http://sou.zhaopin.com/jobs/searchresult.ashx?1=1',
      parse: parse.zlzp,
      params: {
        keyword: 'kw',
        city: 'jl',
        salary_min: 'sf',
        salary_max: 'st',
        exp: ''
      }
    }
  ]
}

module.exports = config