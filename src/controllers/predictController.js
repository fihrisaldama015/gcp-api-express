const fs = require("fs");
const jpickle = require("jpickle");
// import { readFileSync } from "fs";
// import { fileURLToPath } from "url";

const openPKL = (req, res) => {
  try {
    // const resolvedPath = new URL("./model_data.pkl", import.meta.url);
    const filePath = require.resolve("../data/model_data_2.pkl");
    const binary = fs.readFileSync(filePath, "binary");
    console.log({ filePath, binary });
    const pklData = jpickle.loads(binary);
    console.log({ pklData });
    res.status(200).json({ message: "Success open pkl file" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
    console.log(error);
  }
};

module.exports = { openPKL };
