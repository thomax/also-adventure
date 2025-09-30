# AI Coding Agent Instructions - Also, Adventure

## Project Overview
Also, Adventure is an RPG blog and content management system with three main components:
- **Frontend App** (`app/`): SvelteKit web application deployed on Vercel
- **Sanity Studio** (`studio/`): React-based CMS for content management
- **Import Tools** (`import/`): WordPress migration utilities
- **Monorepo Management**: Uses Lerna for coordinated builds and development

## Key Architecture Patterns

### Sanity CMS Integration
- **Client Setup**: Use `app/src/lib/utils/sanity.js` as the canonical pattern for GROQ queries
- **Schema Location**: All content types defined in `studio/schemas/` (posts, campaigns, categories, ships, talents)
- **Query Patterns**: Reference existing functions like `getPosts()`, `getBlogPosts()` for complex filtering by campaign/category
- **Environment**: Uses `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` from SvelteKit env

### SvelteKit Routing & Data Loading
- **File-based Routing**: Routes in `app/src/routes/` follow SvelteKit conventions
- **Parametric Routes**: `[campaign]/[category]/` structure for content organization
- **Data Loading**: Use `+page.js` files with `ssr = false` for client-side data fetching
- **Caching Pattern**: Implement query-based caching like in root `+page.js` to avoid redundant Sanity calls

### Content Model & Relationships
- **Posts**: Core content type with campaign, category, and order fields
- **Campaigns**: RPG campaign containers with slug-based routing
- **Categories**: Content classification (session, pc, npc, location, etc.)
- **Cross-references**: Use Sanity references for relationships, resolve with `->` in GROQ

## Development Workflows

### Building & Running
```bash
# Root level - runs all packages in parallel
npm run dev          # Start all development servers
npm run build        # Build all packages
npm run build-web    # Production web build with GraphQL deploy

# Individual packages
cd app && npm run dev     # SvelteKit dev server
cd studio && npm run dev  # Sanity Studio dev
```

### Content Management
- **Studio Access**: Navigate to `/studio` route or run `sanity dev` in studio directory
- **Content Import**: WordPress migration scripts in `import/wp-to-sanity/`
- **Schema Changes**: Modify `studio/schemas/` files, deploy with `sanity deploy`

## Project-Specific Conventions

### Component Patterns
- **Portable Text**: Use `@portabletext/svelte` for rich content rendering
- **Loading States**: Import `SyncLoader` from `svelte-loading-spinners` for consistent UX
- **No Data States**: Use dedicated `NoData.svelte` component for empty states
- **Search/Filter**: Follow `FilterWidget.svelte` pattern for campaign/category filtering

### Styling & Assets
- **Global CSS**: Located in `app/static/global.css`
- **Component Styles**: Use Svelte's scoped `<style>` blocks
- **Assets**: Import from `$lib/assets/` using Vite's asset handling
- **Banner**: Header background uses imported image with dynamic positioning

### Environment & Config
- **Adapter**: Uses `@sveltejs/adapter-vercel` with Node.js 20.x runtime
- **Timeout**: Serverless functions configured for 60-second max duration
- **Analytics**: Vercel Analytics integrated in `+layout.svelte`

### AI/OpenAI Integration
- **API Location**: `app/src/lib/utils/openAi.server.js` handles GPT integration
- **Zod Schemas**: Use structured output with `zodResponseFormat` for consistent responses
- **Magic Items**: Existing pattern for generating RPG content with specific system prompts

## Data Flow Patterns

### URL Parameter Handling
- **Query Params**: `?campaign=slug&category=type&query=search` for filtering
- **Route Structure**: `/[campaign]/[category]/` for hierarchical content
- **Search**: Minimum 3 characters for query activation, implements caching

### Content Rendering Modes
- **Web Mode**: Default interactive display
- **Markdown Mode**: Use `?render=markdown` for export-friendly formatting
- **Reverse Order**: Use `?reverse=true` for chronological display

### State Management
- **Page Store**: Use SvelteKit's `$page` store for URL-driven state
- **Navigation**: `$navigating` store for loading indicators
- **Client-side**: Most data fetching happens client-side (`ssr = false`)

## Integration Points

### External Services
- **Sanity**: Primary CMS with GraphQL endpoint deployment
- **Vercel**: Hosting platform with analytics integration
- **OpenAI**: GPT-4 integration for content generation
- **WordPress**: Import pipeline preserves legacy content structure

### Cross-Component Communication
- **Campaigns**: Central organizing principle, referenced across posts and categories
- **Categories**: Shared between posts and blog posts with different query patterns
- **Authors**: User references across all content types
- **Internal Links**: Custom mark definition in Sanity for cross-referencing content

When working on this codebase, always consider the campaign-centric organization and the dual content types (posts vs blog posts). Use the established GROQ query patterns and maintain the SvelteKit routing conventions for consistency.