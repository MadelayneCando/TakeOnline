const { Router } = require('express');
const router = new Router();

var { verificarClase, agregarClase, verUsuarios, obtenerClaseSemanales, createClase, getClases, updateClase, cambiaClase, verUsuariosPorClase }= require('../controllers/clases.controllers');

router.post('/verificarClase', verificarClase);
router.post('/agregarClase', agregarClase);
router.post('/verUsuarios', verUsuarios);
router.post('/createClase', createClase);
router.post('/usuarioPorClase', verUsuariosPorClase);
router.put('/updateClase', updateClase);
router.get('/obtenerClase', obtenerClaseSemanales);
router.get('/getClase', getClases);
router.put('/cambiaClase', cambiaClase);

module.exports = router; 