import Breadcrumb from '../components/Breadcrumb'
import FormEditUser from '../components/FormEditUser'
import Header from '../components/Header'

const MisDatosPage = () => {
	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: 'misDatos',
				name: 'Mis datos',
				active: true
			}]} />
			<FormEditUser/>
		</>
	)
}

export default MisDatosPage
