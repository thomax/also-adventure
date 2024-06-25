<script>
	import {getUrlParams} from '../lib/utils/urlAccess'
	const {selectedCampaign, selectedCategory} = getUrlParams()
</script>

<div class="welcome__container">
	You've selected campaign
	<strong>{selectedCampaign}</strong>
	and category
	<strong>{selectedCategory}</strong>
	There are no posts matching your selection
</div>
