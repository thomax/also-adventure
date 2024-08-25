<script>
	import {page} from '$app/stores'

	import Select from './Select.svelte'
	import SearchInput from './SearchInput.svelte'

	import {getSelectionIndices, navigateWithUpdatedUrl} from '$lib/utils/urlAccess'
	export const ssr = false

	export let campaigns = []
	export let categories = []
	const enableSelection = $page.url.pathname === '/'
	const enableSearch = $page.url.pathname === '/' || $page.url.pathname === '/blog'

	// There is a bug here, which kicks in when user changes campaign -> The category will keep the index and likely get a new value
	let {selectedCampaignIndex, selectedCategoryIndex} = getSelectionIndices(campaigns, categories)

	$: {
		const newState = {}
		if (campaigns?.length) {
			const selectedCampaign = campaigns[selectedCampaignIndex].slug
			newState.campaign = selectedCampaign && selectedCampaignIndex !== 0 ? selectedCampaign : null
		}
		if (categories?.length) {
			const selectedCategory = categories[selectedCategoryIndex]?.singular
			newState.category = selectedCategory && selectedCategoryIndex !== 0 ? selectedCategory : null
		}
		navigateWithUpdatedUrl($page.url.searchParams, newState)
	}

</script>

<div class="filterWidgetContainer">
	{#if enableSelection && campaigns.length}
		<div>
			<h4 class="filterHeader">Campaign</h4>
			<Select options={campaigns} bind:value={selectedCampaignIndex} />
		</div>
	{/if}
	{#if enableSelection && categories.length}
		<div>
			<h4 class="filterHeader">Category</h4>
			<Select options={categories} bind:value={selectedCategoryIndex} />
		</div>
	{/if}
	{#if enableSearch}
		<div>
			<h4 class="filterHeader">Looking for</h4>
			<SearchInput />
		</div>
	{/if}
</div>

<style>
	.filterWidgetContainer {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(auto-fit, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 15px;
	}
	.filterHeader {
		margin: 0;
		padding-bottom: 3px;
		font-size: 1rem;
	}
</style>
