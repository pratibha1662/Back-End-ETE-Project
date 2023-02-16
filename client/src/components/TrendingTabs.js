import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useCarrito from '../hooks/useCarrito'
import useDevice from '../hooks/useDevice'
import useFavoritos from '../hooks/useFavoritos'

const TrendingTabs = () => {

	const { addCarrito } = useCarrito()
	const { favoritosIDs, handleFavorito } = useFavoritos()
	const isMobile = useDevice()
	const trendings = useSelector(({productos}) => productos.trendings)
	const { categorias } = useSelector(({categorias}) => categorias )
	const [categoriaActive, setCategoriaActive] = useState(null)

	useEffect(() => {
		if(categorias.length)
			setCategoriaActive(categorias[0]._id)
	}, [categorias])

	const handleActiveTabs = (e,catID) => {
		e.preventDefault()
		setCategoriaActive(catID)
	}

	return (
		<div className="row">
			<div className="col-12">
				<div className="product-info">
					<div className="nav-main">
						<ul className="nav nav-tabs" id="myTab" role="tablist">
							{
								categorias.map(cat => <li key={cat._id} className="nav-item"><a onClick={(e) => handleActiveTabs(e, cat._id)} className={`nav-link ${categoriaActive === cat._id ? 'active' : ''}`} data-toggle="tab" href="#man" role="tab">{cat.nombre}</a></li>)
							}
						</ul>
					</div>
					<div className="tab-content" id="myTabContent">
						{
							categorias.map(cat => {
								return <div key={cat._id} className={`tab-pane fade ${categoriaActive === cat._id ? 'show active' : ''}`} id="man" role="tabpanel">
									<div className="tab-single">
										<div className="row">
											{
												trendings.map(prodsArr => {
													return prodsArr.map(prod => {
														return prod.categoria._id === cat._id &&
																	<div key={prod._id} className="col-xl-3 col-lg-3 col-md-3 col-12" style={{maxHeight: '700px'}}>
																		<div className="single-product" >
																			<div className="product-img" style={{minHeight: `${isMobile ? '300px':'400px'}` , display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
																				<Link to={`product/${prod._id}`}>
																					<img style={{width: `${!isMobile ? '70%':'50%' }`, marginBottom: `${isMobile ? '50px':'0px'}`}} className="default-img" src={prod.img} alt="#"/>
																				</Link>
																				<div style={{bottom: `${isMobile ? '0px':''}`}} className="button-head">
																					<div className="product-action">
																						<Link data-toggle="modal" data-target="#exampleModal" title="Quick View" to={`/product/${prod._id}`}><i className=" ti-eye"></i><span>Ver producto</span></Link>
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
																					<div className="product-action-2">
																						<a onClick={(e) => addCarrito(e, prod)} title="Agregar al carrito" href="#">Agregar al carrito</a>
																					</div>
																				</div>
																			</div>
																			<div className="product-content" style={{textAlign:'center'}}>
																				<h3><a href="product-details.html">{prod.nombre}</a></h3>
																				<div className="product-price">
																					<span><b>$ {prod.precio}</b></span>
																				</div>
																			</div>
																		</div>
																		{
																			isMobile && <hr></hr>
																		}
																	</div>
													})
												})
											}
										</div>
									</div>
								</div>
							})
						}

					</div>
				</div>
			</div>
		</div>
	)
}

export default TrendingTabs
