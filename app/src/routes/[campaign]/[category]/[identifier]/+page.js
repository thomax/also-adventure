import { error } from "@sveltejs/kit"

import { getPost } from "../../../../lib/utils/sanity.js"

export const ssr = false

export const load = async ({ params }) => {
  console.log('gonna log', params)
  const { campaign, category, identifier } = params
  if (campaign && category && identifier) {
    const queryOptions = { campaignSlug: campaign, category }
    // if session, check if identifier is a number
    if (category === 'session' && !isNaN(identifier)) {
      queryOptions.order = identifier
    } else {
      queryOptions.slug = identifier
    }
    console.log('asking for', queryOptions)
    const post = await getPost(queryOptions)
    if (post) return post
    error(404, "Not found")
  } else {
    error(404, "Not found")
  }
}
