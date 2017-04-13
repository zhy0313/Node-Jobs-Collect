var app = require('./mysql.js')


var Jobs = app.define('jobs_dev', {
  title: { type: app.Sequelize.STRING, },
  company: { type: app.Sequelize.STRING },
  salary: { type: app.Sequelize.STRING },
  city: { type: app.Sequelize.STRING },
  exp: { type: app.Sequelize.STRING },
  condition: { type: app.Sequelize.STRING },
  type: { type: app.Sequelize.STRING },
  url: { type: app.Sequelize.STRING },
  remark: { type: app.Sequelize.STRING },
  pubdate: { type: app.Sequelize.STRING },
}, {
    freezeTableName: true
  })

// 插入
function insert(jobs) {
  app.sync().then(function () {
    Jobs.create(jobs)
  })
}

/**
 * 批量插入
 * @param {Array} data 照片数据
 * @param {string} type  来源
 * @param {Object} params 请求的参数
 */
function inserts(data, type, params) {
  if (Array.isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i].type = type
      data[i].city = params.city || 'unkonwn'
      insert(data[i])
    }
  }
}

module.exports = {
  insert: insert,
  inserts: inserts
}
