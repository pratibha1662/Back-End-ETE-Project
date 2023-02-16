import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useCarrito from '../hooks/useCarrito'
import useDevice from '../hooks/useDevice'
import Preloder from './Preloder'

const ShoppingCart = ({end = false, endAction}) => {

	const { status, carrito, total_dinero, envio } = useSelector(({carrito}) => carrito)
	const { addCarrito, substractCarritoProduct, removeProductCarrito, calcularEnvio } = useCarrito()
	const [shipping, setShipping] = useState(envio)
	const isMobile = useDevice()

	useEffect(() => {
		calcularEnvio(shipping)
	}, [shipping])

	const handleCantidadProducto = (value, producto) => {
		addCarrito(null, producto, value)
	}

	const handleCantidadProductoButton = (type, producto) => {
		if(type === 'plus'){
			addCarrito(null, producto, producto.cantidad + 1)
		}

		if(type === 'minus'){
			substractCarritoProduct(null, producto)
		}
	}

	const handleRemoveProduct = (e, producto) => {
		removeProductCarrito(e, producto)
	}
	

	return (
		<div className="shopping-cart section" style={{paddingTop: '0px'}}>
			<div className="container">
				<div className="row">
					<div className="col-12" style={{textAlign: 'center'}}>
						{
							carrito.length && status !== 'checking' ?
								<table className="table shopping-summery">
									{
										!isMobile &&
											<thead>
												<tr className="main-hading">
													<th>PRODUCTO</th>
													<th>DESCRIPCION</th>
													<th className="text-center">PRECIO UNIDAD</th>
													<th className="text-center">CANTIDAD</th>
													<th className="text-center">TOTAL</th>
													{
														!end && <th className="text-center"><i className="ti-trash remove-icon"></i></th>
													}
												</tr>
											</thead>
									}
									<tbody>
										{
											carrito.map(prod =>
												<tr key={prod._id} >
													<td className="image" data-title="Producto"><img src={prod.img} alt="#"/>
														{
															isMobile && <p style={{marginTop: '10px', marginLeft: '10px'}} className="product-name"><Link to={`product/${prod._id}`}>{prod.nombre}</Link><br></br>${new Intl.NumberFormat('de-DE').format(prod.precio)} x {prod.cantidad} = ${new Intl.NumberFormat('de-DE').format(prod.precio * prod.cantidad)}</p>
														}
													</td>
													{
														!isMobile &&
														<td className="product-des" data-title="Descripcion">
															{
																!isMobile && <p className="product-name"><Link to={`product/${prod._id}`}>{prod.nombre}</Link></p>
															}
															{
																!isMobile && <p className="product-des" title={prod.descripcion} style={{width: '500px', whiteSpace: 'nowrap', textOverflow: 'ellipsis',overflow: 'hidden'}}>{prod.descripcion}</p>
															}
														</td>
													}
													{
														!isMobile && <td className="price" data-title="Precio unidad"><span>${prod.precio}</span></td>
													}
													<td className="qty" data-title="Cantidad" style={{display: isMobile ? 'flex' : 'table-cell', alignItems: 'center'}}>
														{
															!end ? 
																<div className="input-group" >
																	<div className="button minus">
																		<button onClick={() => handleCantidadProductoButton('minus', prod)} id="minus" type="button" className="btn btn-primary btn-number" disabled={prod.cantidad === 1 ? true : false} data-type="minus" data-field="quant[1]">
																			<i className="ti-minus"></i>
																		</button>
																	</div>
																	<input type="text" onChange={(e) => handleCantidadProducto(e.target.value, prod)} name="quant[1]" className="input-number" value={prod.cantidad}  data-min="1" data-max="100" />
																	<div   className="button plus">
																		<button onClick={() => handleCantidadProductoButton('plus', prod)} id="plus" type="button" className="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
																			<i  className="ti-plus"></i>
																		</button>
																	</div>
																</div> : `x ${prod.cantidad}`
														}
														{
															isMobile && !end && <div>
																<a style={{marginLeft: '20px'}} onClick={(e) => handleRemoveProduct(e, prod)} href="#"><i className="ti-trash remove-icon"></i></a>
															</div>
														}
													</td>
													{
														!isMobile &&
														<td className="total-amount" data-title="Total">
															<span>${new Intl.NumberFormat('de-DE').format(prod.precio * prod.cantidad)}</span>
														</td>
													}
													{
														!isMobile && !end &&
															<td className="action" data-title="Quitar"><a onClick={(e) => handleRemoveProduct(e, prod)} href="#"><i className="ti-trash remove-icon"></i></a></td>
													}
												</tr>
											)
										}
									</tbody>
								</table> :
								status === 'checking' ? 
									<Preloder/> :
									<h5>No hay productos en el carrito</h5>


						}
					</div>
				</div>
				{
					carrito.length && status !== 'checking' ?
						<div className="row" style={{height: '300px'}}>
							<div className="col-12">
								<div className="total-amount">
									<div className="row">
										<div className="col-lg-8 col-md-5 col-12">
											<div className="left">
												<div className="checkbox">
													{
														!end &&
															<label className={`checkbox-inline ${shipping ? 'checked':''}`} htmlFor="2">
																<input onChange={() => setShipping(prev => prev === 200 ? 0 : 200)} name="news" id="2" type="checkbox"/> Envio (+200$)
															</label>
													}
												</div>
											</div>
										</div>
										<div className="col-lg-4 col-md-7 col-12">
											<div className="right">
												<ul>
													<li>Subtotal<span>${new Intl.NumberFormat('de-DE').format(total_dinero)}</span></li>
													<li>Envio<span>{shipping ? `$ ${shipping}` : 'Gratis'} </span></li>
													<li className="last">Tu pago<span>${new Intl.NumberFormat('de-DE').format(total_dinero + envio)}</span></li>
												</ul>
												{
													!end ?
														<div className="button5">
															<Link to="/checkout" className="btn">Acceder al pago</Link>
															<Link to="/" className="btn">Continuar comprando</Link>
														</div> :
														<div className="button5">
															<button style={{padding: '10px'}} className="btn" onClick={endAction} >Pagar y Finalizar compra</button>
														</div>
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> : ''
				}
			</div>
		</div>
	)
}

export default ShoppingCart
