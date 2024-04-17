<script>
	import {PortableText} from '@portabletext/svelte'
	import {formatDate} from '$lib/utils'
	import {urlFor} from '$lib/utils/image'
	import editIcon from '$lib/assets/icons8-edit-64.png'
	import {updateQueryParams} from '$lib/utils/urlAccess'

	import PortableTextImage from '../../../components/PortableTextImage.svelte'
	export let data
	let mainImageUrl
	let campaignTitle
	let categoryTitle
	let campaignUrl
	let categoryUrl

	if (data.mainImage) {
		mainImageUrl = urlFor(data.mainImage, {with: 1000}).url()
	}
	if (data.category) {
		campaignTitle = data.campaign.title?.toLowerCase()
		categoryTitle = data.category.title.toLowerCase()
		campaignUrl = `/?campaign=${data.campaign.slug}`
		categoryUrl = `${campaignUrl}&category=${data.category.title.toLowerCase()}`
	}

	function onClickCampagin(event) {
		event.preventDefault()
		updateQueryParams(data.campaign.slug)
	}

	function onClickCategory(event) {
		event.preventDefault()
		updateQueryParams(data.campaign.slug, data.category.title.toLowerCase())
	}
</script>

<section class="post">
	{#if mainImageUrl}
		<a href={mainImageUrl} rel="noopener noreferrer"
			><img class="post__cover" src={mainImageUrl} alt="Cover image for {data.title}" />
		</a>
	{:else}
		<div class="post__cover--none" />
	{/if}
	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>
		<p class="card__excerpt">
			<a href={campaignUrl} on:click={onClickCampagin}>{campaignTitle}</a>
			/
			<a href={categoryUrl} on:click={onClickCategory}>{categoryTitle}</a>{data.order
				? ` / ${data.order}`
				: ''}
		</p>
		<p class="card__date">
			{data.authors ? data.authors.map((author) => author.name).join(', ') : 'Anonymous'} - {formatDate(
				data._createdAt
			)}
			<a
				class="editLink"
				href="https://alsoadventure.sanity.studio/structure/allPosts;{data._id}"
				target="_blank"><img src={editIcon} alt="Edit post" /></a
			>
		</p>
		<div class="post__content">
			<PortableText
				value={data.body}
				components={{
					types: {image: PortableTextImage}
				}}
			/>
		</div>
	</div>
</section>

<style>
	a.editLink {
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	a.editLink:hover {
		opacity: 1;
	}

	a.editLink img {
		margin-top: 5px;
		height: 1.2rem;
	}
</style>
