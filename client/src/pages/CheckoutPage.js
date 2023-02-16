import Breadcrumb from '../components/Breadcrumb'
import Header from '../components/Header'
import CheckoutTabs from '../components/CheckoutTabs'


const CheckoutPage = () => {

	return (
		<>
			<Header/>
			<Breadcrumb routes={[{
				route: 'checkout',
				name: 'Pagar',
				active: true
			}]} />
			<CheckoutTabs/>
		</>
	)
}

export default CheckoutPage