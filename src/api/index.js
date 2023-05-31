const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - Learn GCP App Engine",
  });
});

module.exports = router;
