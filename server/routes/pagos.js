const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT } = require('../middlewares');


const { guardarPago, confirmarPago, guardarPagoEfectivo, guardarPagoEfectivoInvitado, getCompras } = require('../controllers/pagos');


const router = Router();

router.post('/checkout',[
    validarJWT,
    validarCampos
], guardarPago );

router.post('/confirm',[
    validarJWT,
    validarCampos
], confirmarPago );

router.post('/checkoutEfectivo',[
    validarJWT,
    validarCampos
], guardarPagoEfectivo );

router.get('/',[
    validarJWT,
    validarCampos,
],getCompras);

router.post('/checkoutInvEfectivo', guardarPagoEfectivoInvitado );



module.exports = router;