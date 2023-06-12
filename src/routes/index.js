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
const {
  PredictDisease,
  LoadModel,
} = require("../controllers/predictController.js");
const {
  getUserBookmarks,
  bookmarkFood,
  bookmarkMedicine,
  deleteBookmarkFood,
  deleteBookmarkMedicine,
} = require("../controllers/bookmarkController.js");
const {
  getUserSearchHistory,
  deleteSearchHistory,
} = require("../controllers/searchHistoryController.js");
const { verifyToken } = require("../middlewares.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "GetBetter - Node.js Backend API - v1",
  });
});

router.get("/ip", (req, res) => {
  const ipAddress = req.socket.remoteAddress;
  res.send(ipAddress);
});

// FOOD
router.get("/food", getFoods);
router.get("/food/:id", getFoodById);

// MEDICINE
router.get("/medicine", getMedicines);
router.get("/medicine/:id", getMedicineById);

// SEARCH
router.get("/search/food", searchFood);
router.get("/search/medicine", searchMedicine);
router.get("/search", search);

// USER
router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/user/register", Register);
router.post("/user/login", Login);
router.post("/user/logout", Logout);
router.put("/user/changepassword/:id", editUserPassword);
router.put("/user/:id", editUserProfile);
router.delete("/user/:id", deleteUser);

// BOOKMARK
router.get("/user/:id/bookmark", getUserBookmarks);
router.post("/user/:id/bookmark/food", bookmarkFood);
router.post("/user/:id/bookmark/medicine", bookmarkMedicine);
router.delete("/user/:id/bookmark/food", deleteBookmarkFood);
router.delete("/user/:id/bookmark/medicine", deleteBookmarkMedicine);

// DISEASE PREDICTION
router.get("/predict", LoadModel);
router.post("/predict", PredictDisease);

// SEARCH HISTORY
router.get("/user/:id/history", getUserSearchHistory);
router.delete("/user/:id/history/:id_search", deleteSearchHistory);

module.exports = router;
