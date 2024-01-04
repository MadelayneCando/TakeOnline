const { Router } = require('express');
const router = new Router();

var { getEntrenamientos }= require('../controllers/entrenamiento.controllers');

router.get('/listarEntrenamientos', getEntrenamientos); 


module.exports = router;