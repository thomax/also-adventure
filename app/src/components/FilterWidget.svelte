<script>
	import {page} from '$app/stores'

	import Select from './Select.svelte'
	import {getSelectionIndices, navigateWithUpdatedUrl} from '$lib/utils/urlAccess'
	export const ssr = false

	export let campaigns = []
	export let categories = []

	// There is a bug here, which kicks in when user changes campaign -> The category will keep the index and likely get a new value
	let {selectedCampaignIndex, selectedCategoryIndex} = getSelectionIndices(campaigns, categories)

	$: {
		const selectedCampaign = campaigns[selectedCampaignIndex].slug
		const selectedCategory = categories[selectedCategoryIndex]?.singular
		const newState = {}

		newState.campaign = selectedCampaign && selectedCampaignIndex !== 0 ? selectedCampaign : null

		newState.category = selectedCategory && selectedCategoryIndex !== 0 ? selectedCategory : null

		navigateWithUpdatedUrl($page.url.searchParams, newState)
	}
</script>

<div class="filter-widget-container">
	<div class="div1">Campaign</div>
	<div class="div2">Category</div>
	<div class="div3">
		{#if campaigns.length}
			<Select options={campaigns} bind:value={selectedCampaignIndex} />
		{:else}
			No matching data
		{/if}
	</div>
	<div class="div4">
		{#if categories.length}
			<Select options={categories} bind:value={selectedCategoryIndex} />
		{:else}
			No categories found for this campaign
		{/if}
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
