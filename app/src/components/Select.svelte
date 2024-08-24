<script>
	export let options = []
	export let value

</script>

<select bind:value class="dropdownSelect">
	{#each options as option, optionIndex}
		<option value={optionIndex}>{option.title}{option.postCount ? ` [${option.postCount}]` : ''}</option>
	{/each}
</select>
