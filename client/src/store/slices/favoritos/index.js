import { createSlice } from '@reduxjs/toolkit'
import productosAPI from '../../../api/productos'
import { logout } from '../usuario'

export const favoritosSlice = createSlice({
	name: 'favoritos',
	initialState: {
		favoritos: [],
		favoritosIDs: [],
		status: 'checking'
	},
	reducers: {
		setFavoritos: (state, action) => {
			state.favoritos = action.payload
			state.favoritosIDs = action.payload.map(prod => prod._id)
			state.status = 'checked'
		},
		addFavorito: (state, action) => {
			state.favoritos = [...(state.favoritos || []), {...action.payload}]
			state.favoritosIDs =  [...(state.favoritosIDs || []), action.payload._id]
		},
		delFavorito: (state, action) => {
			state.favoritos = state.favoritos.filter(prod => prod._id !== action.payload._id)
			state.favoritosIDs = state.favoritosIDs.filter(id => id !== action.payload._id)
		}
	}
})

export const { addFavorito, setFavoritos, delFavorito } = favoritosSlice.actions

export const fetchAllFavoritos = () => async (dispatch) => {

	const token = localStorage.getItem('token')
	if(!token) return dispatch(logout())

	const data = await productosAPI.get('/favoritos', {
		headers: {
			'x-token' : token
		}
	})
	const favoritos = data.data.favoritos
	dispatch(setFavoritos(favoritos))
}

export const saveFavoritoDB = (producto) => async (dispatch) => {

	const token = localStorage.getItem('token')
	if(!token) return dispatch(logout())

	await productosAPI.post('/favoritos/save', {
		producto
	} , {
		headers: {
			'x-token' : token,
			'Content-Type': 'application/json',
		},
	})

}

export const delFavoritoDB = (producto) => async (dispatch) => {

	const token = localStorage.getItem('token')
	if(!token) return dispatch(logout())

	await productosAPI.delete(`/favoritos/${producto._id}`, {
		headers: {
			'x-token' : token,
		},
	})

}

export default favoritosSlice.reducer