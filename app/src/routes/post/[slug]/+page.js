import { error } from "@sveltejs/kit";

import { getPost } from "../../../lib/utils/sanity.js";

export const ssr = false;

export const load = async ({ params }) => {
  const post = await getPost(params.slug);
  if (post) return post;

  throw error(404, "Not found");
};
