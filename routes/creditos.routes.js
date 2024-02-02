const { Router } = require('express');
const router = new Router();

//trae metodos del controlador
var { createCreditos, getCreditos, shopCreditos } = require('../controllers/creditos.controllers');

//Rutas endpoint
router.post('/registerCreditSecret', createCreditos);
router.get('/listCredistSec', getCreditos);
router.post('/shopCreditSec', shopCreditos);

module.exports = router;