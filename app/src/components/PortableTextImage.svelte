<script>
	import {urlFor} from '$lib/utils/image'
	export let portableText
</script>

<a
	href={urlFor(portableText.value).url()}
	alt="Large image"
	target="_blank"
	rel="noopener noreferrer"
	><img src={urlFor(portableText.value, {isInline: true, width: 200}).url()} alt="" /></a
>

<style>
	img {
		float: right;
		margin-right: 10px;
	}
</style>
