const { response } = require('express');
const { Favoritos, Producto } = require('../models');

const obtenerFavoritos = async(req, res = response ) => {

    const { id } = req.usuario;

    const [ total, favoritos ] = await Promise.all([
        Favoritos.countDocuments(),
        Favoritos.find({ usuario: id })
        .populate('producto', ['nombre','stock','categoria', 'descripcion', 'precio', 'img', '_id'])
    ]);

    resFavoritos = favoritos.map(({producto}) => {
        const { precio, stock, nombre, descripcion, img, categoria, _id } = producto
        return {
            precio,
            stock,
            nombre,
            descripcion,
            img,
            categoria,
            _id
        }
    })

    res.json({
        total,
        favoritos: resFavoritos
    });
}

const guardarFavorito = async(req, res = response ) => {

    const usuario = req.usuario._id
    const { producto }  = req.body;

    const productoDB = await Producto.findOne({ _id: producto._id });

    if ( !productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ producto.nombre } no existe`
        });
    }

    // Generar la data a guardar
    const data = {
        usuario,
        producto,
    }

    const favorito = new Favoritos( data );

    // Guardar DB
    const nuevoFavorito = await favorito.save();
    res.status(201).json( nuevoFavorito );

}

const deleteFavorito = async(req, res = response ) => {

    const usuario = req.usuario._id
    const { id }  = req.params;

    const productoDB = await Favoritos.findOne({ producto: id, usuario });

    if ( !productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ id } no existe en los favoritos del usuario`
        });
    }

    // Guardar DB
    await productoDB.delete();
    res.status(201).json( id );

}


module.exports = {
    obtenerFavoritos,
    deleteFavorito,
    guardarFavorito
}