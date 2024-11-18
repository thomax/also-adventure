<script lang="javascript">
	import {formatDate} from '$lib/utils'
	import {urlFor} from '$lib/utils/image'
	export let post

	function urlForPost(post) {
		let url = `/post/${post.slug.current}`
		if (post.campaign && post.category) {
			url = `/${post.campaign.slug.current}/${post.category.singular}`
			if (!isNaN(post.order)) {
				url = `${url}/${post.order}`
			} else {
				url = `${url}/${post.slug.current}`
			}
		}
		return url.toLowerCase()
	}
</script>

<div class="card">
	{#if post.mainImage}
		<img
			class="card__cover"
			src={urlFor(post.mainImage).width(500).height(300).url()}
			alt="Cover image for {post.title}"
		/>
	{:else}
		<div class="card__cover--none" />
	{/if}

	<div class="card__container">
		<h3 class="card__title">
			<a class="card__link" href={urlForPost(post)}>
				{post.title}
			</a>
		</h3>
		<p class="card__excerpt">
			{post.campaign.title?.toLowerCase()}/{post.category?.title.toLowerCase()}{post.order
				? `/${post.order}`
				: ''}
		</p>
		<p class="card__date">
			{post.authors ? post.authors.map(author => author.name).join(', ') : 'Anonymous'} - {formatDate(
				post._createdAt
			)}
		</p>
	</div>
</div>
