<script>
	import {getSelectedSlugs} from '../lib/utils/urlAccess'
	const {selectedCampaign, selectedCategory} = getSelectedSlugs()
</script>

<div class="welcome__container">
	You've selected campaign
	<strong>{selectedCampaign}</strong>
	and category
	<strong>{selectedCategory}</strong>
	There are no posts matching your selection
</div>
