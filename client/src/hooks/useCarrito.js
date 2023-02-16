import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delProduct, addProduct, calcularDinero, calcularCantidad, removeProduct, asignarEnvio, asignarCarrito, saveCarritoDB, restoreCarritoDB } from '../store/slices/carrito'
import useAlgoliaInsights from '../hooks/useAlgoliaInsights'
import { toast } from 'react-toastify'

const useCarrito = () => {

	const dispatch = useDispatch()
	const totalCarrito = useSelector(state => state.carrito)
	const { carrito, cantidad, total_dinero, status } = totalCarrito
	const usuario = useSelector(state => state.usuario)
	const { sendProductAddedToCart } = useAlgoliaInsights()

	useEffect(() => {
		if(usuario.status === 'not-authenticated' && localStorage.getItem('carrito')){
			dispatch(asignarCarrito(JSON.parse(localStorage.getItem('carrito'))))
		}
		if(usuario.status === 'authenticated'){
			if(localStorage.getItem('carrito')){
				dispatch(asignarCarrito(JSON.parse(localStorage.getItem('carrito'))))
				const carroLS = JSON.parse(localStorage.getItem('carrito'))
				carroLS.carrito.forEach(producto => dispatch(saveCarritoDB({producto, cantidad: producto.cantidad, action: 'add'})))
			}
			else
				dispatch(restoreCarritoDB())
		}
	}, [usuario.status])

	useEffect(() => {
		dispatch(calcularCantidad())
		dispatch(calcularDinero())
		if(usuario.status === 'not-authenticated' && status === 'checked'){
			localStorage.setItem('carrito', JSON.stringify(totalCarrito))
		}
	}, [carrito])

	useEffect(() => {
		if(usuario.status === 'not-authenticated' && status === 'checked'){
			localStorage.setItem('carrito', JSON.stringify(totalCarrito))
		}
	}, [cantidad, total_dinero])

	const substractCarrito = (e, producto) => {
		e.preventDefault()
		dispatch(delProduct({producto, cantidad: 1}))
		if(usuario.status === 'authenticated'){
			dispatch(saveCarritoDB({producto, cantidad: 1, action: 'minus'}))
		}
	}

	const removeProductCarrito = (e, producto) => {
		e.preventDefault()
		dispatch(removeProduct(producto))
		if(usuario.status === 'authenticated'){
			dispatch(saveCarritoDB({producto, cantidad: producto.cantidad, action: 'minus'}))
		}
	}

	const substractCarritoProduct = (e, producto, cantidad = 1) => {
		if(e)	e.preventDefault()
		dispatch(delProduct({producto, cantidad}))
		if(usuario.status === 'authenticated'){
			dispatch(saveCarritoDB({producto, cantidad, action: 'minus'}))
		}
	}

	const vaciarCarrito = () => {
		let cantidad
		carrito.forEach(producto => {
			cantidad = producto.cantidad
			dispatch(delProduct({producto, cantidad}))
			if(usuario.status === 'authenticated'){
				dispatch(saveCarritoDB({producto, cantidad, action: 'minus'}))
			}
		})
	}

	const calcularEnvio = (monto_envio) => {
		dispatch(asignarEnvio(monto_envio))
	}

	const addCarrito = (e, producto, cantidad = 1) =>{
		if(e)	e.preventDefault()
		dispatch(addProduct({producto, cantidad}))
		if(usuario.status === 'authenticated'){
			dispatch(saveCarritoDB({producto, cantidad, action: 'add'}))
		}
		sendProductAddedToCart(producto._id)
		toast('Producto agregado al carrito', {
			position: 'bottom-right',
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
		})
	}

	return {
		dispatch,
		carrito,
		substractCarrito,
		substractCarritoProduct,
		vaciarCarrito,
		removeProductCarrito,
		addCarrito,
		calcularEnvio,
		total_dinero,
		cantidad
	}
}

export default useCarrito
