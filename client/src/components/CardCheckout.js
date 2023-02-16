import useCarrito from '../hooks/useCarrito'
import { useEffect, useState } from 'react'
import useDevice from '../hooks/useDevice'
import useFavoritos from '../hooks/useFavoritos'

const CardCheckout = ({producto}) => {

	const { nombre, precio, stock } = producto
	const [cantidad, setCantidad] = useState(1)
	const { addCarrito, carrito } = useCarrito()
	const { favoritosIDs, handleFavorito } = useFavoritos()
	const isMobile = useDevice()

	useEffect(() => {
		const prodCant = carrito.filter(prod => prod._id === producto._id)
		setCantidad(prodCant[0]?.cantidad ? prodCant[0].cantidad : 1)
	}, [carrito.length])

	const handleCarrito = (e) => {
		e.preventDefault()
		addCarrito(e, producto, cantidad)
	}

	return (
		<div className="col-lg-4 col-12">
			<div className="main-sidebar" style={{marginTop: '0px', border: `${!isMobile ? '1px solid rgba(0,0,0,.1)' : 'none'} `, padding: '5px'}}>
				<div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
					{
						!isMobile && <h2 className="blog-title" style={{marginBottom: '0px'}}>{nombre}</h2>
					}
					{
						!isMobile ?
							favoritosIDs.includes(producto._id) ?
								<a title='Quitar de la lista de deseos' onClick={(e) => handleFavorito(e, producto, 'minus')} href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
								</svg></a> :
								<a title='Agregar a la lista de deseos' onClick={(e) => handleFavorito(e, producto, 'add')} href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hear-fill" viewBox="0 0 16 16">
									<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
								</svg></a> : ''
					}
				</div>
				<br></br>
				<div className="blog-meta">
					<h4 className="author">$ {precio}</h4>
				</div>
				<div className="single-widget category">
					<h3 className="title">{ stock ? 'Stock: Disponible' : 'Stock: No hay stock disponible' } </h3>
				</div>
				{
					stock !== 0 ?
						<>
							<div className="single-widget recent-post qty" style={{marginBottom: '0px'}}>
								<h3 className="title">
									<div className="input-group" style={{alignItems: 'center'}} >
										<h5>Cantidad</h5>
										<div className="button minus">
											<button id="minus" type="button" onClick={() => setCantidad(prev => prev - 1)} className="btn btn-primary btn-number" data-type="minus" data-field="quant[1]">
												<i className="ti-minus"></i>
											</button>
										</div>
										<input type="text" style={{width:'50px', textAlign: 'center'}} onChange={(e) => setCantidad(e.target.value)} name="quant[1]" className="input-number" value={cantidad}  data-min="1" data-max="100" />
										<div   className="button plus">
											<button id="plus" onClick={() => setCantidad(prev => prev + 1)} type="button" className="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
												<i  className="ti-plus"></i>
											</button>
										</div>
										<div><p style={{fontSize: '12px'}}>({stock} disponibles)</p></div>
									</div>
								</h3>
							</div>
							<div className="single-widget newsletter">
								<div className="letter-inner">
									<div className="form-inner">
										<a href="#" onClick={handleCarrito} >Agregar al carrito</a>
									</div>
								</div>
							</div>
						</> : ''
				}
			</div>
		</div>
	)
}

export default CardCheckout
