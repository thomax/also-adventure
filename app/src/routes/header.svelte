<script>
	import { browser } from '$app/environment'
	import SearchInput from '../components/SearchInput.svelte'

	let currentPath = browser ? window.location.pathname : undefined;

	$: currentPath = browser ? window.location.pathname : undefined;

</script>

<header class="header">
	<a class="header__title" href="/">The Source of Adventure</a>
	{#if currentPath !== '/random/item'}
		<!-- A quick hack to hide the search input on the random item page -->
		<SearchInput />
	{/if}
</header>
<a href="/random/item" id="randomItemLink">A random item</a>

<style>
	#randomItemLink {
		position: absolute;
		top: 10px;
		right: 20%;
		font-size: 0.5rem;
		text-decoration: none;
		color: rgba(16, 17, 18, 0.8);
		border-bottom: 1px solid transparent;
	}

	#randomItemLink:hover {
		border-color: black;
	}
</style>
