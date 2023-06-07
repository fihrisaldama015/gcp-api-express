const Medicine = require("../models/medicineModel.js");
const Food = require("../models/foodModel.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const search = async (req, res) => {
  const searchTerm = req.query.key;
  let disease = {};
  let medicine = [];
  let food = [];
  try {
    if (searchTerm !== undefined) {
      disease = await Medicine.findOne({
        where: {
          disease: { [Op.like]: `%${searchTerm}%` },
        },
        attributes: ["disease", "medical_condition_description"],
        distinct: true,
      });
      if (!disease) {
        disease = {
          disease: `No disease found for (${searchTerm})`,
          medical_condition_description: "No description",
        };
      }
      medicine = await Medicine.findAll({
        where: {
          [Op.or]: !disease
            ? [
                {
                  disease: { [Op.like]: `%${searchTerm}%` },
                },
                {
                  drug_name: { [Op.like]: `%${searchTerm}%` },
                },
                {
                  medical_condition_description: {
                    [Op.like]: `%${searchTerm}%`,
                  },
                },
                {
                  pregnancy_category: { [Op.like]: `%${searchTerm}%` },
                },
                {
                  side_effects: { [Op.like]: `%${searchTerm}%` },
                },
              ]
            : [
                {
                  disease: { [Op.like]: `%${disease.disease}%` },
                },
              ],
        },
        attributes: [
          "drug_id",
          "disease",
          "drug_name",
          "rating",
          "pregnancy_category",
          "side_effects",
        ],
      });
      food = await Food.findAll({
        where: {
          [Op.or]: [
            {
              disease: { [Op.like]: `%${searchTerm}%` },
            },
            {
              food_name: { [Op.like]: `%${searchTerm}%` },
            },
            {
              ingredients: { [Op.like]: `%${searchTerm}%` },
            },
            {
              recipe: { [Op.like]: `%${searchTerm}%` },
            },
          ],
        },
      });
    } else {
      medicine = await Medicine.findAll();
      food = await Food.findAll();
    }
    res.status(200).json({ disease, medicine, food });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchMedicine = async (req, res) => {
  const searchTerm = req.query.key;
  let medicine = [];
  try {
    if (searchTerm !== undefined) {
      medicine = await Medicine.findAll({
        where: {
          [Op.or]: [
            {
              disease: { [Op.like]: `%${searchTerm}%` },
            },
            {
              drug_name: { [Op.like]: `%${searchTerm}%` },
            },
            {
              medical_condition_description: { [Op.like]: `%${searchTerm}%` },
            },

            {
              pregnancy_category: { [Op.like]: `%${searchTerm}%` },
            },
            {
              side_effects: { [Op.like]: `%${searchTerm}%` },
            },
          ],
        },
      });
    } else {
      medicine = await Medicine.findAll();
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchFood = async (req, res) => {
  const searchTerm = req.query.key;
  let food = [];
  console.log({ searchTerm });
  try {
    if (searchTerm !== undefined) {
      food = await Food.findAll({
        where: {
          [Op.or]: [
            {
              disease: { [Op.like]: `%${searchTerm}%` },
            },
            {
              food_name: { [Op.like]: `%${searchTerm}%` },
            },
            {
              ingredients: { [Op.like]: `%${searchTerm}%` },
            },
            {
              recipe: { [Op.like]: `%${searchTerm}%` },
            },
          ],
        },
      });
    } else {
      food = await Food.findAll();
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchMedicine, searchFood, search };
