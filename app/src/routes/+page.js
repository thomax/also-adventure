import { getPosts, getCampaigns, getCategories } from "../lib/utils/sanity.js"
import { error } from "@sveltejs/kit"
export const ssr = false

let previousQuery = 'xyzzy' // unique string to force initial fetch
let cachedResult = {}

export async function load({ url }) {

  const campaign = url.searchParams.get('campaign')
  const category = url.searchParams.get('category')
  const queryParam = url.searchParams.get('query')

  // only perform new fetch if query has changed and is longer than 2 characters
  const query = queryParam?.length > 2 ? queryParam : null
  const currentQuery = [campaign, category, query].join('')
  if (currentQuery === previousQuery) {
    return cachedResult
  }
  previousQuery = currentQuery

  // fetch data in parallel
  const [posts, campaigns, categories] = await Promise.all([
    getPosts({ campaignSlug: campaign, category: category, query }),
    getCampaigns(),
    getCategories({ campaignSlug: campaign, documentType: 'post' })
  ])

  if (campaigns) {
    cachedResult = {
      posts,
      campaigns,
      categories
    }
    return cachedResult
  }

  error(404, "Not found, possibly error while fetching data");
}
