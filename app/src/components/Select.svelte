<script>
	export let options = []
	export let value
</script>

<select bind:value>
	{#each options as option, optionIndex}
		<option value={optionIndex}>{option.title}</option>
	{/each}
</select>
