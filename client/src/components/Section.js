import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useDevice from '../hooks/useDevice'

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

const Section = () => {

	const { productos } = useSelector(({productos}) => productos)
	const [randNumbers, setRandNumbers] = useState([])
	const isMobile = useDevice()

	useEffect(() => {
		let arr = []
		let num = null
		if(isMobile)
			while(arr.length < 2) {
				num = getRandomInt(0,10)
				if(!arr.includes(num))
					arr.push(num)
			}
		else
			while(arr.length < 3) {
				num = getRandomInt(0,10)
				if(!arr.includes(num))
					arr.push(num)
			}
		setRandNumbers(arr)
	}, [isMobile])

	return (
		<section className="small-banner section">
			<div className="container-fluid">
				<div className="row">
					{
						productos.map((prod,i) => {
							if(randNumbers.includes(i))
								return (<div key={prod._id} className="col-lg-4 col-md-6 col-12">
									<div className="single-banner" style={{borderRadius: '5%', border: '2px solid #f7941d', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '250px', alignItems: 'center', padding: '10px'}}>
										<div>
											<img style={{width: '10rem', height: 'auto'}} src={prod.img} alt="#" />
										</div>
										<div className="content" style={{width: '600px', paddingLeft: '20px'}}>
											<p>{prod.categoria.nombre}</p>
											<h3>{prod.nombre}</h3>
											<Link to={`/product/${prod._id}`}>Descr&uacute;brelo</Link>
										</div>
									</div>
								</div>)
						})
					}

				</div>
			</div>
		</section>
	)
}

export default Section
