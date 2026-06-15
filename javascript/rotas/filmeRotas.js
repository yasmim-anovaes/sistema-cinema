const express = require('express');
const router = express.Router();
const controller = require('../controllers/filmeController');

router.get('/',controller.listar);

module.exports = router;