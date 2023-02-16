import { createSlice } from '@reduxjs/toolkit'
import productosAPI from '../../../api/productos'

export const comentariosSlice = createSlice({
	name: 'comentarios',
	initialState: {
		comentarios: [],
	},
	reducers: {
		setComentarios: (state, action) => {
			state.comentarios = action.payload
		},
		addComentario: (state, action) => {
			state.comentarios = [...(state.comentarios || []), {...action.payload}]
		},
		delcomentario: (state, action) => {
			state.comentarios = state.comentarios.filter(coments => coments._id !== action.payload._id)
		}
	}
})

export const { setComentarios, addComentario, delcomentario } = comentariosSlice.actions

export const fetchCommentsProduct = (id) => async (dispatch) => {

	dispatch(setComentarios([]))
	const data = await productosAPI.get(`/comentarios/${id}`)
	const comentarios = data.data.comentarios
	let newComentarios = []
	newComentarios = comentarios.map(coment => {
		if(coment.usuario === null){
			coment.usuario = {
				nombre: coment.invitadoNombre,
				correo: coment.invitadoCorreo,
				img: null
			}
		}
		return coment
	})

	dispatch(setComentarios(newComentarios))
}

export const saveComentarioDB = (producto, comentario, usuario=null, invitadoNombre=null, invitadoCorreo=null, callback) => async (dispatch) => {

	await productosAPI.post(`/comentarios/${producto}`, {
		producto,
		comentario,
		usuario,
		invitado: {
			nombre: invitadoNombre,
			correo: invitadoCorreo
		}
	})


	dispatch(fetchCommentsProduct(producto))
	callback(false)

}

export const delComentarioDB = (id) => async (dispatch) => {

	await productosAPI.delete(`/comentarios/${id}`)
	dispatch(fetchCommentsProduct())
}

export default comentariosSlice.reducer