import axios from 'axios'

const productosAPI = axios.create({
	baseURL: process.env.REACT_APP_API_HOST
})

export const fetchCompras = async (callback) => {
	const token = localStorage.getItem('token')
	productosAPI.get('/pagos', {
		headers: {
			['x-token']:token
		}
	}).then(({data}) => {
		let prodIds = []
		const newArray = data.compras.map((comp) => {
			const productos = comp.productos.map((prod) => ({...prod, compID: comp._id, cantidad: comp.productos.filter(x => x._id === prod._id).length}))

			const newprods = productos.map(prod => {
				if(!prodIds.includes(prod.compID+prod._id))
				{
					prodIds.push(prod.compID+prod._id)
					return prod
				}else{
					return null
				}
			}).filter(el => el !== null)

			comp.productos = newprods
			return comp
		})

		callback(newArray)
	})
}

export const searchProducts = async (termino, categoria='', callback) => {
	console.log(categoria)
	productosAPI.get(`buscar/productos/${termino}/${categoria}`).then(res => {
		const data = res.data.results
		callback(data)
	})
}


export default productosAPI