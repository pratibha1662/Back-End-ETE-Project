import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Preloder from '../components/Preloder'
import { fetchProductsByCategoria, setStatus } from '../store/slices/productos'
import ProductsList from '../components/ProductsList'

const ProductListPage = () => {

	let { id } = useParams()
	const dispatch = useDispatch()
	const { categorias } = useSelector(({categorias}) => categorias)
	const { status } = useSelector(({productos}) => productos)
	const [categorySelected, setCategorySelected] = useState(null)

	useEffect(() => {
		dispatch(setStatus('checking'))
	}, [])

	useEffect(() => {
		setCategorySelected(categorias.filter(cat=> cat._id === id)[0])
	}, [categorias])

	useEffect(() => {
		if(categorySelected)
			dispatch(fetchProductsByCategoria(id))
	}, [categorySelected])

	if(status === 'checking' || !categorySelected) return <Preloder/>

	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: 'categorias',
				name: 'Categorias',
				active: false
			},{
				route: `/categorias/${id}`,
				name: categorySelected?.nombre,
				active: true
			},]} />
			<ProductsList  />
		</>
	)
}

export default ProductListPage
