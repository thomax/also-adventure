<script>
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	let isWikiView = $page.url.searchParams.get('view') === 'wiki'

	function toggleView() {
		const url = new URL($page.url)
		if (isWikiView) {
			url.searchParams.delete('view')
		} else {
			url.searchParams.set('view', 'wiki')
		}
		goto(url.toString(), { replaceState: true })
	}

	// Update local state when URL changes
	$: isWikiView = $page.url.searchParams.get('view') === 'wiki'
</script>

<div class="view-toggle">
	<div class="toggle-container">
		<button 
			class="toggle-option" 
			class:active={!isWikiView}
			on:click={() => !isWikiView || toggleView()}
		>
			Liste
		</button>
		<button 
			class="toggle-option" 
			class:active={isWikiView}
			on:click={() => isWikiView || toggleView()}
		>
			Wiki
		</button>
	</div>
</div>

<style>
	.view-toggle {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.toggle-container {
		display: flex;
		background: rgba(0, 48, 36, 0.9);
		border-radius: 25px;
		padding: 4px;
		gap: 2px;
	}

	.toggle-option {
		padding: 8px 24px;
		border: none;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		background: transparent;
		color: white;
		opacity: 0.8;
	}

	.toggle-option.active {
		background: white;
		color: rgba(0, 48, 36, 0.9);
		opacity: 1;
		font-weight: 600;
	}

	.toggle-option:hover:not(.active) {
		opacity: 1;
	}

	.toggle-option:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(0, 48, 36, 0.5)
	}
</style>