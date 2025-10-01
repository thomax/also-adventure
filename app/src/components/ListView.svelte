<script>
	import {page, navigating} from '$app/stores'
	import {SyncLoader} from 'svelte-loading-spinners'
	import PostInList from './PostInList.svelte'
	import MarkdownCollection from './MarkdownCollection.svelte'
	import CampaignInfo from './CampaignInfo.svelte'
	import FilterWidget from './FilterWidget.svelte'
	import NoData from './NoData.svelte'
	import ViewToggle from './ViewToggle.svelte'

	export let data
	const renderMode = $page.url.searchParams.get('render') || 'web'
	let reverseOrder = $page.url.searchParams.get('reverse') === 'true'
	let selectedCampaign = $page.url.searchParams.get('campaign')

	let campaigns = []
	let categories = []
	let campaign

	$: {
		selectedCampaign = $page.url.searchParams.get('campaign')
		if (data.campaigns?.length) {
			campaigns = [{title: 'All', slug: ''}, ...data.campaigns]
			campaign = campaigns.find(campaign => campaign.slug === selectedCampaign)
		}
		if (data.categories?.length) {
			const postCount = data.categories.reduce((acc, category) => acc + category.postCount, 0)
			categories = [{title: 'All', slug: '', postCount}, ...data.categories]
		}
	}
</script>

{#if selectedCampaign}
	<ViewToggle />
{/if}

<section id="widgetSection">
	<FilterWidget {campaigns} {categories} />
</section>

{#if campaign}
	<CampaignInfo {campaign} />
{/if}

<section>
	{#if $navigating}
		<SyncLoader size="100" color="#000" unit="px" duration="1s" />
	{:else if data.posts?.length}
		{#if renderMode === 'markdown'}
			<MarkdownCollection posts={data.posts} />
		{:else}
			{#each reverseOrder ? data.posts.reverse() : data.posts as post}
				<PostInList {post} />
			{/each}
		{/if}
	{:else}
		<NoData />
	{/if}
</section>