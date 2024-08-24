<script>
	import {navigating} from '$app/stores'
	import {SyncLoader} from 'svelte-loading-spinners'
	import BlogPostInList from '../../components/BlogPostInList.svelte'
	import NoData from '../../components/NoData.svelte'

	export let data

	$: {
		console.log('blog root got data', data)
	}

	function onlyUnique(value, index, array) {
		return array.indexOf(value) === index
	}

</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://adventure-source.vercel.app" />
	<meta property="og:site_name" content="The Source of Adventure" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:title" content="The Source of Adventure" />
</svelte:head>

<section>
	{#if $navigating}
		<SyncLoader size="100" color="#000" unit="px" duration="1s" />
	{:else if data.blogPosts?.length}
		<div>{data.categories.filter(onlyUnique).join(', ')}</div>
		{#each data.blogPosts as blogPost}
			<BlogPostInList {blogPost} />
		{/each}
	{:else}
		<NoData />
	{/if}
</section>
