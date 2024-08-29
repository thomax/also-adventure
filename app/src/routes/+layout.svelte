<script>
	import {dev} from '$app/environment'
	import {inject} from '@vercel/analytics'
	import Header from './header.svelte'

	inject({mode: dev ? 'development' : 'production'})
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
