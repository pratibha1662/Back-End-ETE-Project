import Breadcrumb from '../components/Breadcrumb'
import CategoriasGrid from '../components/CategoriasGrid'
import Header from '../components/Header'

const CategoriasPage = () => {
	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: 'categorias',
				name: 'Categorias',
				active: true
			}]} />
			<CategoriasGrid/>
		</>
	)
}

export default CategoriasPage
