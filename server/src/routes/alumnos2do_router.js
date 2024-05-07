
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

router.post("/upload", upload.array("image", 2), async (req, res) => {
  try {
    const files = req.files;

    if (files.length !== 2) {
      return res.status(400).json({ error: "Debe subir exactamente 2 imágenes." });
    }

    const urls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      urls.push(result.secure_url);
    }
  console.log(urls)
    res.json({ urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});




router.post('/field', upload.single("image"), async (req, res) => {
  try {
    let image;

    // Verificar si el campo de imagen está presente en la solicitud
    if (req.file) {
      image = req.file;
    } else if (req.body && req.body['image']) {
      // Si el campo no está en req.file, intentar obtenerlo de req.body
      image = { path: req.body['image'] };
    } else {
      console.log("No se encontró el campo de imagen en la solicitud");
      return res.status(400).json({ error: 'No se encontró el campo de imagen en la solicitud' });
    }

    const result = await cloudinary.uploader.upload(image.path);

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error' });
  }
});


module.exports = router

