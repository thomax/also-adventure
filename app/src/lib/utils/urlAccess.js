import {browser} from '$app/environment'
import {goto} from '$app/navigation'

export function navigateWithUpdatedUrl(currentSearchParams, newState) {
	const newParamsAsString = updateUrlParams(currentSearchParams, newState)
	navigateWithParams(newParamsAsString)
}

export function updateUrlParams(currentSearchParams, newState) {
	const newParams = new URLSearchParams(currentSearchParams)
	const {campaign, category, query} = newState

	if (campaign) {
		newParams.set('campaign', campaign)
	} else {
		newState.hasOwnProperty('campaign') && newParams.delete('campaign')
	}
	if (category) {
		newParams.set('category', category)
	} else {
		newState.hasOwnProperty('category') && newParams.delete('category')
	}
	if (query) {
		newParams.set('query', query)
	} else {
		newState.hasOwnProperty('query') && newParams.delete('query')
	}
	return `?${newParams.toString()}`
}

export function navigateWithParams(paramsAsString) {
	goto(paramsAsString)
}

export function getSelectionIndices(campaigns, categories) {
	if (!browser) return {} // no sense in parsing a URL on the server
	const result = {
		selectedCampaignIndex: 0,
		selectedCategoryIndex: 0
	}
	const url = new URL(window.location.href)
	if (campaigns?.length) {
		const selectedCampaign = url.searchParams.get('campaign')
		const campaignIndex = campaigns.findIndex(campaign => campaign.slug === selectedCampaign)
		result.selectedCampaignIndex = campaignIndex < 0 ? 0 : campaignIndex
	}
	if (categories?.length) {
		const selectedCategory = url.searchParams.get('category')
		const categoryIndex = categories.findIndex(category => category.singular === selectedCategory)
		result.selectedCategoryIndex = categoryIndex < 0 ? 0 : categoryIndex
	}
	return result
}
