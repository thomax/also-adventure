<script>
	import {PortableText} from '@portabletext/svelte'
	import {formatDate} from '../../../lib/utils'
	import {urlFor} from '../../../lib/utils/image'

	export let data
</script>

<section class="post">
	{#if data.mainImage}
		<img
			class="post__cover"
			src={urlFor(data.mainImage).url()}
			alt="Cover image for {data.title}"
		/>
	{:else}
		<div class="post__cover--none" />
	{/if}
	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>
		<p class="card__excerpt">
			{data.campaign.title?.toLowerCase()}/{data.category?.title.toLowerCase()}{data.order
				? `/${data.order}`
				: ''}
		</p>
		<p class="card__date">
			{data.authors ? data.authors.map((author) => author.name).join(', ') : 'Anonymous'} - {formatDate(
				data._createdAt
			)}
		</p>
		<div class="post__content">
			<PortableText value={data.body} />
		</div>
	</div>
</section>
