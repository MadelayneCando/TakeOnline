const { Router } = require('express');
const router = new Router();

//trae metodos del controlador
var { createUsuarios, getUsuarios, updateUsuario, getUsuario, deleteUsuario, validarCorreo, cambiaUsuario } = require('../controllers/usuario.controllers');


//Rutas endpoint
router.post('/registerUserSt', createUsuarios);
router.get('/listUsersSt', getUsuarios);
router.get('/list/:id', getUsuario);
router.put('/updateUserSt', updateUsuario);
router.put('/changeUserSt', cambiaUsuario);
router.delete('/delete/:id', deleteUsuario);
router.post('/validateEmailSt', validarCorreo);


module.exports = router;