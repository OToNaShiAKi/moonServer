const { STRING, INTEGER, BOOLEAN } = require("sequelize");

const sequelize = require("./../config/MySQL");

const User = sequelize.define(
  "user",
  {
    id: {
      type: STRING,
      primaryKey: true,
    },
    nick: {
      type: STRING,
      primaryKey: true,
    },
    password: {
      type: STRING,
    },
    name: {
      type: STRING,
      unique: true,
    },
    uid: {
      type: STRING,
      unique: true,
    },
    telphone: {
      type: STRING,
      unique: true,
    },
    integral: {
      type: INTEGER,
    },
    pictures: {
      type: INTEGER,
    },
    onecho: {
      type: BOOLEAN,
    },
    media: {
      type: BOOLEAN,
    },
    office: {
      type: BOOLEAN,
    },
  },
  {
    freezeTableName: true, // 告诉sequelize不需要自动将表名变成复数
    timestamps: false, // 不需要自动创建createAt/updateAt这两个字段
  }
);

module.exports = User;
