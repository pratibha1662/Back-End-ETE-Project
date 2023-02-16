import { useState } from 'react'
import { useSelector } from 'react-redux'
import productosAPI from '../api/productos'
import useCarrito from '../hooks/useCarrito'
import ShoppingCart from './ShoppingCart'

const CheckoutEnd = ({paymentID, idDB, setBuySuccess, form}) => {

	const [loadingPayment, setLoadingPayment] = useState(false)
	const { total_dinero, envio, carrito } = useSelector(({carrito}) => carrito)
	const { status } = useSelector(({usuario}) => usuario)
	const { vaciarCarrito } = useCarrito()

	const handleEndPayment = async () => {

		setLoadingPayment(true)

		//si tengo paymentID y idDB confirmo el pago de stripe, sino guardo el pago como efectivo
		if(paymentID && idDB){
			try {
				const token = localStorage.getItem('token')
				const id = paymentID
				const { data } = await productosAPI.post('/pagos/confirm', {
					id,
					amount: total_dinero.toString().replace('.','') * 100,
					idDB
				}, {
					headers:{
						'x-token': token,
					}
				})

				//SALIO BIEN
				if(data.status === 'succeeded'){
					setBuySuccess(true)
					vaciarCarrito()
				}
			} catch (error) {
				setBuySuccess(false)
			}
		}
		else{

			let newProds = []
			carrito.forEach(({_id, cantidad}) => {
				for (let index = 0; index < cantidad; index++) {
					newProds.push(_id)
				}
			})

			const token = localStorage.getItem('token')

			if(status === 'authenticated'){
				const { data } = await productosAPI.post('/pagos/checkoutEfectivo', {
					productos: newProds,
					envio,
					metodo: 'efectivo',
					amount: total_dinero.toString().replace('.','') * 100,
				}, {
					headers:{
						'x-token': token,
					}
				})

				//SALIO BIEN
				if(data.status === 'succeeded'){
					setBuySuccess(true)
					vaciarCarrito()
				}
			}
			else{
				const { data } = await productosAPI.post('/pagos/checkoutInvEfectivo', {
					productos: newProds,
					envio,
					metodo: 'efectivo',
					amount: total_dinero.toString().replace('.','') * 100,
					invitado: form
				})

				//SALIO BIEN
				if(data.status === 'succeeded'){
					setBuySuccess(true)
					vaciarCarrito()
				}
			}
		}


		setLoadingPayment(false)
	}

	return (
		<>
			<br></br>
			{
				loadingPayment ?
					<div className="row">
						<div  style={{textAlign: 'center'}} className="col-12">
							<div className="spinner-border text-warning" role="status">
								<span className="sr-only">Loading...</span>
							</div></div></div> :
					<ShoppingCart end={true} endAction={handleEndPayment} />
			}
		</>
	)
}

export default CheckoutEnd
