<script>
  import { page } from '$app/stores'
	import bannerImage from '$lib/assets/banner.jpg'
	import {onMount} from 'svelte'

	let headerElement
	let currentPath = '/'

	$: {
		currentPath = $page.url.pathname
	}

	onMount(() => {
		headerElement.style.background = `url('${bannerImage}') no-repeat top center`
		headerElement.style.backgroundSize = 'cover'
	})
</script>


<header class="header" bind:this={headerElement}>
	<div id="titleContainer">
		<a class="header__title" href="/" title="RPG morsels for the picking">Also, adventure</a>
	</div>
	<div id="mainNavigation">
		<a class:selected={currentPath === '/'} href="/">Posts</a>
		<a class:selected={currentPath === '/blog'} href="/blog">Blog</a>
		<a class:selected={currentPath === '/random/item'} href="/random/item">A random item</a>
	</div>
</header>


<style>

	#titleContainer {
		margin: 50px 0px 50px 0px;
		background-color: rgba(75, 75, 75, 0.547);
		text-align: center; /* Center the title text */
		display: flex;
		justify-content: center; /* Center the content horizontally */
		align-items: center;
		padding: 5px 20px;
	}

	@media (min-width: 575px) {
		#titleContainer {
			padding: 15px 30px 20px 30px;
		}
	}

	#mainNavigation {
		display: flex;
		justify-content: center; /* Center the navigation links */
		margin: 0;
		padding: 0.5rem 0px;
		background-color: rgba(34, 34, 34, 0.858);
		width: 100%;
	}
	
	#mainNavigation > a {
		color: white;
		font-size: 0.9rem;
		margin-right: 1rem;
		margin-left: 1rem;
		text-decoration: none;
		padding-bottom: 4px;
		border-bottom: 4px solid transparent;
	}

	#mainNavigation > a:hover {
		border-color: white
	}

	.selected {
		border-color: white !important;
	}
</style>
