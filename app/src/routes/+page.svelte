<script>
	import {onMount} from 'svelte'
	import Post from '../components/Post.svelte'
	import FilterWidget from '../components/FilterWidget.svelte'
	import NoData from '../components/NoData.svelte'
	import {getUrlParams} from '../lib/utils/urlAccess'
	export let data
	const {selectedCampaign, selectedCategory} = getUrlParams()
	let campaigns = []
	let categories = []
	let campaign
	let campaignInfo

	$: {
		if (data.campaigns.length) {
			campaigns = [{title: 'All', slug: ''}, ...data.campaigns]
			campaign = campaigns.find((campaign) => campaign.slug === selectedCampaign)
		}
		if (data.categories.length) {
			const postCount = data.categories.reduce((acc, category) => acc + category.postCount, 0)
			categories = [{title: 'All', slug: '', postCount}, ...data.categories]
		}
	}

	onMount(() => {
		if (campaignInfo) {
			campaignInfo.style.background = `url('${campaign.mainImage.asset.url}') no-repeat top center`
			campaignInfo.style.backgroundSize = 'cover'
		}
	})
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
	<section id="campaignInfo" bind:this={campaignInfo}>
		<div class="row">
			<span class="label">Campaign</span><span class="value">{campaign.title}</span>
		</div>
		<div class="row"><span class="label">GM</span><span class="value">{campaign.gm}</span></div>
		<div class="row">
			<span class="label">System</span><span class="value">{campaign.system}</span>
		</div>
		<div class="row">
			<span class="label">PCs</span><span class="value"
				>{campaign.pcNames.reverse().join(', ')}</span
			>
		</div>
	</section>
{/if}

<section>
	{#if data.posts.length}
		{#each data.posts as post}
			<Post {post} />
		{/each}
		{#if !selectedCampaign && !selectedCategory}
			<div id="pleaseApplyFilter">Please select campaign and/or category to see more posts</div>
		{/if}
	{:else}
		<NoData />
	{/if}
</section>
