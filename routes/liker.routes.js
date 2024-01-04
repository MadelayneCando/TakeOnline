const { Router } = require('express');
const router = new Router();

var { createLiker  } = require('../controllers/liker.controllers');

//Rutas endpoint
router.post('/registropuntuacion', createLiker);

module.exports = router;