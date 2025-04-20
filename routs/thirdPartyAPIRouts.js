const express = require("express");
const router = express.Router();
const ThirdPartyAPIController = require("../controllers/ThirdPartyAPIController");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
});

const upload = multer({ storage });

router.post(
  "/tp-api/audio-to-text",
  upload.single("audio"),
  ThirdPartyAPIController.audioToText
);

module.exports = router;
