const { Router } = require('express');
const router = new Router();

var { recuperarClave, cambioClave }= require('./../controllers/recuperacion.controllers');

router.post('/validateRecupSc', recuperarClave);
router.post('/changeClavSc', cambioClave);

module.exports = router;