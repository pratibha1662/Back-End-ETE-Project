import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { countryList } from '../data/countries'
import useValidate from '../hooks/useValidate'

const CheckoutData = ({setAvailable, available, handleActiveTab, form, setForm, onChange}) => {

	const { validations, setShowErrors } = useValidate()
	const { user } = useSelector(({usuario}) => usuario)

	useEffect(() => {
		if(user){
			setForm({email: user?.correo, name: user?.nombre, lastname: user?.apellido, number: user?.telefono, address: user?.direccion, pais: user?.pais, ciudad: user?.ciudad})
		}
	}, [user?.correo, user?.pais, user?.ciudad])

	useEffect(() => {
		if(form.email && form.name && form.lastname && form.number && form.address && form.pais && form.ciudad){

			setAvailable(prev => {
				return {...prev, 'method': true}
			})

		}else{

			setAvailable(prev => {
				return {...prev, 'method': false}
			})

		}
	}, [form])

	const handleNext = (e) => {
		e.preventDefault()
		setShowErrors(true)
		validations({email: form.email})

		/*
		if(!errors.length){
			const error = await dispatch(signIn(form.email, form.password))
			if(!error){
				setErrorLogin(null)
				history.push('/')
			}
			else
				setErrorLogin(error)
		}
		const { name, lastname, number, pais, ciudad, address, imgFile } = form
        */
	}

	return (
		<form onSubmit={handleNext} className="form" method="post" action="#" style={{height: '600px'}}>
			<br></br>
			<div className="row">
				<div className="col-lg-12 col-md-12 col-12">
					<div className="form-group">
						<label>Email<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'email')} value={form.email} type="email" name="name" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div className="form-group">
						<label>Nombre<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'name')} value={form.name} type="text" name="name" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div className="form-group">
						<label>Apellido<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'lastname')} value={form.lastname} type="text" name="lastname" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div className="form-group">
						<label>Telefono<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'number')} value={form.number} type="text" name="number" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div className="form-group" >
						<label>Direccion<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'address')} value={form.address} type="text" name="address" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div style={{marginBottom: '1rem'}}>
						<label>Pais<span>*</span></label>
						<Select
							defaultValue={{ label: form.pais, value: form.pais }}
							onChange={(e) => onChange(e.value, 'pais')}
							className="basic-single"
							options={countryList.map((val) => {
								return {
									value: val,
									label: val
								}
							})}
						/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div style={{marginBottom: '1rem'}}>
						<label>Ciudad<span>*</span></label>
						<Select
							defaultValue={{ label: form.ciudad, value: form.ciudad }}
							onChange={(e) => onChange(e.value, 'ciudad')}
							options={['Los Angeles','Chicago', 'Houston', 'San Diego', 'Dallas','Charlotte'].map((val) => {
								return {
									value: val,
									label: val
								}
							})}
						/>
					</div>
				</div>
				<br></br>
				<div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}} className="col-lg-12 col-md-12 col-12">
					<div className="form-group">
						<button onClick={(e) => {handleActiveTab(e, 'method')}} disabled={available['method'] ? false : true} style={{width: '100%', backgroundColor: `${available['method'] ? '#333333':'gray'}`}} className="btnn" value="search" type="submit">Ir a los metodos de pago</button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default CheckoutData
