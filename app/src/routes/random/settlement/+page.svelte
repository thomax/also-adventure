<script>
	import {invalidateAll} from '$app/navigation'
	import {SyncLoader} from 'svelte-loading-spinners'

	export let data

	let settlementAttributes

	$: {
		settlementAttributes = data.data
	}

	const reroll = async () => {
		data = null
		invalidateAll()
	}
</script>

<p>
	<button id="roll" name="reroll" on:click={reroll} disabled={!data}>🎲</button>
</p>

<section id="widgetSection">
	{#if settlementAttributes}
		{#each settlementAttributes as attribute}
			<h4>{attribute.title.split(' ')[1]}: {attribute.result}</h4>
		{/each}
	{:else}
		<SyncLoader size="100" color="#000" unit="px" duration="1s" />
	{/if}
</section>
{#if data}
	<!-- debug info -->
	<h5>Debug info</h5>
	<pre>{JSON.stringify(settlementAttributes, null, 2)}</pre>
{/if}

<style>
	pre {
		background-color: #f4f4f4;
		padding: 10px;
		white-space: pre-wrap;
	}

	button {
		font-size: 1.5em;
	}

	#roll:hover {
		/* Start the shake animation and make the animation last for 0.5 seconds */
		animation: shake 0.9s;

		/* When the animation is finished, start again */
		animation-iteration-count: infinite;
	}

	@keyframes shake {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
</style>
