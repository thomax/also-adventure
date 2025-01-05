<script>
	export let portableText

	let {href} = portableText.value
	let plainTextContent = portableText.plainTextContent

	$: {
		href = portableText.value.href
		plainTextContent = portableText.plainTextContent
	}
</script>

<a target="_blank" {href}>{plainTextContent}</a>

<style>
	a:hover {
		text-decoration: underline;
	}
</style>
