<script>
	import {page, navigating} from '$app/stores'
	import {SyncLoader} from 'svelte-loading-spinners'
	import {getPosts} from '$lib/utils/sanity.js'
	import FilterWidget from './FilterWidget.svelte'
	import NoData from './NoData.svelte'
	import DashboardSection from './DashboardSection.svelte'
	import ViewToggle from './ViewToggle.svelte'

	export let data
	let selectedCampaign = $page.url.searchParams.get('campaign')

	let campaigns = []
	let campaign
	let dashboardSections = []

	$: {
		selectedCampaign = $page.url.searchParams.get('campaign')
		if (data.campaigns?.length) {
			campaigns = [{title: 'All', slug: ''}, ...data.campaigns]
			campaign = campaigns.find(campaign => campaign.slug === selectedCampaign)
		}
	}

	// Configure dashboard sections with category names
	const dashboardConfig = [
		{
			title: 'Karakterer',
			icon: '/characters.svg',
			categories: ['pc', 'npc'],
		},
		{
			title: 'Historien',
			icon: '/story.svg',
			categories: ['session'],
		},
		{
			title: 'Bakgrunn',
			icon: '/background.svg',
			categories: ['gm-note', 'place'],
		},
		{
			title: 'Homebrew',
			icon: '/homebrew.svg',
			categories: [], // Everything except...
			excludeCategories: ['pc', 'npc', 'session', 'gm-note', 'place']
    }
	]

	// Fetch posts for each dashboard section based on categories
	$: if (selectedCampaign) {
		fetchDashboardData(selectedCampaign)
	}

	async function fetchDashboardData(campaignSlug) {
		const sectionPromises = dashboardConfig.map(async (section) => {
			if (section.categories.length > 0) {
				// Fetch posts for specific categories
				const categoryPromises = section.categories.map(category => 
					getPosts({ campaignSlug, category })
				)
				const categoryResults = await Promise.all(categoryPromises)
				const posts = categoryResults.flat()
				
				return {
					...section,
					posts
				}
			} else if (section.excludeCategories) {
				// Fetch all posts and exclude certain categories (for Homebrew section)
				const allPosts = await getPosts({ campaignSlug })
				const posts = allPosts.filter(post => 
					!section.excludeCategories.includes(post.category?.singular)
				)
				
				return {
					...section,
					posts
				}
			}
			
			return {
				...section,
				posts: []
			}
		})

		dashboardSections = await Promise.all(sectionPromises)
	}
</script>

{#if selectedCampaign}
	<ViewToggle />
{/if}

<section id="widgetSection">
	<FilterWidget {campaigns} categories={[]} />
</section>


{#if campaign}
  <section class="dashboard">
    {#if $navigating || dashboardSections.length === 0}
      <div class="loading-container">
        <SyncLoader size="100" color="#000" unit="px" duration="1s" />
      </div>
    {:else if selectedCampaign}
      <div class="dashboard-grid">
        {#each dashboardSections as section}
          <DashboardSection {section} />
        {/each}
      </div>
    {:else}
      <div class="no-campaign">
        <NoData />
        <p>Velg en kampanje for å se wiki-innholdet</p>
      </div>
    {/if}
  </section>
{:else} 
  <div class="no-campaign-message">
    Velg kampanje for å se innhold
  </div>
{/if}

<style>
	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}

	/* Responsive breakpoints */
	@media (max-width: 768px) {
		.dashboard-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.loading-container {
		display: flex;
		justify-content: center;
		padding: 4rem;
	}

	.no-campaign, .no-campaign-message {
		text-align: center;
		padding: 4rem;
		color: #666;
	}

	@media (max-width: 1200px) {
		.dashboard-grid {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}
	}

	@media (max-width: 768px) {
		.dashboard-grid {
			grid-template-columns: 1fr;
			padding: 0.5rem;
		}
	}
</style>