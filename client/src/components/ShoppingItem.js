import { useSelector } from 'react-redux'
import useCarrito from '../hooks/useCarrito'
import useDevice from '../hooks/useDevice'
import { Link } from 'react-router-dom'

const ShoppingItem = () => {

	const { carrito, total_dinero, cantidad } = useSelector(({carrito}) => carrito)
	const { substractCarrito } = useCarrito()
	const isMobile = useDevice(false)

	return (
		<div className="shopping-item" style={{right: `${isMobile ? 'auto':'-30px'}`}}>
			{
				cantidad ?
					<div className="dropdown-cart-header">
						<span>{carrito.length} {carrito.length === 1 ? 'Producto' : 'Productos'} </span>
						<Link to="/cart">Ver carrito</Link>
					</div> : ''
			}
			<ul className="shopping-list">
				{
					cantidad ?
						carrito.map(prod => (
							<li key={prod._id}>
								<div style={{display: 'flex', flexDirection: 'row'}}>
									<div style={{display:'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
										<a onClick={(e) => substractCarrito(e, prod)} href="#" className="remove" title="Remover producto"><i className="fa fa-remove"></i></a>
										<h4><Link to={`/product/${prod._id}`}>{prod.nombre}</Link></h4>
										<p className="quantity">{prod.cantidad} x - <span className="amount">{prod.precio}</span></p>
									</div>
									<div style={{width:'50%', height: 'auto'}}>
										<a className="cart-img" href="#"><img src={prod.img} alt="#"/></a>
									</div>
								</div>
							</li>
						)) : <p>No hay productos en el carrito</p>
				}
			</ul>
			{
				cantidad ?
					<div className="bottom">
						<div className="total">
							<span>Total</span>
							<span className="total-amount">${new Intl.NumberFormat('de-DE').format(total_dinero)}</span>
						</div>
						<Link to="/checkout" className="btn animate">Pagar</Link>
					</div>  : ''
			}
		</div>
	)
}

export default ShoppingItem
