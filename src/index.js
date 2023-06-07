const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const router = require("./routes/index.js");
const middlewares = require("./middlewares");

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res
    .json({
      message: "Learn GCP App Engine",
    })
    .status(200);
});

app.use("/api/v1", router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Listening on port: ${port}`);
});
