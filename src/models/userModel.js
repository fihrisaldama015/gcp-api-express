const Sequelize = require("sequelize");
const db = require("../db/connection.js");

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    tempat_lahir: {
      type: DataTypes.STRING,
    },
    tgl_lahir: {
      type: DataTypes.DATEONLY,
    },
    password: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: false,
  }
);

module.exports = Users;
