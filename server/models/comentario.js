const { Schema, model } = require('mongoose');

const ComentarioSchema = Schema({
    comentario: {
        type: String,
        required: [true, 'El comentario es obligatorio'],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    invitadoNombre: {
        type: String,
        default: null
    },
    invitadoCorreo: {
        type: String,
        default: null
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
},
{
    timestamps: true
});


ComentarioSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Comentario', ComentarioSchema );
