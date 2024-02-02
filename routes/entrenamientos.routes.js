const { Router } = require('express');
const router = new Router();

var { getEntrenamientos }= require('../controllers/entrenamiento.controllers');

router.get('/listEntrenaSecret', getEntrenamientos); 


module.exports = router;