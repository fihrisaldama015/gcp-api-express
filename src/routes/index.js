const express = require("express");
const { getFoods, getFoodById } = require("../controllers/foodController.js");
const {
  getMedicines,
  getMedicineById,
} = require("../controllers/medicineController.js");
const {
  searchFood,
  searchMedicine,
  search,
} = require("../controllers/searchController.js");
const {
  Login,
  Register,
  getUsers,
  Logout,
  editUserPassword,
  editUserProfile,
  getUserById,
  deleteUser,
} = require("../controllers/userController.js");
const { openPKL } = require("../controllers/predictController.js");
const { verifyToken } = require("../middlewares.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "GetBetter - Node.js Backend API - v1",
  });
});

router.get("/food", getFoods);
router.get("/food/:id", getFoodById);
router.get("/medicine", getMedicines);
router.get("/medicine/:id", getMedicineById);
router.get("/search/food", searchFood);
router.get("/search/medicine", searchMedicine);
router.get("/search", search);
router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/user/register", Register);
router.post("/user/login", Login);
router.post("/user/logout", Logout);
router.put("/user/changepassword/:id", editUserPassword);
router.put("/user/:id", editUserProfile);
router.delete("/user/:id", deleteUser);

router.get("/predict", openPKL);

module.exports = router;
