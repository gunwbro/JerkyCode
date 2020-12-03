require('dotenv').config();

module.exports = {
  development: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: process.env.SEQUELIZE_HOST,
    dialect: "mariadb",
    operatorsAliases: 'false',  // 연산자 별칭 사용
  },
  production: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: process.env.SEQUELIZE_HOST,
    dialect: "mariadb",
    operatorsAliases: 'false',  // 연산자 별칭 사용
    logging: false, // 쿼리 명령어 숨기기
  }
}