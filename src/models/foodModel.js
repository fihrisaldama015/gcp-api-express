const Sequelize = require("sequelize");
const db = require("../db/connection.js");

const { DataTypes } = Sequelize;

const Food = db.define(
  "food",
  {
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    disease: {
      type: DataTypes.STRING,
    },
    food_name: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.TEXT,
    },
    recipe: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Food;
