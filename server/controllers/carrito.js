const { response } = require('express');
const { Carrito, Producto } = require('../models');


const obtenerCarrito = async(req, res = response ) => {

    const { id } = req.usuario;

    const [ total, carrito ] = await Promise.all([
        Carrito.countDocuments(),
        Carrito.find({ usuario: id })
        .populate('producto', ['nombre','stock','categoria', 'descripcion', 'precio', 'img', '_id'])
    ]);

    resCarrito = carrito.map(({producto, cantidad}) => {
        const { precio, stock, nombre, descripcion, img, categoria, _id } = producto
        return {
            precio,
            stock,
            nombre,
            descripcion,
            img,
            categoria,
            _id,
            cantidad
        }
    })

    res.json({
        total,
        carrito: resCarrito
    });
}

const guardarCarrito = async(req, res = response ) => {

    const usuario = req.usuario._id
    const { carrito }  = req.body;
    const { action, cantidad, producto} = carrito

    const resp = await Carrito.findOne({ producto: producto._id, usuario }, async (err, doc) => {
        if(doc){
            if(action === 'add'){
                if(cantidad === 1)
                    doc.cantidad = doc.cantidad + cantidad;
                else{
                    doc.cantidad = cantidad
                }
            }
            if(action === 'minus'){
                if(doc.cantidad === 1 || doc.cantidad === cantidad) doc.delete()
                else{
                    doc.cantidad = doc.cantidad - cantidad
                }
            }
            doc.save();
        }else{
            if(action === 'add'){
                const data = {usuario, producto: producto._id, cantidad}
                const carro = new Carrito( data );
                await carro.save();
            }
        }
    });

    res.status(200).json({
        msg: resp
    })

}


module.exports = {
    obtenerCarrito,
    guardarCarrito
}