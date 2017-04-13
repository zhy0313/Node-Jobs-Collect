var Sequelize = require('sequelize');
var config = require('../config.js')


var sequelize
var dbConfig = config.db[config.use]

if (config.use !== 'sqlite') {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    Sequelize: Sequelize
  });
} else {
  sequelize = new Sequelize(dbConfig.database, null, null, {
    dialect: 'sqlite',
    storage: dbConfig.database
  });
}


sequelize.authenticate().then(function (err) {
  if (!!err) {
    console.log('unable to connect ${dbConfig.host}:${dbConfig.port} to the database');
  } else {
    console.log(`Connection ${dbConfig.host || config.use}:${dbConfig.port || ''} has been established successfully`)
  }
})



function ApplicationMysql() {
  return sequelize;
}

module.exports = new ApplicationMysql()