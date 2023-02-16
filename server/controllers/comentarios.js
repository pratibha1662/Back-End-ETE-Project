const { response } = require('express');
const { Comentario, Producto, Usuario } = require('../models');

const obtenerComentariosProducto = async(req, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findById( id )

    if ( !producto ) {
        return res.status(400).json({
            msg: `El producto no existe`
        });
    }

    const [ total, comentarios ] = await Promise.all([
        Comentario.countDocuments(),
        Comentario.find({ producto: id })
            .populate('usuario', ['nombre','img','correo'])
    ]);

    res.json({
        total,
        comentarios
    });
}

const crearComentario = async(req, res = response ) => {

    const comentario = req.body.comentario;
    const usuario = req.body.usuario
    const { id } = req.params;

    const { nombre = null, correo = null } = req.body.invitado

    const producto = await Producto.findById( id )

    if ( !producto ) {
        return res.status(400).json({
            msg: `El producto no existe`
        });
    }

    if(usuario){
        const usuarioDB = await Usuario.findOne({ id_: usuario });
        if ( usuarioDB ) {
            return res.status(400).json({
                msg: `El usuario no existe`
            });
        }
    }

    // Generar la data a guardar
    const data = {
        comentario,
        usuario,
        invitadoNombre: nombre,
        invitadoCorreo: correo,
        producto: id
    }

    const comentarioSave = new Comentario( data );

    // Guardar DB
    await comentarioSave.save();
    res.status(201).json(comentarioSave);

}

const borrarComentario = async(req, res =response ) => {

    const { id } = req.params;
    const comentarioBorrado = await Comentario.findByIdAndDelete( id );

    res.json( comentarioBorrado );
}




module.exports = {
    obtenerComentariosProducto,
    crearComentario,
    borrarComentario
}