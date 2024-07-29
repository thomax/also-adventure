<script>
	import Header from './header.svelte'
</script>

<div class="container">
	<Header />
	<main>
		<slot />
	</main>
	<footer class="footer">
		<p class="footer__text">XP maketh man</p>
	</footer>
</div>
