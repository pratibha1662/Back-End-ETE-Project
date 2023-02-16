import { useSelector } from 'react-redux'
import { Fade } from 'react-slideshow-image'
import { Link } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'

const Hero = () => {

	const { categorias } = useSelector(({categorias}) => categorias)

	return (
		<Fade>
			{
				categorias.map(cat => (
					<section key={cat._id} className="hero-slider">
						<div className="single-slider " style={{backgroundImage: `url(${cat.img})`}}>
							<div className="container">
								<div className="row no-gutters">
									<div className="col-lg-9 offset-lg-3 col-12">
										<div className="text-inner" >
											<div className="row">
												<div className="col-lg-7 col-12">
													<div className="hero-text" style={{borderRadius: '5%',padding: '15px',background: 'rgba(0,0,0,.6)'}}>
														<h1>{cat.nombre}</h1>
														<b><p style={{color:'white'}}>{cat.descripcion}</p></b>
														<div className="button">
															<Link style={{width:'50%'}} to={`/categoria/${cat._id}`} className="btn">Comprar ahora!</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				))
			}
		</Fade>
	)
}

export default Hero
