const { Router } = require('express');
const router = new Router();

//trae metodos del controlador
var { createCreditos, getCreditos, shopCreditos } = require('../controllers/creditos.controllers');

//Rutas endpoint
router.post('/registerc', createCreditos);
router.get('/listc', getCreditos);
router.post('/comprarCreditos', shopCreditos);

module.exports = router;