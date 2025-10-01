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
	let sectionFilters = {} // Track selected categories for each section
	let availableHomebrewCategories = [] // Dynamically discovered categories

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

	// Initialize category filters - all categories selected by default
	$: {
		if (Object.keys(sectionFilters).length === 0) {
			sectionFilters = dashboardConfig.reduce((acc, section) => {
				if (section.categories.length > 0) {
					acc[section.title] = section.categories.map(cat => ({ 
						value: cat, 
						label: cat.toUpperCase(), 
						selected: true 
					}))
				}
				return acc
			}, {})
		}
	}

	// Handle category filter changes
	function handleCategoryFilterChange(sectionTitle, updatedOptions) {
		// Create a new array with updated selected states
		const newOptions = updatedOptions.map(opt => ({ ...opt }))
		sectionFilters[sectionTitle] = newOptions
		// Trigger reactivity
		sectionFilters = { ...sectionFilters }
		// Re-fetch data with new filters
		fetchDashboardData(selectedCampaign)
	}

	// Fetch posts for each dashboard section based on categories
	$: if (selectedCampaign && Object.keys(sectionFilters).length > 0) {
		fetchDashboardData(selectedCampaign)
	}

	async function fetchDashboardData(campaignSlug) {
		if (!campaignSlug) return

		// First, get all posts to discover available categories for Homebrew
		const allPosts = await getPosts({ campaignSlug })
		
		// Discover unique categories for Homebrew section
		const homebrewSection = dashboardConfig.find(s => s.title === 'Homebrew')
		if (homebrewSection) {
			const homebrewPosts = allPosts.filter(post => 
				!homebrewSection.excludeCategories.includes(post.category?.singular)
			)
			const uniqueCategories = [...new Set(homebrewPosts.map(post => post.category?.singular))]
				.filter(cat => cat) // Remove undefined/null
				.sort()
			
			availableHomebrewCategories = uniqueCategories
			
			// Initialize Homebrew filters if not already done
			if (!sectionFilters['Homebrew']) {
				sectionFilters['Homebrew'] = uniqueCategories.map(cat => ({
					value: cat,
					label: cat.toUpperCase(),
					selected: true
				}))
				// Trigger reactivity
				sectionFilters = { ...sectionFilters }
			}
		}

		const sectionPromises = dashboardConfig.map(async (section) => {
			let posts = []

			if (section.categories.length > 0) {
				// Get selected categories for this section
				const sectionFilterOptions = sectionFilters[section.title]
				let selectedCategories = section.categories
				
				if (sectionFilterOptions) {
					const selectedOptions = sectionFilterOptions.filter(opt => opt.selected)
					selectedCategories = selectedOptions.map(opt => opt.value)
				}

				if (selectedCategories.length > 0) {
					// Fetch posts for selected categories only
					const categoryPromises = selectedCategories.map(category => 
						getPosts({ campaignSlug, category })
					)
					const categoryResults = await Promise.all(categoryPromises)
					posts = categoryResults.flat()
				}
			} else if (section.excludeCategories) {
				// Handle Homebrew section with dynamic filtering
				const sectionFilterOptions = sectionFilters[section.title]
				let selectedCategories = availableHomebrewCategories
				
				if (sectionFilterOptions) {
					const selectedOptions = sectionFilterOptions.filter(opt => opt.selected)
					selectedCategories = selectedOptions.map(opt => opt.value)
				}
				
				posts = allPosts.filter(post => 
					selectedCategories.includes(post.category?.singular)
				)
			}
			
			return {
				...section,
				posts,
				filterOptions: sectionFilters[section.title] || [],
				onFilterChange: (options) => handleCategoryFilterChange(section.title, options)
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