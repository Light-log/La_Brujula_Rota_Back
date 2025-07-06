const express = require('express');
const router = express.Router();
const { crearProposito, obtenerPropositos } = require('../controllers/propositoController');

router.post('/', crearProposito);
router.get('/', obtenerPropositos);

module.exports = router;
