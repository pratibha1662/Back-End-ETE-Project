import Preloder from './Preloder'
import useDevice from '../hooks/useDevice'
import useChecksFavoritos from '../hooks/useChecksFavoritos'

const WishList = () => {

	const isMobile = useDevice()
	const { favoritos, checkAll, handleCheck, handleDelSelection, status, checks, delFavoritos } = useChecksFavoritos()

	return (
		<div className="shopping-cart section" style={{paddingTop: '0px'}}>
			<div className="container">
				<div className="row">
					<div className="col-12" style={{textAlign: 'center'}}>
						{
							favoritos.length && status !== 'checking' ?
								<table className="table shopping-summery">
									{
										!isMobile &&
											<thead>
												<tr className="main-hading">
													<th>PRODUCTO</th>
													<th>DESCRIPCION</th>
													<th className="text-center">PRECIO</th>
													<th className="text-center">
														<input type="checkbox" checked={ checks.length ? true : false} onChange={checkAll} name="eliminar_seleccion" id="eliminar_seleccion" /> &nbsp;
														{
															checks.length ?	<a onClick={handleDelSelection} style={{color: '#3483fa'}} href="#">Eliminar seleccion</a> :
																<a style={{color:'rgba(0,0,0,.1)'}}>Eliminar seleccion</a>
														}
													</th>
												</tr>
											</thead>
									}
									<tbody>
										{
											favoritos.map(prod =>
												<tr key={prod._id} >
													<td className="image" data-title="No">
														<img src={prod.img} alt="#"/>
														{
															isMobile && <p style={{marginTop: '10px', marginLeft: '10px'}} className="product-name"><a href="#">{prod.nombre}</a><br></br>${prod.precio}</p>
														}
													</td>
													{
														!isMobile &&
															<td className="product-des" data-title="Description">
																<p className="product-name"><a href="#">{prod.nombre}</a></p>
																<p className="product-des" title={prod.descripcion} style={{width: '500px', whiteSpace: 'nowrap', textOverflow: 'ellipsis',overflow: 'hidden'}}>{prod.descripcion}</p>
															</td>
													}
													{
														!isMobile &&
															<td className="price" data-title="Price"><span>${prod.precio}</span></td>
													}
													<td className="action" title="Eliminar de la lista de deseos" data-title="Remove"><a style={{paddingTop: '4px'}} onClick={(e) => delFavoritos(e, prod)} href="#"><i className="ti-trash remove-icon"></i></a>
													&nbsp;&nbsp;
														{
															!isMobile && <input checked={checks.includes(prod._id) ? true: false} onChange={() => handleCheck(prod._id)} type="checkbox" name="eliminar_seleccion" id="eliminar_seleccion" />
														}
													</td>
												</tr>
											)
										}
									</tbody>
								</table> :
								status === 'checking' ?
									<Preloder/> :
									<h5>Aun no tienes productos en tu lista de deseos</h5>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default WishList
