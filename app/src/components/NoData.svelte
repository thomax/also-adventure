<script>
	const searchParams = new URLSearchParams(window.location.search)
	const selectedCampaign = searchParams.get('campaign')
	const selectedCategory = searchParams.get('category')
	const query = searchParams.get('query')

	$: {
		console.info(selectedCampaign, selectedCategory, query)
	}
</script>

<div class="welcome__container">
	No posts based on filters:
	<table id="noDataTable">
		<tr>
			<th>Campaign</th><td>{selectedCampaign}</td>
		</tr>
		<tr>
			<th>Category</th><td>{selectedCategory}</td>
		</tr>
		<tr>
			<th>Query</th><td>{query}</td>
		</tr>
	</table>
</div>

<style>
	.welcome__container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#noDataTable {
		margin-top: 1rem;
		border-collapse: collapse;
	}
	#noDataTable tr {
		border: 1px solid #000;
	}
	#noDataTable th {
		text-align: right;
		padding: 0.5rem;
	}
	#noDataTable td {
		text-align: left;
		padding: 0.5rem;
	}
</style>
