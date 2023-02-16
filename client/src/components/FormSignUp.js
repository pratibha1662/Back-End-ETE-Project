import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { signUp } from '../store/slices/usuario'
import { toast } from 'react-toastify'
import { countryList } from '../data/countries'
import { useForm } from '../hooks/useForm'
import { useHistory } from 'react-router'
import useProfileUser from '../hooks/useProfileUser'
import useValidate from '../hooks/useValidate'

const FormSignUp = ({email,  password, setShowErrors, errors}) => {

	const dispatch = useDispatch()
	const history = useHistory()
	const { validations } = useValidate()

	const { form, onChange } = useForm({
		name: '',
		lastname: '',
		number: '',
		address: '',
		pais: 'asdasd',
		ciudad: 'asdasd',
		imagen: null,
		imgFile: ''
	})

	const { handleImage, handleImageForm, tempImg, inputFile} = useProfileUser(onChange)

	const handleSignUp = (e) => {
		e.preventDefault()
		validations({email, password})
		setShowErrors(true)
		const { name, lastname, number, pais, ciudad, address, imgFile } = form

		if(!errors.length){
			dispatch(signUp({name, email, password, apellido: lastname, telefono: number, pais, ciudad, address, img: imgFile}))
			toast('Usuario creado correctamente', {
				position: 'bottom-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
			})
			history.push('/')
		}
	}

	return (
		<form onSubmit={handleSignUp} className="form" method="post" action="#" style={{height: '600px'}}>
			<br></br>
			<div className="row">
				<div className="col-lg-6 col-md-6 col-12">
					<div className="form-group">
						<label>Nombre<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'name')} type="text" name="name" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div className="form-group">
						<label>Apellido<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'lastname')} type="text" name="lastname" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div className="form-group">
						<label>Telefono<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'number')} type="text" name="number" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div className="form-group" >
						<label>Direccion<span>*</span></label>
						<input onChange={(e) => onChange(e.target.value, 'address')} type="text" name="address" placeholder="" required="required"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-12">
					<div style={{marginBottom: '1rem'}}>
						<label>Pais<span>*</span></label>
						<Select
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
				<div className="col-lg-12 col-md-12 col-12" style={{textAlign: 'center', marginTop: '10px'}}>
					<div>
						<label>Imagen de perfil</label>
						<br></br>
						{
							form.imagen || tempImg ?
								<img src={tempImg ? tempImg : form.imagen} style={{width: '100px', height:'100px', borderRadius: '100%'}}></img> :
								<i style={{fontSize: '50px'}} className="fa fa-user-circle-o" aria-hidden="true"></i>
						}
						<br></br><br></br>
						<a onClick={handleImage} href="#">Subir</a>
						<br></br>
						{
							tempImg ?
								<a onClick={(e) => {e.preventDefault(); handleImageForm(null)}} href="#">Quitar</a> : ''
						}
						<input hidden ref={inputFile} onChange={(e) => handleImageForm(e.target.files[0], 'imagen')} type="file" name="imagen" id="" />
					</div>
				</div>
				<br></br>
				<div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}} className="col-lg-12 col-md-12 col-12">
					<div className="form-group">
						<button style={{width: '100%'}} className="btnn" value="search" type="submit">Crear cuenta</button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default FormSignUp
