import { getPosts, getCampaigns, getCategories } from "../lib/utils/sanity.js"
import { error } from "@sveltejs/kit"
export const ssr = false

let previousQuery = 'xyzzy' // unique string to force initial fetch
let cachedResult = {}

export async function load({ url }) {

  const campaign = url.searchParams.get('campaign')
  const category = url.searchParams.get('category')
  const queryParam = url.searchParams.get('query')
  const isWikiView = url.searchParams.get('view') === 'wiki'

  // only perform new fetch if query has changed and is longer than 2 characters
  const query = queryParam?.length > 2 ? queryParam : null
  const currentQuery = [campaign, category, query, isWikiView].join('')
  if (currentQuery === previousQuery) {
    return cachedResult
  }
  previousQuery = currentQuery

  // Always fetch campaigns first
  const campaigns = await getCampaigns()

  // If no campaign is selected, return basic structure
  if (!campaign) {
    cachedResult = {
      campaigns,
      posts: [],
      categories: [],
      characterPosts: [],
      sessionPosts: [],
      loreAndPlacePosts: [],
      homebrewPosts: [],
      isWikiView
    }
    return cachedResult
  }

  if (isWikiView) {
    // WikiView component handles its own data fetching
    cachedResult = {
      campaigns,
      posts: [],
      categories: [],
      characterPosts: [],
      sessionPosts: [],
      loreAndPlacePosts: [],
      homebrewPosts: [],
      isWikiView
    }
    return cachedResult
  } else {
    // fetch data for list view (original behavior)
    const [posts, categories] = await Promise.all([
      getPosts({ campaignSlug: campaign, category: category, query }),
      getCategories({ campaignSlug: campaign, documentType: 'post' })
    ])

    cachedResult = {
      campaigns,
      posts,
      categories,
      characterPosts: [],
      sessionPosts: [],
      loreAndPlacePosts: [],
      homebrewPosts: [],
      isWikiView
    }
    return cachedResult
  }
}