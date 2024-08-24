import imageUrlBuilder from '@sanity/image-url'
import {client} from './sanity'

const builder = imageUrlBuilder(client)

function getWidth(options) {
	const {isInline, width} = options
	if (width) return width
	if (isInline) return 150
	return null
}

export function urlFor(source, options = {}) {
	const width = getWidth(options)
	const url = builder.image(source).fit('max').auto('format')
	return width ? url.width(width) : url
}
