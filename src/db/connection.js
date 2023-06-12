const Sequelize = require("sequelize");

const db = new Sequelize(
  "getbetter",
  "root",
  process.env.NODE_ENV === "production" ? process.env.DB_PASSWORD : "",
  {
    dialect: "mysql",
    host:
      process.env.NODE_ENV === "production" ? process.env.DB_HOST : "localhost",
    timestamps: process.env.NODE_ENV === "production" ? false : null,
    dialectOptions: {
      socketPath:
        process.env.NODE_ENV === "production" ? process.env.DB_SOCKET_PATH : "",
    },
  }
);

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
