import {error} from '@sveltejs/kit'

import {composeItemFrom} from '$lib/utils/randomizer.js'

export const load = async ({params}) => {
	const item = await composeItemFrom()
	return item
}
