import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import productosAPI from '../api/productos'
import { stripePromise } from '../services/stripe'

const CheckoutForm = ({setAvailable, handleActiveTab, handlePaymentID, setIdDB}) => {

	const stripe = useStripe()
	const elements = useElements()
	const [loadingPayment, setLoadingPayment] = useState(false)
	const { total_dinero, carrito, envio } = useSelector(({carrito}) => carrito)


	const handleSubmit = async (e) => {
		e.preventDefault()

		setLoadingPayment(true)
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement)
		})

		if(!error){

			handleActiveTab(e, 'end')

			try {
				const token = localStorage.getItem('token')
				const { id } = paymentMethod

				let newProds = []
				carrito.forEach(({_id, cantidad}) => {
					for (let index = 0; index < cantidad; index++) {
						newProds.push(_id)
					}
				})

				const { data } = await productosAPI.post('/pagos/checkout', {
					id,
					amount: total_dinero.toString().replace('.','') * 100,
					productos: newProds,
					envio,
					metodo: 'tarjeta',
				}, {
					headers:{
						'x-token': token,
					}
				})

				//SALIO BIEN
				if(data.status === 'requires_confirmation'){
					handlePaymentID(data.id)
					setIdDB(data.idDB)
					setAvailable(prev => {
						return {...prev, 'end': true}
					})
					handleActiveTab(e, 'end')
				}
			} catch (error) {
				console.log(error)
				handlePaymentID(null)
			}

		}

		setLoadingPayment(false)
	}

	return (
		<div className='container'>
			<div className="row">
				<div className="col-12">
					<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-12">
								<div className='form-group'>
									<br></br>
									<CardElement className='form-control'/>
									<br></br>
								</div>
							</div>
						</div>
						<div className="row">
							<div  style={{textAlign: 'center'}} className="col-12">
								<br></br>
								{
									loadingPayment ?
										<div className="spinner-border text-warning" role="status">
											<span className="sr-only">Loading...</span>
										</div> :
										<div className='form-group'>
											<button style={{width: '100%'}} className="btnn" value="search" type="submit">Comprobar Pago</button>
										</div>
								}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

const CardData = ({setAvailable, handleActiveTab, handlePaymentID, setCardElement, setIdDB}) => {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm  setAvailable={setAvailable}  handleActiveTab={handleActiveTab} handlePaymentID={handlePaymentID} setCardElement={setCardElement} setIdDB={setIdDB} />
		</Elements>
	)
}

export default CardData
