<script>
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {beforeNavigate, afterNavigate} from '$app/navigation'
	import {updateUrlParams, navigateWithParams} from '$lib/utils/urlAccess'
	const stuffToLookFor = ['Something', 'My balls', 'Experience', 'XP',  'Loot', 'Phat loot', 'Credibility', 'A way out', 'A better deal', 'An answer to the age old question', 'Crabs', 'Anything, really', 'A quiet corner', 'That of which dreams are made', 'The question to 42', 'A way to make this work', 'A way to make this stop', 'Improved Credibility', 'Solutions, not problems', 'Peace or love, whichever comes first', 'Treasure', 'Whatever may come along', "Un croque monsieur, s'il vous plait", 'Una cerveza muy fria', 'Mindfulness', 'ward to seeing you', 'Churros', 'Waldo', 'The chance to be a hero', 'A shave', 'The best of times', 'Cash, preferably', 'The likelihood of seeing the same placeholder three times in a row', 'A gift horse with clean dental record', 'Answers, dammit!', 'A substance suitable for the occasion', 'A huge glob of melted cheddar', 'An improbability drive', 'Time. It should be around here somewhere.', 'Shiny baubles']
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

	function getRandomPlaceholder() {
		return stuffToLookFor[Math.floor(Math.random() * stuffToLookFor.length)]
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
	<input
		class="seachInputField"
		bind:value={searchInput}
		placeholder={getRandomPlaceholder()}
		on:input={handleInputFieldChange}
	/>
</section>
