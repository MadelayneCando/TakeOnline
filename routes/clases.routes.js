const { Router } = require('express');
const router = new Router();

var { verificarClase, agregarClase, verUsuarios, obtenerClaseSemanales, createClase, getClases, updateClase, cambiaClase, verUsuariosPorClase }= require('../controllers/clases.controllers');

router.post('/verifyClassSecret', verificarClase);
router.post('/addClassSecret', agregarClase);
router.post('/viewUserSecret', verUsuarios);
router.post('/createClassSecret', createClase);
router.post('/UserClassSecret', verUsuariosPorClase);
router.put('/updateClassSect', updateClase);
router.get('/getClassSecretSemal', obtenerClaseSemanales);
router.get('/getClassSecret', getClases);
router.put('/changeClassSecret', cambiaClase);

module.exports = router;  