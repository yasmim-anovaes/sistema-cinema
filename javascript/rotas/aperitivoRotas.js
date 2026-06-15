const express = require('express');
const router = express.Router();
const controller = require('../controllers/aperitivosController');

router.get('/',controller.listarAperitivos);

module.exports = router;