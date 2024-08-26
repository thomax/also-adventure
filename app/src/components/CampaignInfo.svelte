<script lang="javascript">
	export let campaign
	let campaignInfoElement

	$: {
		if (campaignInfoElement && campaign.mainImage) {
			campaignInfoElement.style.background = `url('${campaign.mainImage.asset.url}') no-repeat top center`
			campaignInfoElement.style.backgroundSize = 'cover'
		}
	}
</script>

<section id="campaignInfo" bind:this={campaignInfoElement}>
	<div class="row">
		<span class="label">Campaign</span><span class="value">{campaign.title}</span>
	</div>
	<div class="row"><span class="label">GM</span><span class="value">{campaign.gm}</span></div>
	<div class="row">
		<span class="label">System</span><span class="value">{campaign.system}</span>
	</div>
	<div class="row">
		<span class="label">PCs</span><span class="value"
			>{campaign.pcNames.sort((a, b) => a > b).join(', ')}</span
		>
	</div>
</section>
