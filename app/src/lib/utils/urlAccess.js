import { browser } from '$app/environment'

export function updateQueryParams(selectedCampaign, selectedCategory) {
  const url = new URL(window.location.origin)
  if (selectedCampaign) {
    url.searchParams.set('campaign', selectedCampaign)
  } else {
    url.searchParams.delete('campaign')
  }
  if (selectedCategory) {
    url.searchParams.set('category', selectedCategory)
  } else {
    url.searchParams.delete('category')
  }
  window.location.href = url
}

export function getSelectionIndices(campaigns, categories) {
  if (!browser) return {} // no sense in parsing a URL on the server
  const { selectedCampaign, selectedCategory } = getUrlParams()
  const campaignIndex = campaigns.findIndex((campaign) => campaign.slug === selectedCampaign)
  const categoryIndex = categories.findIndex((category) => category.singular === selectedCategory)
  return {
    selectedCampaignIndex: campaignIndex < 0 ? 0 : campaignIndex,
    selectedCategoryIndex: categoryIndex < 0 ? 0 : categoryIndex
  }
}

export function getUrlParams() {
  if (!browser) return {} // no sense in parsing a URL on the server
  const url = new URL(window.location.href)
  return {
    selectedCampaign: url.searchParams.get('campaign'),
    selectedCategory: url.searchParams.get('category')
  }
} 
