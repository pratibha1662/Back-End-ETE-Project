import Breadcrumb from '../components/Breadcrumb'
import Header from '../components/Header'
import WishList from '../components/WishList'

const WishListPage = () => {
	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: '/wishlist',
				name: 'Lista de deseos',
				active: true
			}]} />
			<WishList/>
		</>
	)
}

export default WishListPage
