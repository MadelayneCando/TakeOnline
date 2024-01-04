const { Router } = require('express');
const router = new Router();

//trae metodos del controlador
var { getInstructores, createInstructores, updateInstructores, getInstructor, deleteInstructor } = require('../controllers/instructores.controllers');

//Rutas endpoint
router.get('/listarins', getInstructores);
router.post('/crearins', createInstructores);
router.put('/actualizari', updateInstructores);
router.get('/listi/:id', getInstructor);
router.delete('/deleteins/:cedula', deleteInstructor);
module.exports = router;