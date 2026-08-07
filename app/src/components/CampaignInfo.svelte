<script lang="javascript">
	import {systems} from '$lib/utils/shared.js'
	import {urlFor} from '$lib/utils/image'
	import {PortableText} from '@portabletext/svelte'

	export let campaign
	let campaignInfoElement
	let expanded = false

	$: {
		if (campaignInfoElement && campaign.mainImage) {
			const imageUrl = campaign.mainImage
				? urlFor(campaign.mainImage).width(1000).fit('max').url()
				: ''
			campaignInfoElement.style.background = `url('${imageUrl}') no-repeat top center`
			campaignInfoElement.style.backgroundSize = 'cover'
		}
	}

	function blocksToText(blocks, opts = {}) {
		const options = Object.assign({}, {nonTextBehavior: 'remove'}, opts)
		return blocks
			.map(block => {
				if (block._type !== 'block' || !block.children) {
					return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
				}
				return block.children.map(child => child.text).join('')
			})
			.join('\n\n')
	}
</script>

<section id="campaignInfo" bind:this={campaignInfoElement}>
	<div class="row" title={blocksToText(campaign.body)}>
		<span class="label">Campaign</span>
		<span class="value"
			>{campaign.title} [{systems.find(s => s.value === campaign.system)?.title}]</span
		>
	</div>
	<div class="row">
		<span class="label">GM</span>
		<span class="value">{campaign.gm}</span>
	</div>
	<div class="row">
		<span class="label">PCs</span>
		<span class="value">{campaign.pcNames.sort((a, b) => a > b).join(', ')}</span>
	</div>
	<div class="row description">
		<span class="label">Description</span>
		<span class="value">
			{#if expanded}
				<span class="body"><PortableText value={campaign.body} /></span>
			{:else}
				<span class="body teaser">{blocksToText(campaign.body)}</span>
			{/if}
			<button on:click={() => (expanded = !expanded)}>
				{expanded ? 'less' : 'more'}
			</button>
		</span>
	</div>
</section>

<style>
	.description {
		align-items: flex-start;
	}

	.description .value {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.description .body {
		display: block;
		width: 100%;
	}

	.description .body > :global(:first-child) {
		margin-top: 0;
	}

	.description .body > :global(:last-child) {
		margin-bottom: 0;
	}

	.description .teaser {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.description button {
		align-self: flex-start;
		margin-top: 0.5rem;
		padding: 0.2rem 0.5rem 0.3rem 0.5rem;
		font-size: 0.875rem;
		background: rgba(48, 48, 48, 0.1);
		border: 1px solid rgba(48, 48, 48, 0.3);
		border-radius: 3px;
		cursor: pointer;
		color: inherit;
	}

	.description button:hover {
		background: rgba(48, 48, 48, 0.2);
	}
</style>
