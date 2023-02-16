import { Link } from 'react-router-dom'
import useCarrito from '../hooks/useCarrito'
import useFavoritos from '../hooks/useFavoritos'

const ProductCard = ({prod}) => {

	const { addCarrito } = useCarrito()
	const { favoritosIDs, handleFavorito } = useFavoritos()

	return (
		<Link key={prod._id} to={`/product/${prod._id}`}>
			<div className='grid-products-item' >
				<div className='container-img-grid'>
					<img className='img-grid-products' src={prod.img}></img>
				</div>
				<div style={{display:'flex', height: '100vh', alignItems: 'start', justifyContent:'center', flexDirection: 'column', paddingLeft:'20px', paddingRight: '20px', textAlign: 'start', position: 'relative', overflow: 'hidden'}}>
					<h5>${prod.precio}</h5>
					<br></br>
					<h6>{prod.nombre}</h6>
					<div className="button-head" style={{opacity: 0, position: 'relative'}}><div className="product-action"><Link data-toggle="modal" data-target="#exampleModal" title="Quick View" to={`/product/${prod._id}`}><i className=" ti-eye"></i><span>Ver producto</span></Link>
						{
							favoritosIDs.includes(prod._id) ?
								<a title="Wishlist" onClick={(e) => handleFavorito(e, prod, 'minus')} href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
								</svg><span>Quitar de la lista de deseos</span></a> :
								<a title="Wishlist" onClick={(e) => handleFavorito(e, prod, 'add')} href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hear-fill" viewBox="0 0 16 16">
									<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
								</svg><span>Agregar a lista de deseos</span></a>
						}
					</div>
					<div className="product-action-2"><a onClick={(e) => addCarrito(e, prod)} title="Agregar al carrito" href="#">Agregar al carrito</a></div></div>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
