<script>
	import {navigating} from '$app/stores'
	import {SyncLoader} from 'svelte-loading-spinners'
	import FilterWidget from '../../components/FilterWidget.svelte'
	import BlogPostInList from '../../components/BlogPostInList.svelte'
	import NoData from '../../components/NoData.svelte'

	export let data
	let categories = []

	$: {
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
	<meta property="og:title" content="Also, adventure - blog" />
</svelte:head>

<section id="widgetSection">
	<FilterWidget campaigns={null} {categories} />
</section>

<section>
	{#if $navigating}
		<SyncLoader size="100" color="#000" unit="px" duration="1s" />
	{:else if data.blogPosts?.length}
		{#each data.blogPosts as blogPost}
			<BlogPostInList {blogPost} />
		{/each}
	{:else}
		<NoData />
	{/if}
</section>
