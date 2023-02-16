import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import useHeaderScroll from '../hooks/useHeaderScroll'
import ShoppingItem from './ShoppingItem'

const HeaderInner = () => {

	let history = useHistory()
	const headerScroll = useHeaderScroll()
	const { categorias } = useSelector(({categorias}) => categorias)
	const { carrito, cantidad } = useSelector(({carrito}) => carrito)

	return (
		<div className="header-inner">
			<div className="container">
				<div className="cat-nav-head">
					<div className="row">
						{
							history.location.pathname === '/' ?
								<div className="col-lg-3">
									<div className="all-category">
										<h3 className="cat-heading"><i className="fa fa-bars" aria-hidden="true"></i>CATEGORIAS</h3>
										<ul className="main-category">
											{
												categorias.map(cat => <li key={cat._id}><Link to={`categoria/${cat._id}`} >{cat.nombre}</Link></li>)
											}
										</ul>
									</div>
								</div> : ''
						}
						<div className="col-lg-9 col-12">
							<div className="menu-area">
								<nav className="navbar navbar-expand-lg">
									<div className="navbar-collapse">
										<div className="nav-inner ">
											<ul className="nav main-menu menu navbar-nav">
												<li className="active"><Link className="enlaces_header" to="/">Home</Link></li>
												<li><Link className="enlaces_header" to="/categorias">Categorias</Link></li>
												{
													headerScroll &&
															<li>
																<div className="sinlge-bar shopping">
																	{
																		<a href="#" className="single-icon enlaces_header" style={{fontSize: '25px !important'}}>
																			<i style={{fontSize: '25px'}} className="ti-shopping-cart"></i>
																			{
																				cantidad ?
																					<span style={{position: 'absolute',right: '-8px', top: '23px'}} className="total-count">{carrito.length}</span> : ''
																			}
																		</a>
																	}
																	<ShoppingItem/>
																</div>
															</li>
												}
											</ul>
										</div>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeaderInner
