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

  // If no campaign is selected, return basic data structure
  if (!campaign) {
    const campaigns = await getCampaigns()
    cachedResult = {
      campaigns,
      characterPosts: [],
      sessionPosts: [],
      loreAndPlacePosts: [],
      homebrewPosts: []
    }
    return cachedResult
  }

  // fetch data in parallel for dashboard sections
  const [
    campaigns,
    characterPosts,
    sessionPosts,
    gmNotePosts,
    placePosts,
    homebrewPosts
  ] = await Promise.all([
    getCampaigns(),
    getPosts({ campaignSlug: campaign, category: 'pc' }),
    getPosts({ campaignSlug: campaign, category: 'session' }),
    getPosts({ campaignSlug: campaign, category: 'gm-note' }),
    getPosts({ campaignSlug: campaign, category: 'place' }),
    getPosts({ campaignSlug: campaign, category: null }) // Get all other categories for homebrew
  ])

  if (campaigns) {
    // Combine gm-note and place posts for the third section
    const loreAndPlacePosts = [...gmNotePosts, ...placePosts]

    // Filter homebrew posts to exclude the categories we already have
    const excludeCategories = ['pc', 'session', 'gm-note', 'place']
    const filteredHomebrewPosts = homebrewPosts.filter(post =>
      !excludeCategories.includes(post.category?.singular)
    )

    cachedResult = {
      campaigns,
      characterPosts,
      sessionPosts,
      loreAndPlacePosts,
      homebrewPosts: filteredHomebrewPosts
    }
    return cachedResult
  }

  error(404, "Not found, possibly error while fetching data")
}
