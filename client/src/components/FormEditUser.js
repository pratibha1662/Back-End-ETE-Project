import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { countryList } from '../data/countries'
import { useForm } from '../hooks/useForm'
import useProfileUser from '../hooks/useProfileUser'
import { updateUser } from '../store/slices/usuario'
import Preloder from './Preloder'

const FormEditUser = () => {

	const dispatch = useDispatch()
	const { user } = useSelector(({usuario}) => usuario)
	const { form, onChange, setForm } = useForm()
	const { handleImage, handleImageForm, tempImg, inputFile} = useProfileUser(onChange)

	useEffect(() => {
		if(user){
			setForm({
				name: user?.nombre,
				lastname: user?.apellido,
				number: user?.telefono,
				address: user?.direccion,
				pais: user?.pais,
				ciudad: user?.ciudad,
				imagen: user?.img,
				email: user?.correo,
				password: '',
				imgFile: '',
			})
		}
	}, [user])

	const handleEditUser = (e) => {
		e.preventDefault()
		const { name, lastname, number, pais, ciudad, address, email, password, imgFile } = form
		dispatch(updateUser({name, email, password, apellido: lastname, telefono: number, pais, ciudad, address, img: imgFile, id: user.uid}))
		toast('Datos actualizados', {
			position: 'bottom-right',
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
		})
	}

	if(!form) return <Preloder/>

	return (
		<div className="shopping-cart section" style={{paddingTop: '0px'}}>
			<div className="container">
				<form onSubmit={handleEditUser} className="form" method="post" action="#" style={{height: '600px'}}>
					<br></br>
					<div className="row">
						<div className="col-lg-6 col-md-6 col-12">
							<div className="form-group">
								<label>Email<span>*</span></label>
								<input onChange={(e) => onChange(e.target.value, 'email')} value={form?.email} type="email" name="name" placeholder="" required="required"/>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-12">
							<div className="form-group">
								<label>Password</label>
								<input onChange={(e) => onChange(e.target.value, 'password')} value={form?.password} type="password" name="lastname" placeholder="Si el password esta vacio no sera editado"/>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-12">
							<div className="form-group">
								<label>Nombre<span>*</span></label>
								<input onChange={(e) => onChange(e.target.value, 'name')} value={form?.name} type="text" name="name" placeholder="" required="required"/>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-12">
							<div className="form-group">
								<label>Apellido<span>*</span></label>
								<input onChange={(e) => onChange(e.target.value, 'lastname')} value={form?.lastname} type="text" name="lastname" placeholder="" required="required"/>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-12">
							<div className="form-group">
								<label>Telefono<span>*</span></label>
								<input onChange={(e) => onChange(e.target.value, 'number')} value={form?.number} type="text" name="number" placeholder="" required="required"/>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-12">
							<div className="form-group" >
								<label>Direccion<span>*</span></label>
								<input onChange={(e) => onChange(e.target.value, 'address')} value={form?.address} type="text" name="address" placeholder="" required="required"/>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-12">
							<div style={{marginBottom: '1rem'}}>
								<label>Pais<span>*</span></label>
								<Select
									onChange={(e) => onChange(e.value, 'pais')}
									className="basic-single"
									defaultValue={{ label: form.pais, value: form.pais }}
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
									defaultValue={{ label: 'Los Angeles', value: 'Los Angeles' }}
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
								<a onClick={handleImage} href="#">Cambiar</a>
								<br></br>
								<a onClick={(e) => {e.preventDefault(); handleImageForm(null)}} href="#">Quitar</a>
								<input hidden ref={inputFile} onChange={(e) => handleImageForm(e.target.files[0], 'imagen')} type="file" name="imagen" id="" />
							</div>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}} className="col-lg-12 col-md-12 col-12">
							<div className="form-group">
								<button style={{width: '100%'}} className="btnn" value="search" type="submit">Guardar cambios</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormEditUser
