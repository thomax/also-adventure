<script>
	import {PortableText} from '@portabletext/svelte'
	import {formatDate} from '$lib/utils'
	import {urlFor} from '$lib/utils/image'
	import editIcon from '$lib/assets/icons8-edit-64.png'
	import PortableTextImage from './PortableTextImage.svelte'
	import PortableTextLink from './PortableTextLink.svelte'
	import PortableTextInternalLink from './PortableTextInternalLink.svelte'

	export let data
	let campaignTitle
	let categoryTitle
	let campaignUrl
	let categoryUrl

	if (data.category) {
		campaignTitle = data.campaign.title?.toLowerCase()
		categoryTitle = data.category.title.toLowerCase()
		campaignUrl = `/?campaign=${data.campaign.slug}`
		categoryUrl = `${campaignUrl}&category=${data.category.title.toLowerCase()}`
	}
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://alsoadventure.org" />
	<meta property="og:site_name" content="Also, adventure" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:title" content="Also, adventure - {data.title}" />
	<meta
		property="og:image"
		content={data.mainImage ? urlFor(data.mainImage).width(300).url() : ''}
	/>
	<meta property="og:image:alt" content={data.title || 'Also, adventure'} />
</svelte:head>

<section class="post">
	{#if data.mainImage}
		<a href={urlFor(data.mainImage).url()} rel="noopener noreferrer"
			><img
				class="post__cover drop-shadow-image"
				src={urlFor(data.mainImage).width(1000).height(500).fit('max').url()}
				alt="Cover image for {data.title}"
			/>
		</a>
	{:else}
		<div class="post__cover--none" />
	{/if}
	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>

		<ul class="card__excerpt nav-link-box">
			<li>
				<a class="nav-link" href={campaignUrl}>{campaignTitle}</a>
				/
				<a class="nav-link" href={categoryUrl}>{categoryTitle}</a>{Number.isInteger(data.order)
					? ` / ${data.order}`
					: ''}
			</li>
			<li>
				{data.authors ? data.authors.map(author => author.name).join(', ') : 'Anonymous'} - {formatDate(
					data._createdAt
				)}
				<a
					class="editLink"
					href="https://alsoadventure.sanity.studio/structure/allPosts;{data._id}"
					target="_blank"><img src={editIcon} alt="Edit post" /></a
				>
			</li>
		</ul>

		<div class="post__content">
			<PortableText
				value={data.body}
				components={{
					types: {image: PortableTextImage},
					marks: {
						link: PortableTextLink,
						internalLink: PortableTextInternalLink
					}
				}}
			/>
		</div>
	</div>
</section>
