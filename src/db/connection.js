const Sequelize = require("sequelize");

const db = new Sequelize("getbetter", "root", "walangkecek123", {
  dialect: "mysql",
  host: '/cloudsql/api-tes-388313:asia-southeast1:getbettermysql',
  timestamps: false,
  dialectOptions: {
    socketPath: '/cloudsql/api-tes-388313:asia-southeast1:getbettermysql'
},
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


