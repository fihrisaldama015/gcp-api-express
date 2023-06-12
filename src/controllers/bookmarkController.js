const BookmarkFood = require("../models/bookmarkFoodModel.js");
const BookmarkMedicine = require("../models/bookmarkMedicineModel.js");
const Food = require("../models/foodModel.js");
const Medicine = require("../models/medicineModel.js");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getUserBookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    let bookmarkedFood = [];
    let bookmarkedMedicine = [];
    Food.hasMany(BookmarkFood, { foreignKey: "id_food" });
    BookmarkFood.belongsTo(Food, { foreignKey: "id_food" });
    const foods = await BookmarkFood.findAll({
      where: {
        id_user: id,
      },
      include: [Food],
    });
    bookmarkedFood = foods.map((food) => food.food);

    Medicine.hasMany(BookmarkMedicine, { foreignKey: "id_medicine" });
    BookmarkMedicine.belongsTo(Medicine, { foreignKey: "id_medicine" });
    const medicine = await BookmarkMedicine.findAll({
      where: {
        id_user: id,
      },
      include: [Medicine],
    });
    bookmarkedMedicine = medicine.map((medicine) => medicine.medicine);
    res.status(200).json({ bookmarkedFood, bookmarkedMedicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookmarkFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { food_id } = req.body;

    if (!food_id) {
      return res.status(400).json({ message: "food_id is required" });
    }

    const foodExists = await Food.findOne({
      where: {
        food_id: food_id,
      },
    });
    if (!foodExists) {
      return res
        .status(404)
        .json({ message: `Food not found (id = ${food_id})` });
    }

    const bookmarkExists = await BookmarkFood.findOne({
      where: {
        id_user: id,
        id_food: food_id,
      },
    });
    if (bookmarkExists) {
      return res
        .status(200)
        .json({ message: `Food already bookmarked (id = ${food_id})` });
    }

    const bookmark = await BookmarkFood.create({
      id_user: id,
      id_food: food_id,
    });
    res.status(200).json({ message: "Food bookmarked", bookmark });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookmarkMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { drug_id } = req.body;

    if (!drug_id) {
      return res.status(400).json({ message: "drug_id is required" });
    }

    const medicineExists = await Medicine.findOne({
      where: {
        drug_id: drug_id,
      },
    });
    if (!medicineExists) {
      return res
        .status(404)
        .json({ message: `Medicine not found (id = ${drug_id})` });
    }

    const bookmarkExists = await BookmarkMedicine.findOne({
      where: {
        id_user: id,
        id_medicine: drug_id,
      },
    });
    if (bookmarkExists) {
      return res
        .status(200)
        .json({ message: `Medicine already bookmarked (id = ${drug_id})` });
    }

    const bookmark = await BookmarkMedicine.create({
      id_user: id,
      id_medicine: drug_id,
    });
    res.status(200).json({ bookmark });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBookmarkFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { food_id } = req.body;

    if (!food_id) {
      return res.status(400).json({ message: "food_id is required" });
    }

    const foodExists = await Food.findOne({
      where: {
        food_id: food_id,
      },
    });
    if (!foodExists) {
      return res
        .status(404)
        .json({ message: `Food not found (id = ${food_id})` });
    }

    const bookmarkExists = await BookmarkFood.findOne({
      where: {
        id_user: id,
        id_food: food_id,
      },
    });
    if (!bookmarkExists) {
      return res
        .status(404)
        .json({ message: `Food not bookmarked (id = ${food_id})` });
    }

    const bookmarkedFood = await BookmarkFood.destroy({
      where: {
        id_user: id,
        id_food: food_id,
      },
    });
    res.status(200).json({ message: "Food bookmark deleted", bookmarkedFood });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBookmarkMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { drug_id } = req.body;

    if (!drug_id) {
      return res.status(400).json({ message: "drug_id is required" });
    }

    const medicineExists = await Medicine.findOne({
      where: {
        drug_id: drug_id,
      },
    });
    if (!medicineExists) {
      return res
        .status(404)
        .json({ message: `Medicine not found (id = ${drug_id})` });
    }

    const bookmarkExists = await BookmarkMedicine.findOne({
      where: {
        id_user: id,
        id_medicine: drug_id,
      },
    });
    if (!bookmarkExists) {
      return res
        .status(404)
        .json({ message: `Medicine not bookmarked (id = ${drug_id})` });
    }

    const bookmarkedMedicine = await BookmarkMedicine.destroy({
      where: {
        id_user: id,
        id_medicine: drug_id,
      },
    });
    res
      .status(200)
      .json({ message: "Medicine bookmark deleted", bookmarkedMedicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserBookmarks,
  bookmarkFood,
  bookmarkMedicine,
  deleteBookmarkFood,
  deleteBookmarkMedicine,
};
