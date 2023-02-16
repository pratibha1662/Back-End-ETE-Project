import { useDispatch, useSelector } from 'react-redux'
import ShoppingItem from './ShoppingItem'
import useDevice from '../hooks/useDevice'
import { handleLogout } from '../store/slices/usuario'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'


const IconsBar = () => {

	const dispatch = useDispatch()
	const { carrito, cantidad } = useSelector(({carrito}) => carrito)
	const { user } = useSelector(({usuario}) => usuario)
	const isMobile = useDevice()
	const history = useHistory()

	const logout = (e) => {
		e.preventDefault()
		dispatch(handleLogout())
		history.push('/')
	}

	return (
		<div className={`${!isMobile ? 'col-lg-2 col-md-3 col-12':''} `}>
			<div className="right-bar" style={{display:'inline-block', position: `${!isMobile ? 'relative':'initial'}`}}>
				{
					!isMobile &&
						<>
							<div title='Mi lista de deseos' className="sinlge-bar">
								<Link to={user ? '/wishlist':'/login'} className="single-icon"><i className="fa fa-heart-o" aria-hidden="true"></i></Link>
							</div>
							{
								user === null ?
									<div title='Ingresar' className="sinlge-bar">
										<Link to="/login" className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></Link>
									</div> :
									<div title={user ? 'Mis datos':'Ingresar'} className="sinlge-bar shopping">
										{
											user?.img ?
												<img style={{borderRadius: '100%',marginTop:'-5px'}} src={user?.img} width={21} height={21} alt={user?.img}></img> :
												<i style={{fontSize: '20px'}} className="fa fa-user-circle-o" aria-hidden="true"></i>
										}
										<div className='shopping-item' style={{width: '150px'}}>
											<ul>
												<li><Link to="/misDatos">Mis datos</Link></li>
												<li><Link to="/misCompras">Mis Compras</Link></li>
												<li><a href="#" title='Salir' onClick={logout} className="sinlge-bar">Salir</a></li>
											</ul>
										</div>
									</div>
							}
						</>
				}
				<div className="sinlge-bar shopping" style={{display: `${isMobile ? 'flex' : 'inline-block' }` , justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
					{
						<p href="#" className="single-icon">
							<i style={{fontSize: `${isMobile ? '25px':'' }` }} className="ti-shopping-cart"></i>
							{
								cantidad ?
									<span className="total-count">{carrito.length}</span> : ''
							}
						</p>
					}
					<ShoppingItem/>
				</div>
			</div>
		</div>
	)
}

export default IconsBar