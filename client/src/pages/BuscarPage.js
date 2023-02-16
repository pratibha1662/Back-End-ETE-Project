import { useParams } from 'react-router'
import Breadcrumb from '../components/Breadcrumb'
import Busqueda from '../components/Busqueda'
import Header from '../components/Header'
const BuscarPage = () => {

	let { termino, categoria } = useParams()

	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: `buscar/${termino}/${categoria}`,
				name: 'Buscar',
				active: true
			},
			{
				route: `buscar/${termino}/${categoria}`,
				name: termino,
				active: true
			}]} />
			<Busqueda/>
		</>
	)
}

export default BuscarPage