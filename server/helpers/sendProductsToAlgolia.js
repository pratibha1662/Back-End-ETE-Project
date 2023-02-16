const updateIndexAlgolia = () => {
	const algoliasearch = require('algoliasearch/lite')
	const axios = require('axios')
	
	const { ALGOLIAINDEXNAME, ALGOLIAAPPID, ALGOLIA_ADMIN_API_KEY } = process.env
	const algoliaClient = algoliasearch(ALGOLIAAPPID, ALGOLIA_ADMIN_API_KEY)
	
	const index = algoliaClient.initIndex(ALGOLIAINDEXNAME)
	
	axios.get('https://ecommerce-black-sigma.vercel.app/api/productos?limite=0').then(res => {
		const products = res.data.productos.map(product => ({...product, objectID: product._id}))
	
		index.saveObjects(products).then()
			.catch(err => console.log(err))
	
	})
}

module.exports = updateIndexAlgolia