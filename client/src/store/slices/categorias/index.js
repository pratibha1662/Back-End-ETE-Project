import { createSlice } from '@reduxjs/toolkit'
import productosAPI from '../../../api/productos'

export const categoriasSlice = createSlice({
	name: 'categorias',
	initialState: {
		categorias: [],
		total: 0
	},
	reducers: {
		setCategorias: (state, action) => {
			state.categorias = action.payload.categorias
			state.total = action.payload.total
		}
	}
})

export const { setCategorias } = categoriasSlice.actions

export const fetchAllCategories = () => async (dispatch) => {
	const data = await productosAPI.get('/categorias')
	const categorias = data.data
	dispatch(setCategorias(categorias))
}

export default categoriasSlice.reducer