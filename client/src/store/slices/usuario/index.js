import { createSlice } from '@reduxjs/toolkit'
import productosAPI from '../../../api/productos'
import { restartCarrito } from '../carrito'

const stateUser = {
	0: 'checking',
	1: 'authenticated',
	2: 'not-authenticated',
	3: 'checked'
}

const initialState = {
	status: stateUser[0],
	token: null,
	errorMessage: '',
	user: null,
}

export const usuarioSlice = createSlice({
	name: 'usuario',
	initialState: initialState,
	reducers: {
		login: (state, action) => {
			state.token = action.payload.token
			state.user = action.payload.user
			state.status = stateUser[1]
			state.errorMessage = ''
		},
		addError: (state, action) => {
			state.errorMessage = action.payload
		},
		logout: (state) => {
			localStorage.removeItem('token')
			state.status = stateUser[2]
			state.token = null,
			state.errorMessage = '',
			state.user = null
		}
	}
})

export const { login, addError, logout } = usuarioSlice.actions

export const signIn = (correo, password) => async (dispatch) => {
	try {
		const resp = await productosAPI.post('/auth/login', {correo, password})
		const { token, usuario } = resp.data
		dispatch(login({token, user: usuario}))
		localStorage.setItem('token', token)
		localStorage.removeItem('carrito')
		return false

	} catch (error) {
		dispatch(addError(error.response.data.msg || 'Informacion incorrecta'))
		return error.response.data.msg
	}
}

export const signUp = ({name, email, password, apellido, telefono, pais, ciudad, address, img=null}) => async (dispatch) => {

	//SUBO LA IMAGEN
	const formData = new FormData()
	formData.append('archivo', img)
	let uploadImg = null

	try {

		if(img){
			const respImg = await productosAPI.post('/uploads', formData)
			uploadImg = await respImg.data
		}

		const resp = await productosAPI.post('/usuarios', {nombre: name, correo: email, password, apellido, telefono, pais, ciudad, direccion:address, img: uploadImg})
		const { token, usuario } = resp.data
		dispatch(login({token, user: usuario}))
		localStorage.setItem('token', token)

	} catch (error) {
		dispatch(addError(error.response.data.msg || 'Informacion incorrecta'))
	}
}

export const updateUser = ({name, email, password, apellido, telefono, pais, ciudad, address, img=null, id}) => async (dispatch) => {

	//SUBO LA IMAGEN
	const formData = new FormData()
	formData.append('archivo', img)
	let uploadImg = null

	try {

		if(img){
			const respImg = await productosAPI.put(`/uploads/usuarios/${id}`, formData)
			uploadImg = await respImg.data
		}

		const resp = await productosAPI.put(`/usuarios/${id}`, {nombre: name, correo: email, password, apellido, telefono, pais, ciudad, direccion:address, img: uploadImg})
		const { token, usuario } = await resp.data
		dispatch(login({token, user: usuario}))
		localStorage.setItem('token', token)

	} catch (error) {
		dispatch(addError(error.response.data.msg || 'Informacion incorrecta'))
	}

}

export const checkToken = () => async (dispatch) => {
	const token = localStorage.getItem('token')
	if(!token) return dispatch(handleLogout())

	const resp = await productosAPI.get('/auth', {
		headers:{
			'x-token': token,
		}
	})
	if (resp.status !== 200) return dispatch(handleLogout())

	localStorage.setItem('token', resp.data.token)
	dispatch(login({token: resp.data.token, user: resp.data.usuario}))
	localStorage.removeItem('carrito')
}

export const handleLogout = () => (dispatch) => {
	dispatch(logout())
	dispatch(restartCarrito())
}

export default usuarioSlice.reducer