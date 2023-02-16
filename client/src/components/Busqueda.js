import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { searchProducts } from '../api/productos'
import ProductCard from './ProductCard'

const Busqueda = () => {

	let { termino, categoria } = useParams()
	const [productsSearch, setProductsSearch] = useState(null)

	useEffect(() => {
		if(termino){
			searchProducts(termino, categoria, setProductsSearch)
		}
	}, [termino, categoria])

	return (
		<div className='container' style={{paddingBottom:'50px'}}>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, max-content))', justifyContent: 'center', gridGap: '2rem'}}>
				{
					productsSearch?.length ?
						productsSearch.map(prod => {
							return <ProductCard key={prod._id} prod={prod} />
						}) : <p>No hay resultados para &#34;{termino}&#34; </p>
				}
			</div>
		</div>
	)
}

export default Busqueda
