<script>
	import {page, navigating} from '$app/stores'
	import {SyncLoader} from 'svelte-loading-spinners'
	import PostInList from '../components/PostInList.svelte'
	import CampaignInfo from '../components/CampaignInfo.svelte'
	import FilterWidget from '../components/FilterWidget.svelte'
	import NoData from '../components/NoData.svelte'

	export let data
	let selectedCampaign = $page.url.searchParams.get('campaign')

	let campaigns = []
	let categories = []
	let campaign

	$: {
		selectedCampaign = $page.url.searchParams.get('campaign')
		if (data.campaigns?.length) {
			campaigns = [{title: 'All', slug: ''}, ...data.campaigns]
			campaign = campaigns.find((campaign) => campaign.slug === selectedCampaign)
		}
		if (data.categories?.length) {
			const postCount = data.categories.reduce((acc, category) => acc + category.postCount, 0)
			categories = [{title: 'All', slug: '', postCount}, ...data.categories]
		}
	}
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://adventure-source.vercel.app" />
	<meta property="og:site_name" content="The Source of Adventure" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:title" content="The Source of Adventure" />
</svelte:head>

<section id="widgetSection">
	{#if campaigns.length}
		<FilterWidget {campaigns} {categories} />
	{:else}
		Waiting for data...
	{/if}
</section>

{#if campaign}
	<CampaignInfo {campaign} />
{/if}

<section>
	{#if $navigating}
		<SyncLoader size="100" color="#000" unit="px" duration="1s" />
	{:else if data.posts?.length}
		{#each data.posts as post}
			<PostInList {post} />
		{/each}
	{:else}
		<NoData />
	{/if}
</section>
