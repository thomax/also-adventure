<script>
	export let portableText
	let {campaignSlug, category, slug, targetDocumentType, targetDocumentId} = portableText.value
	let plainTextContent = portableText.plainTextContent

	$: ({campaignSlug, category, slug, targetDocumentType, targetDocumentId} = portableText.value)

	function getLink() {
		if (targetDocumentType === 'post') {
			return `/${[campaignSlug, category, slug].join('/')}`
		}
		return `/${targetDocumentType}/${targetDocumentId}}`
	}
</script>

<a href={getLink()}>{plainTextContent}</a>

<style>
	a:hover {
		text-decoration: underline;
	}
</style>
