import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTrendingProducts } from '../store/slices/productos'
import TrendingTabs from './TrendingTabs'

const Trending = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTrendingProducts())
	}, [dispatch])

	return (
		<div className="product-area section" style={{paddingTop: '0px'}}>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="section-title">
							<h2>Tendencias</h2>
						</div>
					</div>
				</div>
				<TrendingTabs/>
			</div>
		</div>
	)
}

export default Trending
