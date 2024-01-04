const { Router } = require('express');
const router = new Router();

//trae metodos del controlador
var { createUsuarios, getUsuarios, updateUsuario, getUsuario, deleteUsuario, validarCorreo, cambiaUsuario } = require('../controllers/usuario.controllers');


//Rutas endpoint
router.post('/register', createUsuarios);
router.get('/list', getUsuarios);
router.get('/list/:id', getUsuario);
router.put('/actualizar', updateUsuario);
router.put('/cambiarUsuario', cambiaUsuario);
router.delete('/delete/:id', deleteUsuario);
router.post('/validarcorreo', validarCorreo);


module.exports = router;