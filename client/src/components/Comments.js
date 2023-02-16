import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCommentsProduct } from '../store/slices/comentarios'

const Comments = ({producto}) => {

	const dispatch = useDispatch()
	const {  comentarios } = useSelector(({comentarios}) => comentarios)

	useEffect(() => {
		dispatch(fetchCommentsProduct(producto._id))
	}, [])

	return (
		<div className="col-12">
			<div className="comments">
				<h3 className="comment-title">Comentarios ({comentarios.length}) </h3>
				{
					comentarios?.map(coment => {
						return <div key={coment._id} className="single-comment">
							<img src={coment.usuario?.img ? coment.usuario?.img : 'https://www.xeus.com/wp-content/uploads/2014/09/One_User_Orange.png'} alt="#"/>
							<div className="content">
								<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', width: '100%'}}>
									<span style={{width:'100%'}}><h4 style={{marginBottom:'0px'}}>{coment.usuario.nombre}</h4></span>
									<span style={{fontSize: '12px'}} className='text-muted'>{new Date(coment.createdAt).toLocaleDateString('es-ES')} </span>
								</div>
								<p style={{marginRight:'50px'}} className='text-muted'>({coment.usuario.correo})</p>
								<p style={{marginBottom: '0px'}}>{coment.comentario}</p>
								{/*<div className="button">
									<a style={{color: 'lightgray'}} href="#" className="btn">Responder</a>
								</div>*/}
							</div>
						</div>
					})
				}
			</div>
		</div>
	)
}

export default Comments
