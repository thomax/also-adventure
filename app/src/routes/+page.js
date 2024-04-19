import { getPosts, getCampaigns, getCategories } from "../lib/utils/sanity.js"
import { getSelectedSlugs } from "../lib/utils/urlAccess.js"
import { error } from "@sveltejs/kit"

export const load = async () => {
  const { selectedCampaign, selectedCategory } = getSelectedSlugs()

  const posts = await getPosts({ campaignSlug: selectedCampaign, category: selectedCategory })
  const campaigns = await getCampaigns()
  let categories = await getCategories({ campaignSlug: selectedCampaign })
  if (selectedCampaign) {
    categories = categories.filter((cat) => cat.postCount > 0)
  }

  if (campaigns) {
    return {
      posts,
      campaigns,
      categories
    }
  }

  error(404, "Not found, possibly error while fetching data");
}
