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

<p><button name="reroll" on:click={reroll} disabled={!data}>🎲</button></p>

<section id="widgetSection">

	{#if !data}
		<SyncLoader size="100" color="#000" unit="px" duration="1s" />
	{:else if data}
		<h4>{item.name}</h4>
		<p>{item.description}</p>
			{#each data.imageUrls as url}
				<img src={url} alt={item.name}/>	
			{/each}
			<h4>Mechanics</h4>
			<p>{item.mechanics}</p>
	{/if}
</section>
{#if data}
	<!-- debug info -->
	<h5>Debug info</h5>
	<pre>{JSON.stringify(data.itemAsKeywords, null, 2)}</pre>
	<pre>{JSON.stringify(data.prompt, null, 2)}</pre>
	<pre>{JSON.stringify(data.imagePrompt, null, 2)}</pre>
{/if}

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
	button {
		font-size: 1.5em;
	}

	button:hover {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

</style>