const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const { obtenerComentariosProducto, crearComentario,borrarComentario } = require('../controllers/comentarios');
const { existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener comentarios por id de producto - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerComentariosProducto );

// Crear comentario
router.post('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('comentario','El comentario es obligatorio!!').not().isEmpty(),
    validarCampos
], crearComentario );

// Borrar un comentario
router.delete('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
],borrarComentario);



module.exports = router;