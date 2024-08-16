<script>
	import { invalidateAll } from '$app/navigation';
	import {SyncLoader} from 'svelte-loading-spinners'
	export let data
	let item
	$: {
		item = data?.itemAsJson
	}

	function reroll() {
		data = null
		invalidateAll()
	}
</script>

<section id="widgetSection">
	<h2>Random items</h2>
	<h4><button name="reroll" on:click={reroll} disabled={!data}>Reroll</button></h4>

	{#if !data}
		<SyncLoader size="100" color="#000" unit="px" duration="1s" />
	{:else if data}
		{#each data.imageUrls as url}
			<img src={url} alt={item.name}/>	
		{/each}
		<h3>{item.name}</h3>
		<p>{item.description}</p>
		<p>{item.mechanics}</p>
		<pre>{JSON.stringify(data.itemAsKeywords, null, 2)}</pre>
		<pre>{JSON.stringify(data.prompt, null, 2)}</pre>
		<pre>{JSON.stringify(data.imagePrompt, null, 2)}</pre>
	{/if}
</section>

<style>
	pre {
		background-color: #f4f4f4;
		padding: 10px;
		white-space: pre-wrap;
	}
	img {
		box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
		margin: 10px;
		height: 30vh;
		border-radius: 3px;
	}
</style>