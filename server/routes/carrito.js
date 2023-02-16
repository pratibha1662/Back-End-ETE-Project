const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT } = require('../middlewares');


const { obtenerCarrito, guardarCarrito } = require('../controllers/carrito');
const { existeUsuarioPorId } = require('../helpers');


const router = Router();

router.post('/save',[
    validarJWT,
    validarCampos
],guardarCarrito );

router.get('/',[
    validarJWT
], obtenerCarrito );



module.exports = router;