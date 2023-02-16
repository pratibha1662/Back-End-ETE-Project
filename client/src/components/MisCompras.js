import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCompras } from '../api/productos'
import useDevice from '../hooks/useDevice'

const MisCompras = () => {

	const { user } = useSelector(({usuario}) => usuario)
	const [compras, setCompras] = useState(null)
	const isMobile = useDevice()

	useEffect(() => {
		if(user?.uid){
			fetchCompras(setCompras)
		}
	}, [user?.uid])

	return (
		<div className="shopping-cart section" style={{paddingTop: '0px'}}>
			<div className="container">
				<div className="row">
					<div className="col-12" style={{textAlign: 'center'}}>
						<table className="table shopping-summery">
							<thead>
								<tr className="main-hading">
									<th>FECHA</th>
									<th>PRODUCTOS</th>
									<th style={{width: '150px'}} className="text-center">SU PAGO</th>
									<th className="text-center">FORMA DE PAGO</th>
									<th style={{width: '150px'}} className="text-center">ESTADO</th>
								</tr>
							</thead>
							<tbody>
								{
									compras && compras.map(comp => {
										return (
											<tr key={comp._id}>
												<td>{new Date(comp.createdAt).toLocaleDateString('es-ES')}</td>
												<td>
													<ul>
														{
															comp.productos.map(prod => <li key={prod._id}><Link to={`/product/${prod._id}`}><div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', alignItems: 'center', marginBottom: '15px'}}><img style={{width: `${isMobile ? '15%' : '5%'}`, height: 'auto', marginRight: '15px'}} src={prod.img}></img> {prod.nombre} - $ {prod.precio} x {prod.cantidad} </div></Link></li>)
														}
													</ul>
												</td>
												<td>{isMobile ? `Total pagado: $${comp.monto}` : `$${comp.monto}`}</td>
												<td>{isMobile ? `Metodo de pago: ${comp.metodo}` : comp.metodo}</td>
												<td>{isMobile ? `Estado: ${comp.estado}` : comp.estado}</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MisCompras
