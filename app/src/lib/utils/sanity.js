import { createClient } from "@sanity/client"

import groq from "groq"

import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
} from "$env/static/public"

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
  throw new Error("Did you forget to run sanity init --env?")
}

export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2024-01-31", // date of setup
})

export async function getPosts(options = {}) {
  const { campaignSlug, category } = options
  const campaignFilter = campaignSlug ? ` && campaign._ref in *[_type =="campaign" && slug.current == "${campaignSlug}"]._id` : ''
  const categoryFilter = category ? ` && category._ref in *[_type =="category" && singular == "${category}"]._id` : ''
  // Limit to 10 posts if no campaign or category is selected
  const limitFilter = (!campaignSlug && !category) ? '[0...10]' : ''

  const query = groq`*[
      _type == "post"
      && defined(slug.current)
      && !(_id in path('drafts.**'))
      ${campaignFilter}
      ${categoryFilter}
    ]
    {
      ...,
      category->{title},
      campaign->{title},
      authors[]->{_id,name},
    } | order(_updatedAt desc)
    ${limitFilter}`
  return await client.fetch(query)
}

export async function getPost(slug) {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == "${slug}"][0]{
      ...,
      category->{title},
      campaign->{title, "slug": slug.current},
      authors[]->{name}
    }`,
    {
      slug,
    }
  )
}

export async function getCampaigns() {
  const query = groq`*[_type == "campaign"]{
    title,
    system,
    "gm": gm->name,
    "slug": slug.current,
    "mainImage": mainImage{asset->{path,url}},
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
  const { campaignSlug } = options
  const campaignFilter = campaignSlug ? ` && campaign._ref in *[_type =="campaign" && slug.current == "${campaignSlug}"]._id` : ''

  const query = groq`*[
      _type == "category"
    ]{
      title,
      singular,
      plural,
      "postCount": count(
        *[
          _type == "post"
          && !(_id in path('drafts.**'))
          && category._ref == ^._id
          ${campaignFilter}
        ]
      )
    }
    |order(singular asc)`
  return await client.fetch(
    query
  ).catch(console.error)
}