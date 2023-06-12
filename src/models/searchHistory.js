const Sequelize = require("sequelize");
const db = require("../db/connection.js");

const { DataTypes } = Sequelize;

const SearchHistory = db.define(
  "search_history",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
    keyword: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = SearchHistory;
