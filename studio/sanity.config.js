// sanity.config.js
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemas from './schemas/schema'
import deskStructure from './src/deskStructure'
import initialValueTempates from './src/initialValueTemplates'

export default defineConfig({
  title: 'Also, adventure',
  projectId: 'sajbthd8',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    visionTool()
  ],
  tools: prev => {
    // 👇 Uses environment variables set by Vite in development mode
    if (import.meta.env.DEV) {
      return prev
    }
    return prev.filter(tool => tool.name !== 'vision')
  },
  schema: {
    templates: initialValueTempates,
    types: schemas
  }
})
