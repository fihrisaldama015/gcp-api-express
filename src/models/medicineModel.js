const Sequelize = require("sequelize");
const db = require("../db/connection.js");

const { DataTypes } = Sequelize;

const Medicine = db.define(
  "medicine",
  {
    drug_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    disease: {
      type: DataTypes.STRING,
    },
    medical_condition_description: {
      type: DataTypes.TEXT,
    },
    drug_name: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    pregnancy_category: {
      type: DataTypes.STRING,
    },
    side_effects: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Medicine;
