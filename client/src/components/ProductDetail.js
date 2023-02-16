import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import useDevice from '../hooks/useDevice'
import useFavoritos from '../hooks/useFavoritos'
import useAlgoliaInsights from '../hooks/useAlgoliaInsights'
import CardCheckout from './CardCheckout'
import Comments from './Comments'
import CommentsForm from './CommentsForm'

//import useGetFrequentlyBoughtTogether from '../hooks/useGetFrequentlyBoughtTogether.js'
//import useRelatedProducts from '../hooks/useRelatedProducts.js'

const ProductDetail = ({producto}) => {

	const { img, descripcion, nombre, categoria } = producto
	const { favoritosIDs, handleFavorito } = useFavoritos()
	const { sendProductView} = useAlgoliaInsights()
	const isMobile = useDevice()

	//const { recommendations: relatedProducts } = useRelatedProducts(producto?._id)
	//const { recommendations: frequentlyBoughtTogether } = useGetFrequentlyBoughtTogether(object?.objectID)

	useEffect(() => {
		const { _id } = producto
		if(_id){
			sendProductView(_id)
		}
	}, [producto._id])

	return (
		<section className="blog-single section" style={{paddingTop: '0px'}}>
			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-12">
						<div className="blog-single-main" style={{marginTop: '0px'}}>
							<div className="row">
								<div className="col-12">
									<div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
										{
											isMobile && <h2 className="blog-title" style={{marginBottom: '0px', marginTop: '0px'}}>{nombre}</h2>
										}
										{
											isMobile ? 
												favoritosIDs.includes(producto._id) ?
													<a title='Quitar de la lista de deseos' onClick={(e) => handleFavorito(e, producto, 'minus')} href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
													</svg></a> :
													<a title='Agregar a la lista de deseos' onClick={(e) => handleFavorito(e, producto, 'add')} href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hear-fill" viewBox="0 0 16 16">
														<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
													</svg></a> : ''
										}
									</div>
									<div className="image" style={{textAlign: 'center', marginBottom: '50px', marginTop: '30px'}}>
										<img style={{width: isMobile ? '50%' : '30%', height: isMobile ? '50%' : '30%'}} src={img} alt="#" />
									</div>
									<div className="blog-detail">
										<div className="content">
											<p>
                                                Categoria: <Link to="#">{categoria.nombre}</Link>
											</p>
											{
												isMobile && <CardCheckout producto={producto} />
											}
											<p>
												{descripcion}
											</p>
										</div>
									</div>
								</div>
								<Comments producto={producto}/>
								<CommentsForm  producto={producto} />
							</div>
						</div>
					</div>
					{
						!isMobile && <CardCheckout producto={producto} />
					}
				</div>
			</div>
		</section>
	)
}

export default ProductDetail
