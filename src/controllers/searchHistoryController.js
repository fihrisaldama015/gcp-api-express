const SearchHistory = require("../models/searchHistory.js");
const User = require("../models/userModel.js");

const getUserSearchHistory = async (req, res) => {
  try {
    const { id } = req.params;
    let history = await SearchHistory.findAll({
      where: { id_user: id },
      atrributes: { exclude: ["id"] },
    });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setSearchHistory = async (req, res, keyword) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(400).json({ message: "User not logged in" });
    const user = await User.findOne({ where: { refreshToken } });
    if (!user)
      return res
        .status(403)
        .json({ message: "Forbidden | User not logged in" });
    const history = await SearchHistory.create({
      id_user: user.toJSON().user_id,
      keyword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSearchHistory = async (req, res) => {
  try {
    const { id, id_search } = req.params;

    const historyExists = await SearchHistory.findOne({
      where: { id_user: id, id: id_search },
    });
    if (!historyExists)
      return res.status(404).json({ message: "Search history not found" });

    const history = await SearchHistory.destroy({
      where: { id_user: id, id: id_search },
    });
    res.status(200).json({ message: "Search history deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserSearchHistory,
  setSearchHistory,
  deleteSearchHistory,
};
