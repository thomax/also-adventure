<script>
	import {urlFor} from '$lib/utils/image'
	export let portableText
	const shadowVariants = ['v1', 'v2', 'v3']
	let ptImage = portableText.value
	let isInline
	let width
	let shadowVariant
	let classes

	// Hack: since hotspot is only available on block images, use this to determine if the image is inline or block
	$: {
		ptImage = portableText.value
		isInline = ptImage.hotspot ? false : true
		width = isInline ? 200 : 735
		// random shadow variant
		shadowVariant = shadowVariants[Math.floor(Math.random() * shadowVariants.length)]
		classes = [shadowVariant, isInline ? 'float-right' : 'block'].join(' ')
	}
</script>

<a href={urlFor(ptImage).url()} alt="Large image" target="_blank" rel="noopener noreferrer"
	><img src={urlFor(ptImage, {isInline, width}).url()} alt="" class={classes} /></a
>

<style>
	.v1 {
		box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
			rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
	}
	.v2 {
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}
	.v3 {
		box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	}

	.block {
		display: block;
		margin: 15px 0px;
	}

	.float-right {
		float: right;

		margin: 5px 0px 5px 10px;
	}
</style>
