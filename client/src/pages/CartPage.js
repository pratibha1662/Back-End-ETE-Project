import Breadcrumb from '../components/Breadcrumb'
import Header from '../components/Header'
import ShoppingCart from '../components/ShoppingCart'

const CartPage = () => {

	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: 'cart',
				name: 'Carrito',
				active: true
			}]} />
			<ShoppingCart/>
		</>
	)
}

export default CartPage