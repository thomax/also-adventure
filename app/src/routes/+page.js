import { getPosts, getCampaigns, getCategories } from "../lib/utils/sanity.js"
import { error } from "@sveltejs/kit"

export const load = async ({ url }) => {
  let campaignSlug = url.searchParams.get('campaign')
  let category = url.searchParams.get('category')
  console.log(`Fetching data based on: Campaign: ${campaignSlug}, Category: ${category}`)

  const posts = await getPosts({ campaignSlug, category })
  const campaigns = await getCampaigns()
  let categories = await getCategories({ campaignSlug })
  if (campaignSlug) {
    categories = categories.filter((cat) => cat.postCount > 0)
  }

  console.log('posts', posts.length)
  console.log('campaigns', campaigns.length)
  console.log('categories', categories.length)

  if (campaigns) {
    return {
      posts,
      campaigns,
      categories
    }
  }

  throw error(404, "Not found, possibly error while fetching data")
}
