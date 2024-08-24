<script>
	import {page} from '$app/stores'

	import Select from './Select.svelte'
	import SearchInput from './SearchInput.svelte'

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

<div class="filterWidgetContainer">
	<div>
		<h4 class="filterHeader">Campaign</h4>
		{#if campaigns.length}
			<Select options={campaigns} bind:value={selectedCampaignIndex} />
		{:else}
			No matching data
		{/if}
	</div>
	<div>
		<h4 class="filterHeader">Category</h4>
		{#if categories.length}
			<Select options={categories} bind:value={selectedCategoryIndex} />
		{:else}
			No categories found for this campaign
		{/if}
	</div>
	<div>
		<h4 class="filterHeader">Looking for</h4>
		<SearchInput />
	</div>
</div>

<style>
	.filterWidgetContainer {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	.filterHeader {
		margin: 0;
		padding: 0;
		font-size: 1rem;
	}
</style>
