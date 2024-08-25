import {getBlogPosts} from '$lib/utils/sanity.js'
import {error} from '@sveltejs/kit'
export const ssr = false

let previousQuery = 'xyzzy' // unique string to force initial fetch
let cachedResult = {}

export async function load({url}) {
	const queryParam = url.searchParams.get('query')

	// only perform new fetch if query has changed and is longer than 2 characters
	const query = queryParam?.length > 2 ? queryParam : null
	const currentQuery = [query].join('')
	if (currentQuery === previousQuery) {
		return cachedResult
	}
	previousQuery = currentQuery

	// fetch data
	const blogPosts = await getBlogPosts({query})
	const categories = blogPosts.map(blogPost => blogPost.categories.map(cat => cat.singular)).flat()
	cachedResult = {blogPosts, categories}
	return cachedResult

	//	error(404, 'Not found, possibly error while fetching data')
}
