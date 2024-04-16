<script>
	import {urlFor} from '$lib/utils/image'
	export let portableText
</script>

<img src={urlFor(portableText.value, {isInline: true, width: 200}).url()} alt="" />

<style>
	img {
		float: right;
		margin-right: 10px;
	}
</style>
