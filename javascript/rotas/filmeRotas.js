const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const filmeController = require('../controllers/filmeController'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', upload.single('imagem'), filmeController.cadastrarFilme);

module.exports = router;