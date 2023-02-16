import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import CardData from './CardData'
import CartTotals from './CartTotals'
import CheckoutData from './CheckoutData'
import CheckoutEnd from './CheckoutEnd'
//import CartTotals from '../components/CartTotals'

const CheckoutTabs = () => {

	const [buySuccess, setBuySuccess] = useState(false)
	const [activeTab, setActiveTab] = useState('datos')
	const [available, setAvailable] = useState({
		'datos': true,
		'method' : false,
		'card': false,
		'end': false
	})
	const [paymentID, setPaymentID] = useState(null)
	const [idDB, setIdDB] = useState(null)
	const { user } = useSelector(({usuario}) => usuario)

	const { form, onChange, setForm } = useForm({
		email: user?.correo,
		name: user?.nombre,
		lastname: user?.apellido,
		number: user?.telefono,
		address: user?.direccion,
		pais: user?.pais,
		ciudad: user?.ciudad,
	})

	useEffect(() => {
		if(available.end){
			setActiveTab('end')
		}
	}, [available.end])

	const handleActiveTab = (e, option) => {

		e?.preventDefault()
		if(available[option])
			setActiveTab(option)
	}

	const handlePaymentID = (id) => {
		setPaymentID(id)
	}

	if(buySuccess){
		return (
			<div className='container'>
				<div className="row">
					<div className="col-12">
						<div className="alert alert-success" role="alert">
							Compra exitosa!
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<p>Puede visualizar la compra en <Link to='/misCompras'><b><u>Mis Compras</u></b></Link></p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='container'>
			<div className="row">
				<div className="col-12">
					<div className="product-info">
						<div className="nav-main">
							<ul className="nav nav-tabs" id="myTab" role="tablist">
								<li className="nav-item"><a onClick={(e) => handleActiveTab(e,'datos')} className={`nav-link ${activeTab === 'datos' ? 'active' : ''}`} data-toggle="tab" href="1" role="tab">Mis Datos</a></li>
								<li className="nav-item"><a onClick={(e) => handleActiveTab(e,'method')} className={`nav-link ${activeTab === 'method' ? 'active' : ''}`} data-toggle="tab" href="2" role="tab">Metodo de pago</a></li>
								<li className="nav-item"><a onClick={(e) => handleActiveTab(e,'card')} className={`nav-link ${activeTab === 'card' ? 'active' : ''}`} data-toggle="tab" href="3" role="tab">Datos de tarjeta</a></li>
								<li className="nav-item"><a onClick={(e) => handleActiveTab(e,'end')} className={`nav-link ${activeTab === 'end' ? 'active' : ''}`} data-toggle="tab" href="4" role="tab">Finalizar Pago</a></li>
							</ul>
						</div>
						<div className="tab-content" id="myTabContent">
							<div className={`tab-pane fade ${activeTab === 'datos' ? 'show active' : ''}`} id="1" role="tabpanel">
								<div className="tab-single">
									<div className="row">
										<div className="col-12">
											<CheckoutData setAvailable={setAvailable} available={available} handleActiveTab={handleActiveTab} form={form} onChange={onChange} setForm={setForm} />
										</div>
									</div>
								</div>
							</div>
							<div className={`tab-pane fade ${activeTab === 'method' ? 'show active' : ''}`} id="2" role="tabpanel">
								<div className="tab-single">
									<div className="row">
										<div className="col-12">
											<CartTotals setAvailable={setAvailable} available={available}  handleActiveTab={handleActiveTab} />
										</div>
									</div>
								</div>
							</div>
							<div className={`tab-pane fade ${activeTab === 'card' ? 'show active' : ''}`} id="3" role="tabpanel">
								<div className="tab-single">
									<div className="row">
										<div className="col-12">
											<CardData setAvailable={setAvailable}  handleActiveTab={handleActiveTab} handlePaymentID={handlePaymentID} setIdDB={setIdDB} />
										</div>
									</div>
								</div>
							</div>
							<div className={`tab-pane fade ${activeTab === 'end' ? 'show active' : ''}`} id="4" role="tabpanel">
								<div className="tab-single">
									<div className="row">
										<div className="col-12">
											<CheckoutEnd paymentID={paymentID} idDB={idDB} setBuySuccess={setBuySuccess} form={form} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CheckoutTabs
