const { Router } = require('express');
const router = new Router();

var { recuperarClave, cambioClave }= require('./../controllers/recuperacion.controllers');

router.post('/validarRecuperacion', recuperarClave);
router.post('/cambioClave', cambioClave);

module.exports = router;