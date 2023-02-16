import { configureStore } from '@reduxjs/toolkit'
import categorias from './slices/categorias'
import carrito from './slices/carrito'
import comentarios from './slices/comentarios'
import favoritos from './slices/favoritos'
import productos from './slices/productos'
import usuario from './slices/usuario'

export default configureStore({
	reducer:{
		carrito,
		categorias,
		favoritos,
		productos,
		usuario,
		comentarios
	}
})