const Sequelize = require("sequelize");

const db = new Sequelize("getbetter", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
};

connectDB();

module.exports = db;
