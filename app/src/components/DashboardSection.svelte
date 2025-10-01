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
		padding: 1rem 1rem;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 0 10px 10px 0;
	}

	.post-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		position: relative;
		padding: 0.75rem;
		transition: transform 0.2s ease, box-shadow 0.3s ease;
		border-radius: 1px;
		overflow: visible;
		text-decoration: none;
		cursor: pointer;
	}

	/* Over-exposed blurred background image */
	.post-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		filter: blur(1.5px) brightness(2.2) contrast(0.7) saturate(0.5);
		transition: filter 0.2s ease;
		z-index: 0;
		overflow: hidden;
	}

	/* Light overlay for washed-out effect */
	.post-item::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.7);
		transition: background 0.2s ease;
		z-index: 1;
		border-radius: 1px;
		overflow: hidden;
	}

	.post-item:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 2;
	}

	.post-item:hover::before {
		filter: blur(0.3px) brightness(1.3) contrast(1.1) saturate(1.2);
	}

	.post-item:hover::after {
		background: rgba(255, 255, 255, 0.2);
	}

	/* Trigger text shadow changes on item hover */
	.post-item:hover .post-title {
		text-shadow: 
			0 0 3px rgba(255, 255, 255, 0.9),
			0 0 6px rgba(255, 255, 255, 0.7),
			1px 1px 0 rgba(255, 255, 255, 0.8),
			-1px -1px 0 rgba(255, 255, 255, 0.8),
			1px -1px 0 rgba(255, 255, 255, 0.8),
			-1px 1px 0 rgba(255, 255, 255, 0.8);
	}

	.post-title {
		color: #333;
		line-height: 1.3;
		position: relative;
		z-index: 2;
		font-weight: 700;
		text-shadow: 
			0 0 2px rgba(255, 255, 255, 0.8),
			1px 1px 0 rgba(255, 255, 255, 0.6),
			-1px -1px 0 rgba(255, 255, 255, 0.6);
		transition: all 0.2s ease;
	}

  .post-category {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #666;
    position: relative;
    z-index: 2;
    text-shadow: 
      0 0 2px rgba(255, 255, 255, 0.9),
      1px 1px 0 rgba(255, 255, 255, 0.7),
      -1px -1px 0 rgba(255, 255, 255, 0.7);
    transition: color 0.2s ease;
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