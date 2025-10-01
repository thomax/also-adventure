<script>
	import {page} from '$app/stores'
	import {onMount} from 'svelte'

	import Select from './Select.svelte'
	import SearchInput from './SearchInput.svelte'
	import {getSelectionIndices, navigateWithUpdatedUrl} from '$lib/utils/urlAccess'
	export const ssr = false

	export let campaigns = []
	export let categories = []
	const enableSelectCampaign = $page.url.pathname === '/'
	const enableSelectCategory = $page.url.pathname === '/' || $page.url.pathname === '/blog'
	let currentSearchParams
	let previousSearchParams
	let selectedCampaignIndex = 0
	let selectedCategoryIndex = 0
	let isWikiView = $page.url.searchParams.get('view') === 'wiki'

	let enableSearch = selectedCampaignIndex > 0 && !isWikiView && ($page.url.pathname === '/' || $page.url.pathname === '/blog')



	function haveSearchParamsChanged(options = {}) {
		currentSearchParams = JSON.stringify(options, null, 0)
		return previousSearchParams !== currentSearchParams
	}

	$: {
		const options = {
			selectedCampaignIndex,
			selectedCategoryIndex,
			query: $page.url.searchParams.get('query')
		}

		enableSearch = selectedCampaignIndex > 0 && !isWikiView && ($page.url.pathname === '/' || $page.url.pathname === '/blog')

		// This check is necessary to avoid an infinite loop
		if (haveSearchParamsChanged(options)) {
			const newState = {}
			if (campaigns?.length) {
				const selectedCampaign = campaigns[selectedCampaignIndex].slug
				newState.campaign =
					selectedCampaign && selectedCampaignIndex !== 0 ? selectedCampaign : null
			}
			if (categories?.length) {
				const selectedCategory = categories[selectedCategoryIndex]?.singular
				newState.category =
					selectedCategory && selectedCategoryIndex !== 0 ? selectedCategory : null
			}
			previousSearchParams = currentSearchParams
			navigateWithUpdatedUrl($page.url.searchParams, newState)
		}
	}

	onMount(() => {
		;({selectedCampaignIndex, selectedCategoryIndex} = getSelectionIndices(campaigns, categories))
	})
</script>

<div class="filterWidgetContainer">
	{#if enableSelectCampaign && campaigns.length}
		<div>
			<h4 class="filterHeader">Campaign</h4>
			<Select options={campaigns} bind:value={selectedCampaignIndex} />
		</div>
	{/if}
	{#if enableSelectCategory && categories.length}
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
