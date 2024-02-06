<script>
	import {browser} from '$app/environment'
	import Select from './Select.svelte'
	import {getSelectionIndices, updateQueryParams} from '../lib/utils/urlAccess'
	export let campaigns = []
	export let categories = []

	let {selectedCampaignIndex, selectedCategoryIndex} = getSelectionIndices(campaigns, categories)
	let previousCampaignIndex = selectedCampaignIndex
	let previousCategoryIndex = selectedCategoryIndex

	$: {
		if (browser) {
			const selectedCampaign = campaigns[selectedCampaignIndex].slug
			const selectedCategory = categories[selectedCategoryIndex]?.singular

			// keep track of previous choices and only update the URL if they change
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
