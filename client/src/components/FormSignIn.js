import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from '../hooks/useForm'
import { signIn } from '../store/slices/usuario'
import FormSignUp from './FormSignUp'
import { useHistory } from 'react-router'
import useValidate from '../hooks/useValidate'

const FormSignIn = () => {

	const dispatch = useDispatch()
	const history = useHistory()
	const { validations, errors, showErrors, setShowErrors } = useValidate()
	const [errorLogin, setErrorLogin] = useState(null)

	const { form, onChange } = useForm({
		email: '',
		password: '',
		checkCrear: null
	})

	useEffect(() => {
		validations(form)
		setErrorLogin(null)
	}, [form.email, form.password])

	const handleSignIn = async (e) => {
		e.preventDefault()
		setShowErrors(true)
		if(!errors.length){
			const error = await dispatch(signIn(form.email, form.password))
			if(!error){
				setErrorLogin(null)
				history.push('/')
			}
			else
				setErrorLogin(error)
		}
	}

	return (
		<div className="shopping-cart section" style={{paddingTop: '0px'}}>
			<div className="container">
				<form onSubmit={handleSignIn} className="form" method="post" action="#">
					<div className="row" style={{justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<div className="row">
							<div className="col-lg-12 col-md-12 col-12">
								<div className="form-group">
									<label>Email<span>*</span></label>
									<input  type="text" onChange={(e) => {onChange(e.target.value,'email')}} name="email"  />
									{
										showErrors && errors?.filter( err => err.includes('email')).map(err => <p key={err} className='text-danger'>{err}</p>)
									}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12 col-md-12 col-12">
								<div className="form-group">
									<label>Password<span>*</span></label>
									<input  type="password" minLength={6} onChange={(e) => onChange(e.target.value,'password')} name="password" placeholder="" />
									{
										showErrors && errors?.filter( err => err.includes('password')).map(err => <p key={err} className='text-danger'>{err}</p>)
									}
								</div>
							</div>
						</div>
						{
							errorLogin ? <p className='text-danger'>{errorLogin}</p> : ''
						}
						{
							!form.checkCrear ?
								<div className="col-lg-2 col-md-2 col-12">
									<div className="form-group">
										<button style={{position: 'relative', width: '100%'}} className="btnn" value="search" type="submit"> { form.checkCrear ? 'Crear cuenta': 'Ingresar'}</button>
									</div>
								</div> : ''
						}
						<div style={{display: 'flex', justifyContent: 'center'}} className="col-lg-12 col-md-5 col-12">
							<div className="left">
								<div className="checkbox">
									<label className={`checkbox-inline ${form.checkCrear ? 'checked':''}`} htmlFor="2">
										<input name="checkCrear" onChange={(e) => onChange(e.target.checked,'checkCrear')} id="2" type="checkbox"/> &nbsp; Crear cuenta
									</label>
								</div>
							</div>
						</div>
					</div>
				</form>

				{
					form.checkCrear &&
						<FormSignUp email={form.email} password={form.password} setShowErrors={setShowErrors} errors={errors} />
				}
			</div>
		</div>
	)
}

export default FormSignIn
