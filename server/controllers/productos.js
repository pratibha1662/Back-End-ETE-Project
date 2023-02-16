const { response } = require('express');
const { Producto, Categoria } = require('../models');
const updateIndexAlgolia = require('../helpers/sendProductsToAlgolia')


const obtenerProductos = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(),
        Producto.find()
            .populate('categoria', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProductosTrending = async(req, res = response ) => {

    const { limite = 4, desde = 0 } = req.query;

    const [ categorias ] = await Promise.all([
        Categoria.find()
            .skip( Number( desde ) )
    ]);

    let resp  = await Promise.all(
        categorias.map(async ({_id}) => {
            let query = { categoria: _id };
            let productos = await Producto.find(query)
                    .populate('categoria', 'nombre')
                    .skip( Number( desde ) )
                    .limit(Number( limite ));
            return productos
        })
    );

    res.json({
        resp
    });
}

const obtenerProducto = async(req, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json( producto );

}

const obtenerProductosByCategoria = async (req, res = response ) => {

    const { id } = req.params;

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(),
        Producto.find({ categoria: id})
            .populate('categoria', 'nombre')
            .sort({nombre: 'asc'})
    ]);

    res.json({
        total,
        productos
    });
}

const crearProducto = async(req, res = response ) => {

    const { estado, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const producto = new Producto( data );

    // Guardar DB
    const nuevoProducto = await producto.save();
    await nuevoProducto
        .populate('categoria', 'nombre')
        .execPopulate();

    //ACTUALIZO INDICE DE ALGOLIA SEARCH
    updateIndexAlgolia()

    res.status(201).json( nuevoProducto );

}

const actualizarProducto = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ) {
        data.nombre  = data.nombre.toUpperCase();
    }

    if( data.descripcion ) {
        data.descripcion  = data.descripcion;
    }

    if( data.precio ) {
        data.precio  = data.precio;
    }

    if( data.stock ) {
        data.stock  = data.stock;
    }

    const producto = await Producto.findByIdAndUpdate(id, data);

    producto.precio = data.precio
    producto.nombre = data.nombre
    producto.descripcion = data.descripcion
    producto.stock = data.stock
    producto.categoria = data.categoria

    //ACTUALIZO INDICE DE ALGOLIA SEARCH
    updateIndexAlgolia()

    await producto
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .execPopulate();

    res.json( producto );

}

const borrarProducto = async(req, res = response ) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( productoBorrado );
}




module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
    obtenerProductosTrending,
    obtenerProductosByCategoria
}