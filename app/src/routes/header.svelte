<script>
	import { browser } from '$app/environment'
	import SearchInput from '../components/SearchInput.svelte'

	let currentPath = browser ? window.location.pathname : undefined;

	$: {
		currentPath = browser ? window.location.pathname : undefined;
	}

</script>

<header class="header">
	<a class="header__title" href="/">The Source of <a href="/random/item" id="randomItemLink">Adventure</a></a>
	{#if currentPath !== '/random/item'}
		<!-- A quick hack to hide the search input on the random item page -->
		<SearchInput />
	{/if}
</header>

<style>
	#randomItemLink {
		text-decoration: none;
		color: rgb(16, 17, 18);
	}
</style>
