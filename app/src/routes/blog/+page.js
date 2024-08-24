import {getBlogPosts} from '$lib/utils/sanity.js'
import {error} from '@sveltejs/kit'
export const ssr = false

export async function load({url}) {
	const queryParam = url.searchParams.get('query')

	// fetch data
	const blogPosts = await getBlogPosts()
	const categories = blogPosts.map(blogPost => blogPost.categories.map(cat => cat.singular)).flat()
	return {blogPosts, categories}

	//	error(404, 'Not found, possibly error while fetching data')
}
