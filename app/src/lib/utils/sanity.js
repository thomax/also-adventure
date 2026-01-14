import { createClient } from '@sanity/client'
import groq from 'groq'
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public'

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
  throw new Error('Did you forget to run sanity init --env?')
}

export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2026-01-14' // date of setup
})

export async function getPosts(options = {}) {
  const { campaignSlug, category, query, limit } = options
  const campaignFilter = campaignSlug
    ? ` && campaign._ref in *[_type =="campaign" && slug.current == "${campaignSlug}"]._id`
    : ''
  const categoryFilter = category
    ? ` && category._ref in *[_type =="category" && singular == "${category}"]._id`
    : ''
  // query string wildcard filter
  const queryFilter = query ? `&& [title, pt::text(body)] match "*${query}*"` : ''
  // Limit to 10 posts if no campaign is selected
  const maxLimit = limit ? limit : '20'
  // if no campaign is selected, limit number of posts
  const limitFilter = !campaignSlug ? `[0...${maxLimit}]` : ''
  // if no campaign is selected, sort by updatedAt
  const sortOrder = !campaignSlug
    ? 'order(_updatedAt desc)'
    : 'order(defined(order) desc, order desc, _updatedAt desc)'

  const groqQuery = groq`*[
      _type == "post"
      && defined(slug.current)
      && !(_id in path('drafts.**'))
      ${campaignFilter}
      ${categoryFilter}
      ${queryFilter}
    ] | ${sortOrder}
    {
      ...,
      category->{title, singular},
      campaign->{title, slug},
      authors[]->{_id,name},
    }
    ${limitFilter}`
  return await client.fetch(groqQuery)
}

export async function getBlogPosts(options = {}) {
  const { query, limit, category } = options
  // Limit to 50 posts if no campaign is selected
  const maxLimit = limit ? limit : '50'
  // if no campaign is selected, limit number of posts
  const limitFilter = `[0...${maxLimit}]`
  // sort by publishAt
  const sortOrder = 'order(publishAt desc)'
  // query string wildcard filter
  const queryFilter = query ? `&& [title, pt::text(body)] match "*${query}*"` : ''
  const categoryFilter = category
    ? ` && references(*[_type =="category" && singular == "${category}"][0]._id)`
    : ''


  const groqQuery = groq`*[
      _type == "blogPost"
      && defined(slug.current)
      && !(_id in path('drafts.**'))
      ${queryFilter}
      ${categoryFilter}
    ] | ${sortOrder}
    {
      ...,
      categories[]->{singular},
      authors[]->{_id,name},
    }
    ${limitFilter}`
  return await client.fetch(groqQuery)
}

export async function getPost(options = {}) {
  const { slug, category, order, campaignSlug } = options
  const campaignFilter = campaignSlug
    ? ` && campaign._ref in *[_type =="campaign" && slug.current == "${campaignSlug}"]._id`
    : ''
  const categoryFilter = category
    ? ` && category._ref in *[_type =="category" && singular == "${category}"]._id`
    : ''
  let orderFilter = category === 'session' && order && !isNaN(order) ? ` && order == ${order}` : ''
  let slugFilter = slug ? ` && slug.current == "${slug}"` : ''

  return await client.fetch(
    groq`*[_type == "post"
      ${campaignFilter}
      ${categoryFilter}
      ${orderFilter}
      ${slugFilter}
    ][0]{
      ...,
      "slug": slug.current,
      category->{title},
      campaign->{title, "slug": slug.current},
      authors[]->{name},
      body[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug.current,
            "campaignSlug": @.reference->campaign->slug.current,
            "category": @.reference->category->singular,
            "targetDocumentType": @.reference->_type,
            "targetDocumentId": @.reference->_id
          }
        }
      }
    }`
  )
}

export async function getBlogPost(options = {}) {
  const { slug } = options
  const slugFilter = slug ? ` && slug.current == "${slug}"` : ''

  return await client.fetch(
    groq`*[_type == "blogPost"
      ${slugFilter}
    ][0]{
      ...,
      "slug": slug.current,
      categories[]->{singular},
      authors[]->{name}
    }`
  )
}

export async function getCampaigns(options = {}) {
  let campaignSlugFilter = options.campaignSlug
    ? ` && slug.current == "${options.campaignSlug}"`
    : ''
  // only fetch a single campaign if a campaignSlug is provided
  let limitFilter = options.campaignSlug ? '[0]' : `[0...100]`

  const query = groq`*[_type == "campaign" ${campaignSlugFilter}] ${limitFilter}{
    title,
    system,
    "gm": gm->name,
    "slug": slug.current,
    "mainImage": mainImage{asset->{path,url}},
    body,
    "postCount": count(
      *[
        _type == "post"
        && !(_id in path('drafts.**'))
        && campaign._ref == ^._id
      ]),
    "pcNames":
      *[
        _type == "post"
        && !(_id in path('drafts.**'))
        && category._ref in *[_type == "category" && singular == "pc"]._id
        && campaign._ref == ^._id
      ].title
  }|order(title asc)`

  return await client.fetch(query).catch(console.error)
}

export async function getCategories(options = {}) {
  const { campaignSlug, documentType } = options
  const campaignFilter = campaignSlug
    ? ` && campaign._ref in *[_type =="campaign" && slug.current == "${campaignSlug}"]._id`
    : ''

  const query = groq`*[
      _type == "category"
      && count(
        *[
          _type == "${documentType}"
          && !(_id in path('drafts.**'))
          && references(^._id)
          ${campaignFilter}
        ]
      ) > 0
    ]{
      title,
      singular,
      plural,
      "postCount": count(
        *[
          _type == "${documentType}"
          && !(_id in path('drafts.**'))
          && references(^._id)
          ${campaignFilter}
        ]
      )
    }
    |order(singular asc)`
  return await client.fetch(query).catch(console.error)
}
