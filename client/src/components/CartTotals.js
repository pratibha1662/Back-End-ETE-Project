import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CartTotals = ({setAvailable, handleActiveTab}) => {

	const { total_dinero, envio } = useSelector(({carrito}) => carrito)
	const [tipoPago, setTipoPago] = useState(null)
	const { status } = useSelector(({usuario}) => usuario)

	useEffect(() => {
		if(tipoPago === 1){
			setAvailable(prev => {
				return {...prev, 'card': false, 'end': true}
			})
		}

		if(tipoPago === 2){
			setAvailable(prev => {
				return {...prev, 'card': true, 'end': false}
			})
		}

	}, [tipoPago])

	return (
		<section className="shop checkout section">
			<div className="container">
				<div className="col-lg-12 col-12">
					<div className="order-details">
						<div className="single-widget">
							<h2>TOTALES</h2>
							<div className="content">
								<ul>
									<li>Sub Total<span>{ total_dinero }</span></li>
									<li>(+) Envio<span>{ envio }</span></li>
									<li className="last">Total<span>${ total_dinero + envio }</span></li>
								</ul>
							</div>
						</div>
						<div className="single-widget">
							<h2>Pago</h2>
							<div className="content">
								<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '10px 30px'}}>
									<label className={'checkbox-inline '} htmlFor="1"><input onChange={() => setTipoPago(1)} name="method" id="1" type="radio"/> Efectivo</label>
									{
										status === 'authenticated' && <label className={'checkbox-inline '} htmlFor="2"><input onChange={() => setTipoPago(2)}  name="method" id="2" type="radio"/> Tarjeta Debito/Credito</label>
									}
								</div>
							</div>
						</div>
						<div className="single-widget payement">
							<div className="content">
								{
									status === 'not-authenticated' && <p>Los pagos con tarjeta solo pueden realizarse si posee un usuario</p>
								}
								<img src="/images/payment-method.png" alt="#"/>
							</div>
						</div>
						<div className="single-widget get-button">
							<div className="content">
								<div className="button" style={{backgroundColor: '#333'}}>
									{
										tipoPago === 2 ? <a style={{padding: '13px 32px'}} onClick={(e) => handleActiveTab(e, 'card')} href="#" className="btn">Ingresar datos de la tarjeta</a> :
											tipoPago === 1 ? <a style={{padding: '13px 32px'}} onClick={(e) => handleActiveTab(e, 'end')} href="#" className="btn">Finalizar pago</a> : ''
									}
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>
	)
}

export default CartTotals
