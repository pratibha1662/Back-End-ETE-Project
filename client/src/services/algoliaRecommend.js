import recommend from '@algolia/recommend'

const {
	REACT_APP_ALGOLIA_APPLICATION_ID,
	REACT_APP_ALGOLIA_PUBLIC_API_KEY,
	REACT_APP_ALGOLIA_INDEX_NAME
} = process.env

const recommendClient = recommend(REACT_APP_ALGOLIA_APPLICATION_ID, REACT_APP_ALGOLIA_PUBLIC_API_KEY)
const indexName = REACT_APP_ALGOLIA_INDEX_NAME

export async function getRelatedProducts (productId) {
	const { results } = await recommendClient.getRelatedProducts([{
		indexName,
		maxRecommendations: 5,
		objectID: productId
	}])

	return results?.[0].hits
}

export async function getFrequentlyBoughtTogether (productId) {
	const { results } = await recommendClient.getFrequentlyBoughtTogether([{
		indexName,
		maxRecommendations: 5,
		objectID: productId
	}])

	return results?.[0].hits
}