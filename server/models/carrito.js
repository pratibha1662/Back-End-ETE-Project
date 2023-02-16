const { Schema, model } = require('mongoose');

const CarritoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        unique: true,
        required: true
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
    }
});


CarritoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Carrito', CarritoSchema );
