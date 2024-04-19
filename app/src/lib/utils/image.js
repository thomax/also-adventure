import imageUrlBuilder from "@sanity/image-url"

import { client } from "./sanity"

const builder = imageUrlBuilder(client)

function getWidth(options) {
  const { isInline, width } = options
  if (width) return width
  return isInline ? 150 : 750
}

export function urlFor(source, options = {}) {
  const width = getWidth(options)
  return builder.image(source).width(width).fit('max').auto('format')
}