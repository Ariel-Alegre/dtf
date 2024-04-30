
const { Router }= require('express');
const router = Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: "dz0lruj7k",
  api_key: "128323134832632",
  api_secret: "04JixT8UcmHYY-QfbwSTBzT-L7I",
});

router.post("/upload", upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await cloudinary.uploader.upload(file.path);
  res.json({ url: result.secure_url });
});

module.exports = router

