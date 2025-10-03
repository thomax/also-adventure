<script>
	import {urlFor} from '$lib/utils/image'
	import MultiSelect from './MultiSelect.svelte'
	
	export let section
	
	function urlForPost(post) {
		if (!post?.slug?.current) return '#'
		
		let url = `/post/${post.slug.current}`
		if (post.campaign?.slug && post.category?.singular) {
			// Handle both slug.current and direct slug formats
			const campaignSlug = post.campaign.slug.current || post.campaign.slug
			url = `/${campaignSlug}/${post.category.singular}`
			if (post.order && !isNaN(post.order)) {
				url = `${url}/${post.order}`
			} else {
				url = `${url}/${post.slug.current}`
			}
		}
		return url.toLowerCase()
	}
</script>

<div class="dashboard-section">
	<div class="section-header" style="background-image: url({section.icon});">
		<h2>
			{section.title}
		</h2>
	</div>

	<div class="section-content">
		{#if section.posts?.length}
			<div class="posts-list">
				{#each section.posts as post}
					<a href={urlForPost(post)} class="post-item" style="{post.mainImage ? `--bg-image: url(${urlFor(post.mainImage).width(400).height(200).url()})` : ''}">
						<div class="post-title">
              {#if post.order && !isNaN(post.order)}
                {post.order}&nbsp;-&nbsp;
              {/if}
              {post.title || 'Untitled'}
						</div>
						{#if post.category?.singular}
							<div class="post-category">{post.category.singular}</div>
						{/if}
					</a>
				{/each}
			</div>
		{:else}
			<div class="no-posts">
				<p>Ingen {section.title.toLowerCase()} funnet</p>
			</div>
		{/if}
	</div>
	{#if section.filterOptions && section.filterOptions.length > 0}
		<div class="section-filter">
			<MultiSelect 
				options={section.filterOptions}
				placeholder="Velg kategorier..."
				onSelectionChange={section.onFilterChange}
			/>
		</div>
	{/if}

</div>

<style>
	.dashboard-section {
		background: white;
		border-radius: 3px;
		overflow: hidden;
		border: 1px solid #e0e0e0;
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 300px;
	}

	.section-header {
		padding: 2.5rem 1.5rem 1rem 1rem;
		border-bottom: 1px solid #f0f0f0;
		background-repeat: no-repeat;
		background-position: right -0.1rem center;
		background-size: auto 110%;
		background-color: rgba(250, 250, 250, 0.6);
		background-blend-mode: lighten;
	}

	.section-header h2 {
		margin: 0;
		font-size: 1.25rem;
		color: #333;
		margin-bottom: 0.75rem;
	}

	.section-filter {
		margin-top: 0.5rem;
	}

	.section-content {
		flex: 1;
		padding: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 0.5rem;
		overflow-y: auto;
		flex: 1;
		min-height: 0;
	}

	.post-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem;
		margin: 0.15rem .5rem;
		transition: all 0.2s ease;
		border-radius: 3px;
		border: 1px solid #e0e0e0;
		text-decoration: none;
		cursor: pointer;
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-blend-mode: lighten;
		background-color: rgba(255, 255, 255, 0.7);
		box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.4);
	}

	.post-item:hover {
		transform: scale(1.08);
		box-shadow: 
			inset 0 0 0 1000px rgba(255, 255, 255, 0.1),
			0 8px 25px rgba(0, 0, 0, 0.15);
		background-blend-mode: normal;
		background-color: none;
		transition: all 0.4s ease;
		z-index: 4;
	}

	.post-title {
		color: #333;
		line-height: 1.3;
		font-weight: 700;
		text-shadow: 0 2px 2px rgba(255, 255, 255, 0.7);
		transition: text-shadow 0.4s ease;
	}

	.post-item:hover .post-title, .post-item:hover .post-category {
		text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.8), 
			-2px -2px 2px rgba(255, 255, 255, 0.8), 
			-2px 2px 2px rgba(255, 255, 255, 0.8), 
			2px -2px 2px rgba(255, 255, 255, 0.8);
	}

	.post-category {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		color: #666;
		text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
	}


	.no-posts {
		color: #999;
		font-style: italic;
		text-align: center;
		padding: 2rem 0;
	}


	@media (max-width: 768px) {
		.section-header {
			padding: 1rem;
		}

		.section-content {
			padding: 1rem; 
		}

	}
</style>