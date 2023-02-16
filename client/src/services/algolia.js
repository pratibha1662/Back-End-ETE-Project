import algoliasearch from 'algoliasearch/lite'

const ALGOLIA_APPLICATION_ID = process.env.REACT_APP_ALGOLIA_APPLICATION_ID
const ALGOLIA_SEARCH_API_KEY = process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY


export const ALGOLIA_INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME
export const algoliaClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY)