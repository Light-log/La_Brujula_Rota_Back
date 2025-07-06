// routes/propositoRoutes.js

const express = require('express');
const router = express.Router();
const { crearProposito } = require('../controllers/propositoController');

router.post('/', crearProposito);

module.exports = router;
