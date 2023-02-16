import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Header from '../components/Header'
import Preloder from '../components/Preloder'
import ProductDetail from '../components/ProductDetail'
import { fetchProduct, handleSetProduct } from '../store/slices/productos'


const ProductDetailPage = () => {

	let { id } = useParams()
	const dispatch = useDispatch()
	const { productoActual } = useSelector(({productos}) => productos)

	useEffect(() => {
		dispatch(fetchProduct(id))
		return () => {
			dispatch(handleSetProduct(null))
		}
	}, [id])

	if(!productoActual) return <Preloder/>

	return (
		<>
			<Header/>
			<Breadcrumb routes={[
				{
					route: `categoria/${productoActual.categoria._id}`,
					name: productoActual.categoria.nombre,
					active: false
				},
				{
					route: `product/${id}`,
					name: productoActual.nombre,
					active: true
				}
			]} />
			<ProductDetail producto={productoActual} />
		</>
	)
}

export default ProductDetailPage
