<script>
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {beforeNavigate, afterNavigate} from '$app/navigation'
	import {updateUrlParams, navigateWithParams} from '$lib/utils/urlAccess'
	const stuffToLookFor = ['My balls', 'Experience', 'XP',  'Loot', 'Phat loot', 'Credibility', 'A way out', 'A better deal', 'An answer to the age old question', 'Crabs', 'Anything, really', 'A quiet corner', 'That of which dreams are made', 'The question to 42', 'A way to make this work', 'A way to make this stop', 'Improved Credibility', 'Solutions, not problems', 'Peace or love, whichever comes first', 'Treasure', 'Whatever may come along', "Un croque monsieur, s'il vous plait", 'Una cerveza muy fria', 'Mindfulness', 'ward to seeing you', 'Churros', 'Waldo', 'The chance to be a hero', 'A shave', 'The best of times', 'Cash, preferably', 'The likelihood of seeing the same placeholder three times in a row', 'A gift horse with a clean dental record', 'Answers, dammit!', 'A substance suitable for the occasion', 'A glob of melted cheddar', 'An improbability drive', 'Time. It should be around here somewhere.', 'Shiny baubles', 'My next gig', 'Vintage contraceptives', 'Purrfection', '...never mind, I found it', 'Something fast, cheap and good', '🥦', '🌈', '🧻']
	const delay = 500
	let searchInputValue
	let searchInputElement
	let focused
	let timeout

	function handleInputFieldChange(searchTerm) {
		let query = searchInputValue?.trim()
		if (!query || query === '') {
			query = null
		}
		// update url
		const newParams = updateUrlParams($page.url.searchParams, {query})
		// navigate if no input for .5 seconds
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => navigateWithParams(newParams), delay)
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
			searchInputValue = $page.url.searchParams.get('query')
		}
	})
</script>

<section id="searchInputSection">
	<input
		class="seachInputField"
		bind:value={searchInputValue}
		bind:this={searchInputElement}
		placeholder={getRandomPlaceholder()}
		on:input={handleInputFieldChange}
		on:focus={() => searchInputElement.placeholder = ''}
		on:blur={() => searchInputElement.placeholder = getRandomPlaceholder()}
	/>
</section>
