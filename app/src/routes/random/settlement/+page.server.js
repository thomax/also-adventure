
import { composeSettlementFrom } from '$lib/utils/settlementRandomizer.js'

export const load = async ({ params }) => {
	const settlement = await composeSettlementFrom()
	return settlement
}
