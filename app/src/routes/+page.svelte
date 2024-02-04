<script>
	import Post from '../components/Post.svelte'
	import FilterWidget from '../components/FilterWidget.svelte'
	import Welcome from '../components/Welcome.svelte'
	export let data
</script>

<section>
	{#if data.campaigns.length && data.categories.length}
		<FilterWidget campaigns={data.campaigns} categories={data.categories} />
	{:else}
		Waiting for data...
	{/if}
</section>
<section>
	{#if data.posts.length}
		{#each data.posts as post}
			<Post {post} />
		{/each}
	{:else}
		<Welcome />
	{/if}
</section>
