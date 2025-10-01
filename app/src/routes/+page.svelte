<script>
	import ViewToggle from '../components/ViewToggle.svelte'
	import ListView from '../components/ListView.svelte'
	import WikiView from '../components/WikiView.svelte'

	export let data
	
	$: isWikiView = data.isWikiView || false
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://alsoadventure.org" />
	<meta property="og:site_name" content="Also, adventure" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:title" content="Also, adventure - {isWikiView ? 'Min Kampanje-Wiki' : 'Index'}" />
</svelte:head>

<div class="page-container" class:wiki-mode={isWikiView}>
	{#if isWikiView}
		<WikiView {data} />
	{:else}
		<ListView {data} />
	{/if}
</div>

<style>
	.page-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.page-container.wiki-mode {
		/* Break out of parent container constraints */
		width: 90vw;
		max-width: none;
		margin: 0 auto;
		/* Center it by calculating the offset needed */
		margin-left: calc((90vw - 100%) / -2);
		margin-right: calc((90vw - 100%) / -2);
	}

	@media (max-width: 768px) {
		.page-container {
			padding: 0 0.5rem;
		}
	}
</style>