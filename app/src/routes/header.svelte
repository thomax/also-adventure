<script>
	import { browser } from '$app/environment'
	import SearchInput from '../components/SearchInput.svelte'
</script>

<header class="header">
	<a class="header__title" href="/">The Source of Adventure</a>
	{#if browser && window.location.pathname !== '/random/item'}
		<!-- A quick hack to hide the search input on the random item page -->
		<SearchInput />
	{/if}
</header>
