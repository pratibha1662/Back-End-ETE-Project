const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT } = require('../middlewares');


const { obtenerFavoritos, guardarFavorito, deleteFavorito } = require('../controllers/favoritos');


const router = Router();

router.post('/save',[
    validarJWT,
    validarCampos
],guardarFavorito );

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
],deleteFavorito);

router.get('/',[
    validarJWT
], obtenerFavoritos );



module.exports = router;