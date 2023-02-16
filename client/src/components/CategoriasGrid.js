import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CategoriasGrid = () => {

	const { categorias } = useSelector(({categorias}) => categorias)

	return (
		<div className='container' style={{paddingBottom:'50px'}}>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr)', gridGap: '2rem'}}>
				{
					categorias.map(cat => {
						return(
							<Link key={cat._id} to={`/categoria/${cat._id}`}><div className='grid-categories-item' style={{backgroundImage: `url(${cat.img})`}} >
								<h3 style={{position: 'absolute', color:'white', fontWeight: 'bold', textAlign: 'center', backgroundColor: 'rgba(1,1,1,0.5)', borderRadius: '10%', padding: '10px'}}>
									{cat.nombre}
								</h3>
							</div></Link>
						)
					})
				}
			</div>
		</div>
	)
}

export default CategoriasGrid
