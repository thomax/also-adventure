<script>
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
	<div class="section-header">
		<h2>
			<span class="section-icon">{section.icon}</span>
			{section.title}
		</h2>
	</div>

	<div class="section-content">
		{#if section.posts?.length}
			<div class="posts-list">
				{#each section.posts as post}
					<div class="post-item">
						<a href={urlForPost(post)} class="post-link">
              {#if post.order && !isNaN(post.order)}
                {post.order}&nbsp;-&nbsp;
              {/if}
              {post.title || 'Untitled'}
              {#if section.isCategoryVisible}
                &nbsp;[{post.category.singular}]
              {/if}
						</a>
					</div>
				{/each}
			</div>
		{:else}
			<div class="no-posts">
				<p>Ingen {section.title.toLowerCase()} funnet</p>
			</div>
		{/if}
	</div>
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
		padding: 1.5rem 1.5rem 1rem;
		border-bottom: 1px solid #f0f0f0;
	}

	.section-header h2 {
		margin: 0;
		font-size: 1.25rem;
		color: #333;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.section-icon {
		font-size: 1.5rem;
	}

	.section-content {
		flex: 1;
		padding: 1rem 1.5rem;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.post-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.post-link {
		color: #333;
		text-decoration: none;
		font-weight: 500;
		line-height: 1.3;
	}

	.post-link:hover {
		color: #007acc;
		text-decoration: underline;
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