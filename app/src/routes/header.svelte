<script>
	import {page} from '$app/stores'
	import bannerImage from '$lib/assets/banner.jpg'
	import {onMount, onDestroy} from 'svelte'

	let headerElement
	let currentPath = '/'

	$: {
		currentPath = $page.url.pathname
	}

	function handleMouseMove(e) {
		const {x, y, width, height} = headerElement.getBoundingClientRect()
		const mousePosX = e.clientX
		const mousePosY = e.clientY
		if (mousePosX > x && mousePosX < width && mousePosY > y && mousePosY < height) {
			// Move the background image slightly, based on the mouse position
			const x = (-1 * (width / 2 - e.clientX)) / 30
			const y = (-1 * (height / 2 - e.clientY)) / 30
			headerElement.style.backgroundPosition = `${x}px ${y}px`
		}
	}

	onMount(() => {
		headerElement.style.background = `url('${bannerImage}') repeat top center`
		headerElement.style.backgroundSize = 'cover'
		headerElement.style.transition = 'background-position 0.1s'

		window.addEventListener('mousemove', handleMouseMove)
	})

	onDestroy(() => {
		window.removeEventListener('mousemove', handleMouseMove)
	})
</script>

<header class="header" bind:this={headerElement}>
	<div id="titleContainer">
		<a class="header__title" href="/" title="RPG morsels for the picking">Also, adventure</a>
		<span class="subtitle">rpg morsels for the picking</span>
	</div>
	<div id="mainNavigation">
		<a class:selected={currentPath === '/'} href="/">Posts</a>
		<a class:selected={currentPath === '/blog'} href="/blog">Blog</a>
		<a class:selected={currentPath === '/random/item'} href="/random/item">Random item</a>
	</div>
</header>

<style>
	#titleContainer {
		margin: 50px 0px 50px 0px;
		padding: 5px 20px;
		background-color: rgba(75, 75, 75, 0.5);
		text-align: center; /* Center the title text */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; /* Center the content horizontally */
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
		padding: 0.5rem 0px 0.4rem 0px;
		background-color: rgba(34, 34, 34, 0.7);
		width: 100%;
	}

	#mainNavigation > a {
		color: white;
		font-size: 1.1rem;
		font-weight: 700;
		margin-right: 1rem;
		margin-left: 1rem;
		text-decoration: none;
		padding-bottom: 4px;
		border-bottom: 4px solid transparent;
	}

	#mainNavigation > a:hover {
		border-color: white;
	}

	.selected {
		border-color: white !important;
	}

	.subtitle {
		color: white;
		border-top: 1px solid white;
		margin-top: 15px;
		padding-top: 4px;
		font-weight: 300;
		opacity: 0.7;
	}
</style>
