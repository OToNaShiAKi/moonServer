const Sequelize = require("sequelize");
const MySQL = {
  database: "hustmaths",
  username: "root",
  password: "",
  config: {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
  },
};

const sequelize = new Sequelize(
  MySQL.database,
  MySQL.username,
  MySQL.password,
  MySQL.config
);

module.exports = sequelize;
