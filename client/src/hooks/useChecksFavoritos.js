import { useState } from 'react'
import useFavoritos from './useFavoritos'

const useChecksFavoritos = () => {

	const { delFavoritos, favoritos, status } = useFavoritos()
	const [checks, setChecks] = useState([])

	const checkAll = (e) => {
		if(e.target.checked){
			setChecks(favoritos.map(({_id}) => _id))
		}
		else{
			setChecks([])
		}
	}

	const handleCheck = (id) => {
		if(checks.includes(id))
			setChecks(checks.filter(idProd => idProd !== id))
		else
			setChecks(prev => [...prev, id])
	}

	const handleDelSelection = () => {
		favoritos.forEach(prod => {
			if(checks.includes(prod._id)){
				delFavoritos(null, prod)
			}
		})
		setChecks([])
	}

	return {
		checkAll,
		handleCheck,
		handleDelSelection,
		status,
		favoritos,
		checks,
		delFavoritos
	}
}

export default useChecksFavoritos
