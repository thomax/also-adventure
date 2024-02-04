<script>
	import {browser} from '$app/environment'
	import Select from './Select.svelte'
	export let campaigns = []
	export let categories = []

	let {selectedCampaignIndex, selectedCategoryIndex} = getSelections()
	let previousCampaignIndex = selectedCampaignIndex
	let previousCategoryIndex = selectedCategoryIndex

	$: {
		if (browser) {
			const selectedCampaign = campaigns[selectedCampaignIndex].slug
			const selectedCategory = categories[selectedCategoryIndex].singular
			if (
				selectedCampaignIndex !== previousCampaignIndex ||
				selectedCategoryIndex !== previousCategoryIndex
			) {
				updateQueryParams(selectedCampaign, selectedCategory)
				previousCampaignIndex = selectedCampaignIndex
				previousCategoryIndex = selectedCategoryIndex
			}
		}
	}

	function updateQueryParams(selectedCampaign, selectedCategory) {
		const url = new URL(window.location.href)
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
		//window.history.pushState(null, null, url)
		window.location.href = url
	}

	function getSelections() {
		if (!browser) return {}
		const url = new URL(window.location.href)
		const selectedCampaign = url.searchParams.get('campaign')
		const selectedCategory = url.searchParams.get('category')
		const campaignIndex = campaigns.findIndex((campaign) => campaign.slug === selectedCampaign)
		const categoryIndex = categories.findIndex((category) => category.singular === selectedCategory)
		return {
			selectedCampaignIndex: campaignIndex < 0 ? 0 : campaignIndex,
			selectedCategoryIndex: categoryIndex < 0 ? 0 : categoryIndex
		}
	}
</script>

<div class="filter-widget-container">
	<div class="div1">Campaign</div>
	<div class="div2">Category</div>
	<div class="div3">
		<Select options={campaigns} bind:value={selectedCampaignIndex} />
	</div>
	<div class="div4">
		<Select options={categories} bind:value={selectedCategoryIndex} />
	</div>
</div>

<style>
	.filter-widget-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	.div1 {
		grid-area: 1 / 1 / 2 / 2;
	}
	.div2 {
		grid-area: 1 / 2 / 2 / 3;
	}
	.div3 {
		grid-area: 2 / 1 / 3 / 2;
	}
	.div4 {
		grid-area: 2 / 2 / 3 / 3;
	}
</style>
