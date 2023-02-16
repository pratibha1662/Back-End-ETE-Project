import { useEffect, useState } from 'react'
import { getRelatedProducts } from '../services/algoliaRecommend'

export default function useRelatedProducts (productId) {
	console.log(productId)
	const [recommendations, setRecommendations] = useState([])

	useEffect(() => {
		if (productId) {
			getRelatedProducts(productId).then(setRecommendations)
		}
	}, [productId])

	return {
		recommendations
	}
}