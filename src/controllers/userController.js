const Users = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["user_id", "name", "user_name", "email"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ where: { user_id: id } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.destroy({ where: { user_id: id } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Register = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.create({
      name,
      user_name: username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const user_id = user.user_id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign(
      { user_id, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2m",
      }
    );
    const refreshToken = jwt.sign(
      { user_id, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refreshToken },
      {
        where: {
          user_id: user_id,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login Successful", accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh Token not found" });
    }
    await Users.update(
      { refreshToken: null },
      {
        where: {
          refreshToken: refreshToken,
        },
      }
    );
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUserPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password required in request body" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          user_id: req.params.id,
        },
      }
    );
    res.status(201).json({ message: "User Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUserProfile = async (req, res) => {
  try {
    const { name, email, username, phone, tempat_lahir, tgl_lahir } = req.body;
    if (!name && !email && !username && !phone && !tempat_lahir && !tgl_lahir) {
      return res.status(400).json({
        message:
          "Either name, email, username, phone, tempat_lahir, or tgl_lahir is required in the request body",
      });
    }
    const user = await Users.update(
      {
        name: name,
        email: email,
        user_name: username,
        phone: phone,
        tempat_lahir: tempat_lahir,
        tgl_lahir: tgl_lahir && new Date(tgl_lahir).toISOString(),
      },
      {
        where: {
          user_id: req.params.id,
        },
      }
    );

    const updatedUser = await Users.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    res
      .status(201)
      .json({ message: "User Profile changed successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getLoggedUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(400).json({ message: "User not logged in" });
    const user = await Users.findOne({ where: { refreshToken } });
    if (!user)
      return res
        .status(403)
        .json({ message: "Forbidden | User not logged in" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  Login,
  Register,
  getUsers,
  getUserById,
  Logout,
  editUserPassword,
  editUserProfile,
  deleteUser,
  getLoggedUser,
};
