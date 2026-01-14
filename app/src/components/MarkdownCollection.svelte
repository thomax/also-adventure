<script lang="javascript">
	import {portableTextToMarkdown} from '@portabletext/markdown'
	export let posts

	const bodyToMarkdown = body => portableTextToMarkdown(body)

	const copyToClipboard = () => {
		const text = document.getElementById('postsAsMarkdown').innerText
		navigator.clipboard.writeText(text).then(
			() => {
				console.log('Async: Copying to clipboard was successful!')
			},
			err => {
				console.error('Async: Could not copy text: ', err)
			}
		)
	}
</script>

<div>
	<button on:click={copyToClipboard}>Copy everything below to clipboard</button>

	<pre id="postsAsMarkdown">
		{#each posts as post}
			<!--// prettier-ignore-->
# {post.category.title}{post.order
				? ` ${post.order}`
				: ''}: {post.title}
Campaign:&nbsp;{post.campaign
				.title}
<!--// prettier-ignore-->
&nbsp;
{bodyToMarkdown(
				post.body
			)}
<!--// prettier-ignore-->
&nbsp;
&nbsp;
		{/each}
	</pre>
</div>
