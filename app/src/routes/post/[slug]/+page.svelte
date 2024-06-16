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
		mainImageUrl = urlFor(data.mainImage).width(1000).url()
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

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://adventure-source.vercel.app" />
	<meta property="og:site_name" content="The Source of Adventure" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:title" content={data.title || 'The Source of Adventure'} />
	<meta property="og:image" content={mainImageUrl} />
	<meta property="og:image:alt" content={data.title || 'The Source of Adventure'} />
</svelte:head>

<section class="post">
	{#if mainImageUrl}
		<a href={mainImageUrl} rel="noopener noreferrer"
			><img
				class="post__cover drop-shadow-image"
				src={mainImageUrl}
				alt="Cover image for {data.title}"
			/>
		</a>
	{:else}
		<div class="post__cover--none" />
	{/if}
	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>
		<p class="card__excerpt nav-link-box">
			<a class="nav-link" href={campaignUrl} on:click={onClickCampagin}>{campaignTitle}</a>
			/
			<a class="nav-link" href={categoryUrl} on:click={onClickCategory}>{categoryTitle}</a
			>{data.order ? ` / ${data.order}` : ''}
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
	.drop-shadow-image {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
			0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.12);
	}

	.nav-link-box {
		padding: 10px;
		margin-right: 10px;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	}

	.nav-link {
		color: black;
		transition: 400ms;
		text-decoration: none;
		border-bottom: 2px solid transparent;
	}
	.nav-link:hover {
		border-color: black;
	}

	a.editLink {
		box-shadow: none;
		transition: box-shadow 0.3s;
	}
	a.editLink:hover {
		box-shadow: 0px 104px 70px -73px rgba(231, 166, 26, 1);
	}

	a.editLink img {
		margin-top: 5px;
		height: 1.2rem;
	}
</style>
