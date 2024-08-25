<script>
  import { page } from '$app/stores';
	let currentPath = '/'
	$: {
		currentPath = $page.url.pathname
	}
</script>


<header class="header">
	<div>
		<a class="header__title" href="/" title="RPG morsels for the picking">Also, adventure</a>
	</div>
	<div id="mainNavigation">
		<a class:selected={currentPath === '/'} href="/">Posts</a>
		<a class:selected={currentPath === '/blog'} href="/blog">Blog</a>
		<a class:selected={currentPath === '/random/item'} href="/random/item">A random item</a>
	</div>
</header>


<style>

	#mainNavigation {
		margin: 0.8rem 0px 0.3rem 0px;
	}

	#mainNavigation > a {
		font-size: 0.8rem;
		margin-right: 1.2rem;
		text-decoration: none;
		color: rgba(16, 17, 18, 0.8);
		padding-bottom: 4px;
		border-bottom: 4px solid transparent;
	}

	#mainNavigation > a:hover {
		border-color: rgba(0, 0, 0, 0.8);
	}

	.selected {
		border-color: rgba(0, 0, 0, 0.8) !important;
	}
</style>
