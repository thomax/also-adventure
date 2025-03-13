<script lang="javascript">
	import {PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID} from '$env/static/public'

	import toMarkdown from '@sanity/block-content-to-markdown'
	export let posts

	const serializers = {
		types: {
			code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
		}
	}

	const bodyToMarkdown = body =>
		toMarkdown(body, {
			serializers,
			imageOptions: {w: 320, h: 240, fit: 'max'},
			projectId: 'PUBLIC_SANITY_PROJECT_ID',
			dataset: 'PUBLIC_SANITY_DATASET'
		})

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
