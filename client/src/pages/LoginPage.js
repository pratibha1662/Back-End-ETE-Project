import Breadcrumb from '../components/Breadcrumb'
import FormSignIn from '../components/FormSignIn'
import Header from '../components/Header'

const LoginPage = () => {
	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: 'login',
				name: 'Login',
				active: true
			}]} />
			<FormSignIn/>
		</>
	)
}

export default LoginPage
