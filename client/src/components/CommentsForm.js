import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveComentarioDB } from '../store/slices/comentarios'

const CommentsForm = ({producto}) => {

	const [comentario, setComentario] = useState('')
	const { user, status } = useSelector(({usuario}) => usuario)
	const [sending, setSending] = useState(false)
	const [nombre, setNombre] = useState('')
	const [correo, setCorreo] = useState('')
	const dispatch = useDispatch()

	useEffect(() => {
		if(!sending)
			setComentario('')
	}, [sending])

	const handleComent = (e) => {
		e.preventDefault()
		setSending(true)
		dispatch(saveComentarioDB(producto._id, comentario, user?.uid, nombre, correo, setSending))
	}

	return (
		<div className="col-12" style={{marginTop: '50px'}}>
			<div className="reply">
				<div className="reply-head">
					<h2 className="reply-title">Deja un comentario sobre el producto</h2>
					<form onSubmit={handleComent} className="form" action="#">
						<div className="row">
							{
								status === 'not-authenticated' ?
									<>
										<div className="col-lg-6 col-md-6 col-12">
											<div className="form-group">
												<label>Nombre<span>*</span></label>
												<input onChange={(e) =>setNombre(e.target.value)} type="text" name="name" placeholder="" required="required"/>
											</div>
										</div>
										<div className="col-lg-6 col-md-6 col-12">
											<div className="form-group">
												<label>Email<span>*</span></label>
												<input onChange={(e) =>setCorreo(e.target.value)} type="email" name="email" placeholder="" required="required"/>
											</div>
										</div>
									</> : ''
							}
							<div className="col-12">
								<div className="form-group">
									<label>Tu mensaje<span>*</span></label>
									<textarea onChange={(e) => setComentario(e.target.value)} value={comentario} name="message" placeholder=""></textarea>
								</div>
							</div>
							<div className="col-12">
								<div className="form-group button">
									<input disabled={sending ? true : false}  style={{backgroundColor: '#333', color: 'white'}} type="submit" className="btn" value="Comentar" />
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CommentsForm
