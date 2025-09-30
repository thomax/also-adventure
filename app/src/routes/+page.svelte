<script>
	import {page, navigating} from '$app/stores'
	import {SyncLoader} from 'svelte-loading-spinners'
	import FilterWidget from '../components/FilterWidget.svelte'
	import NoData from '../components/NoData.svelte'
	import DashboardSection from '../components/DashboardSection.svelte'

	export let data
	let selectedCampaign = $page.url.searchParams.get('campaign')

	let campaigns = []
	let campaign

	$: {
		selectedCampaign = $page.url.searchParams.get('campaign')
		if (data.campaigns?.length) {
			campaigns = [{title: 'All', slug: ''}, ...data.campaigns]
			campaign = campaigns.find(campaign => campaign.slug === selectedCampaign)
		}
	}

	// Configure dashboard sections
	$: dashboardSections = [
		{
			title: 'Karakterer',
			icon: '/characters.svg',
			posts: data.characterPosts || [],
      isCategoryVisible: false
		},
		{
			title: 'Historien',
			icon: '/story.svg',
			posts: data.sessionPosts || [],
      isCategoryVisible: false
		},
		{
			title: 'Bakgrunn',
			icon: '/background.svg',
			posts: data.loreAndPlacePosts || [],
      isCategoryVisible: false
		},
		{
			title: 'Homebrew',
			icon: '/homebrew.svg',
			posts: data.homebrewPosts || [],
      isCategoryVisible: true
    }
	]
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://alsoadventure.org" />
	<meta property="og:site_name" content="Also, adventure" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:title" content="Also, adventure - Min Kampanje-Wiki" />
</svelte:head>

<section id="widgetSection">
	<FilterWidget {campaigns} categories={[]} />
</section>

{#if campaign}

  <h1 class="header">{campaign.title}</h1>

  <section class="dashboard">
    {#if $navigating}
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
  Velg kampanje
{/if}

<style>
  .header {
    flex-direction: column;
    gap: 1rem;
  }

	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 1rem;
	}

	.loading-container {
		display: flex;
		justify-content: center;
		padding: 4rem;
	}

	.no-campaign {
		text-align: center;
		padding: 4rem;
		color: #666;
	}

	@media (max-width: 768px) {
		.header {
			flex-direction: column;
			gap: 1rem;
			text-align: centers;
		}

		.dashboard-grid {
			grid-template-columns: 1fr;
			padding: 0.5rem;
		}
	}
</style>