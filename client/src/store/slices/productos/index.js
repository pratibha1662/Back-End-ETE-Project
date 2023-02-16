import { createSlice } from '@reduxjs/toolkit'
import productosAPI from '../../../api/productos'

export const productosSlice = createSlice({
	name: 'productos',
	initialState: {
		productos: [],
		trendings: [],
		total: 0,
		productoActual: null,
		status: 'checking'
	},
	reducers: {
		setProducts: (state, action) => {
			state.productos = action.payload.productos
			state.total = action.payload.total
			state.status = 'checked'
		},
		setTrendingProducts: (state, action) => {
			state.trendings = action.payload
			state.status = 'checked'
		},
		delStock: (state, action) => {
			state.productos = state.productos.map(producto => { if(producto._id === action.payload._id) producto.stock--;return producto})
			state.status = 'checked'
		},
		addStock: (state, action) => {
			state.productos = state.productos.map(producto => { if(producto._id === action.payload.producto._id) {producto.stock=producto.stock+action.payload.cantidad; if(!producto.cantidad)producto.cantidad = 1}return producto})
			state.status = 'checked'
		},
		setProduct: (state, action) => {
			state.productoActual = action.payload
			state.status = 'checked'
		},
		setStatus: (state, action) => {
			state.status = action.payload
		},
	}
})

export const { addStock, delStock, setProducts, setTrendingProducts, setProduct, setStatus } = productosSlice.actions

export const fetchAllProducts = () => async (dispatch) => {
	const productosRes = await productosAPI.get('/productos?limite=10')
	const { total, productos } = productosRes.data
	const res = productos.map(prod => {prod.cantidad = 1; return prod})
	dispatch(setProducts({total, productos: res}))
}

export const fetchTrendingProducts = () => async (dispatch) => {
	const productosRes = await productosAPI.get('/productos/trending')
	const { resp: productos } = productosRes.data
	dispatch(setTrendingProducts(productos))
}

export const fetchProduct = (id) => async (dispatch) => {
	const resp = await productosAPI.get(`/productos/${id}`)
	const producto = resp.data
	dispatch(setProduct(producto))
}

export const fetchProductsByCategoria = (categoria) => async (dispatch) => {
	const productosRes = await productosAPI.get(`/productos/categoria/${categoria}`)
	const { total, productos } = productosRes.data
	const res = productos.map(prod => {prod.cantidad = 1; return prod})
	dispatch(setProducts({total, productos: res}))
}

export const handleSetProduct = (producto) => async (dispatch) => {
	dispatch(setProduct(producto))
}

export default productosSlice.reducer