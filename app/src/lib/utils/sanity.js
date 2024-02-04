import { createClient } from "@sanity/client";

import groq from "groq";

import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
} from "$env/static/public";

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
  throw new Error("Did you forget to run sanity init --env?");
}

export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2024-01-31", // date of setup
});

export async function getPosts(options = {}) {
  const { campaignSlug, category } = options
  const campaignFilter = campaignSlug ? ` && campaign._ref in *[_type =="campaign" && slug.current == "${campaignSlug}"]._id` : ''
  const categoryFilter = category ? ` && category._ref in *[_type =="category" && singular == "${category}"]._id` : ''
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
      authors[]->{_id,name}
    } | order(order desc, _createdAt desc) `
  return await client.fetch(query)
}

export async function getPost(slug) {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == "${slug}"][0]{
      ...,
      category->{title},
      campaign->{title},
      authors[]->{name}
    }`,
    {
      slug,
    }
  );
}

export async function getCampaigns() {
  return await client.fetch(
    groq`*[_type == "campaign"]{title, "slug": slug.current}|order(title asc)`
  ).catch(console.error)
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
