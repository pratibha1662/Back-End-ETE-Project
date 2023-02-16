import { Breadcrumb } from 'react-bootstrap'
import Header from '../components/Header'
import MisCompras from '../components/MisCompras'

const MisComprasPage = () => {
	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: 'misCompras',
				name: 'Mis compras',
				active: true
			}]} />
			<MisCompras/>
		</>
	)
}

export default MisComprasPage
