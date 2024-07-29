<script>
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {beforeNavigate, afterNavigate} from '$app/navigation'
	import {updateUrlParams, navigateWithParams} from '$lib/utils/urlAccess'
	const wait = 500
	let searchInput
	let focused
	let timeout

	function handleInputFieldChange(searchTerm) {
		let query = searchInput?.trim()
		if (!query || query === '') {
			query = null
		}
		// update url
		const newParams = updateUrlParams($page.url.searchParams, {query})
		// navigate if no input for .5 seconds
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => navigateWithParams(newParams), wait)
	}

	beforeNavigate(() => {
		focused = document.activeElement
	})

	afterNavigate(({type}) => {
		if (type === 'goto') {
			focused?.focus()
		}
	})

	onMount(() => {
		if ($page.url.searchParams.has('query')) {
			searchInput = $page.url.searchParams.get('query')
		}
	})
</script>

<section id="searchInputSection">
	Looking for
	<input
		class="seachInputField"
		bind:value={searchInput}
		placeholder="Something..."
		on:input={handleInputFieldChange}
	/>
</section>
