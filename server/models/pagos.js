const { Schema, model } = require('mongoose');

const PagosSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
    }],
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio'],
    },
    envio: {
        type: Number,
    },
    estado: {
        type: String,
        default: 'Incompleta'
    },
    metodo: {
        type: String,
        required: [true, 'El metodo de pago es obligatorio'],
    },
    invitado: [{
        type: String,
    }],
},
{
    timestamps: true
});


PagosSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Pagos', PagosSchema );
