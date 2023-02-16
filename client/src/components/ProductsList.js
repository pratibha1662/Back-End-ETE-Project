import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'

const ProductsList = () => {

	const { productos } = useSelector(({productos}) => productos)

	return (
		<div className='container' style={{paddingBottom:'50px'}}>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, max-content))', justifyContent: 'center', gridGap: '2rem'}}>
				{
					productos.map(prod => {
						return <ProductCard key={prod._id} prod={prod} />
					})
				}
			</div>
		</div>
	)
}

export default ProductsList
