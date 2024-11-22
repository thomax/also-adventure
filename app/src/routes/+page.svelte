<script>
	import {page, navigating} from '$app/stores'
	import {SyncLoader} from 'svelte-loading-spinners'
	import PostInList from '../components/PostInList.svelte'
	import MarkdownCollection from '../components/MarkdownCollection.svelte'
	import CampaignInfo from '../components/CampaignInfo.svelte'
	import FilterWidget from '../components/FilterWidget.svelte'
	import NoData from '../components/NoData.svelte'

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

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://alsoadventure.org" />
	<meta property="og:site_name" content="Also, adventure" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:title" content="Also, adventure - index" />
</svelte:head>

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
			{#each data.posts as post}
				<PostInList {post} />
			{/each}
		{/if}
	{:else}
		<NoData />
	{/if}
</section>
