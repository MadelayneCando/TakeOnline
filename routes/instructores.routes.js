const { Router } = require('express');
const router = new Router();

//trae metodos del controlador
var { getInstructores, createInstructores, updateInstructores, getInstructor, deleteInstructor } = require('../controllers/instructores.controllers');

//Rutas endpoint
router.get('/listInstrucSecr', getInstructores);
router.post('/createInstrucSecr', createInstructores);
router.put('/updateInstrucSecr', updateInstructores);
router.get('/listi/:id', getInstructor);
router.delete('/deleteInstrucSecrec/:cedula', deleteInstructor);

module.exports = router;