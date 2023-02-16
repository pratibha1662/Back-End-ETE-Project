import si from 'search-insights'

const {
	REACT_APP_ALGOLIA_APPLICATION_ID,
	REACT_APP_ALGOLIA_SEARCH_API_KEY,
	REACT_APP_ALGOLIA_INDEX_NAME
} = process.env

si('init', {
	appId: REACT_APP_ALGOLIA_APPLICATION_ID,
	apiKey: REACT_APP_ALGOLIA_SEARCH_API_KEY,
	useCookie: true
})

export default function useAlgoliaInsights () {
	const sendProductAddedToCart = objectID => {
		si('convertedObjectIDs', {
			index: REACT_APP_ALGOLIA_INDEX_NAME,
			eventName: 'Product Added to Cart',
			objectIDs: [objectID]
		})
	}

	const sendProductView = objectID => {
		si('viewedObjectIDs', {
			index: REACT_APP_ALGOLIA_INDEX_NAME,
			eventName: 'Product Viewed',
			objectIDs: [objectID]
		})
	}

	return {
		sendProductAddedToCart,
		sendProductView
	}
}