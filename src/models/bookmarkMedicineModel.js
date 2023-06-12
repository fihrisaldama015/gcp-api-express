const Sequelize = require("sequelize");
const db = require("../db/connection.js");

const { DataTypes } = Sequelize;

const BookmarkMedicine = db.define(
  "bookmark_medicine",
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
    id_medicine: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = BookmarkMedicine;
