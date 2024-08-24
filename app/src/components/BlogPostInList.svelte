<script lang="javascript">
	import {formatDate} from '$lib/utils'
	import {urlFor} from '$lib/utils/image'
	export let blogPost

	function urlForPost(blogPost) {
		let url = `/blog/${blogPost.slug.current}`
		return url.toLowerCase()
	}
</script>

<div class="card">
	{#if blogPost.mainImage}
		<img
			class="card__cover"
			src={urlFor(blogPost.mainImage).width(500).height(300).url()}
			alt="Cover image for {blogPost.title}"
		/>
	{:else}
		<div class="card__cover--none" />
	{/if}

	<div class="card__container">
		<h3 class="card__title">
			<a class="card__link" href={urlForPost(blogPost)}>
				{blogPost.title}
			</a>
		</h3>
		<p class="card__date">
			{blogPost.authors ? blogPost.authors.map((author) => author.name).join(', ') : 'Anonymous'} - {formatDate(
				blogPost.publishAt
			)}
		</p>
	</div>
</div>
