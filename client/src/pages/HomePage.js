import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Trending from '../components/Trending'
import Preloder from '../components/Preloder'
import { fetchAllProducts, setStatus } from '../store/slices/productos'

function HomePage() {

	const { status } = useSelector(({productos}) => productos)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setStatus('checking'))
		dispatch(fetchAllProducts())
	}, [])

	if(status === 'checking')
		return <Preloder/>

	return (
		<>
			<Header/>
			<Hero/>
			<Section/>
			<Trending/>
		</>
	)
}
export default HomePage