import { createSlice } from '@reduxjs/toolkit'
import productosAPI from '../../../api/productos'
import { logout } from '../usuario'

const initialState = {
	carrito: [],
	total_dinero: 0,
	cantidad: 0,
	envio: 0,
	status: 'checking'
}

export const carritoSlice = createSlice({
	name: 'carrito',
	initialState: initialState,
	reducers: {
		addProduct: (state, action) => {
			let find = null
			state.carrito.forEach(producto => {
				if(producto._id === action.payload.producto._id){
					if(action.payload.cantidad !== 1)
						producto.cantidad = action.payload.cantidad
					else
						producto.cantidad++

					find = 1
				}
				return producto
			})
			if (!find) {
				state.carrito = [...(state.carrito || []), {...action.payload.producto, cantidad: action.payload.cantidad}]
			}
			state.status = 'checked'
		},
		delProduct: (state, action) => {
			state.carrito = state.carrito.map(producto => {
				if(producto._id === action.payload.producto._id){
					producto.cantidad = producto.cantidad - action.payload.cantidad
					if(!producto.cantidad) producto = {}
				}
				return producto
			}).filter(prod => prod._id)
			state.status = 'checked'
		},
		removeProduct: (state, action) => {
			state.carrito = state.carrito.filter(producto => producto._id !== action.payload._id)
			state.status = 'checked'
		},
		calcularDinero: (state) => {
			state.total_dinero = state.carrito?.map(producto => (producto.precio * producto.cantidad) ).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
		},
		calcularCantidad: (state) => {
			state.cantidad = state.carrito?.map(producto => producto.cantidad).reduce((a, b) => parseInt(a) + parseInt(b), 0)
		},
		asignarEnvio: (state, action) => {
			state.envio = action.payload
		},
		asignarCarrito: (state, action) => {
			state.carrito = action.payload?.carrito
			state.status = 'checked'
		},
		restartCarrito: (state) => {
			const { status, carrito, cantidad, total_dinero, envio } = initialState
			state.status = status
			state.carrito = carrito
			state.cantidad = cantidad
			state.total_dinero = total_dinero
			state.envio = envio
		}
	}
})

export const { addProduct, delProduct, calcularDinero, calcularCantidad, removeProduct, asignarEnvio, asignarCarrito, restartCarrito } = carritoSlice.actions

export const saveCarritoDB = (carrito) => async (dispatch) => {

	const token = localStorage.getItem('token')
	if(!token) return dispatch(logout())

	await productosAPI.post('/carrito/save', {
		carrito
	} , {
		headers: {
			'x-token' : token,
			'Content-Type': 'application/json',
		},
	})

}

export const restoreCarritoDB = () => async (dispatch) => {

	const token = localStorage.getItem('token')
	if(!token) return dispatch(logout())

	const data = await productosAPI.get('/carrito', {
		headers: {
			'x-token' : token,
		},
	})

	dispatch(asignarCarrito(data.data))

}

export default carritoSlice.reducer