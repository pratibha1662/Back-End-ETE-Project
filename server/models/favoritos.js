const { Schema, model } = require('mongoose');

const FavoritosSchema = Schema({
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
    }
});


FavoritosSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Favoritos', FavoritosSchema );
