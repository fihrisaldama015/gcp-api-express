const Medicine = require("../models/medicineModel.js");

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findOne({ where: { drug_id: id } });
    if (!medicine) {
      return res.status(400).json({ message: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMedicines, getMedicineById };
