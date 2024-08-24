// sanity.config.js
import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {visionTool} from '@sanity/vision'
import schemas from './schemas/schema'
import deskStructure from './src/deskStructure'
import initialValueTempates from './src/initialValueTemplates'

export default defineConfig({
  title: 'Also, adventure',
  projectId: 'sajbthd8',
  dataset: 'production',
  plugins: isDev
    ? [
        structureTool({
          structure: deskStructure,
        }),
        visionTool(),
        media(),
      ]
    : [
        structureTool({
          structure: deskStructure,
        }),
        media(),
      ],
  schema: {
    templates: initialValueTempates,
    types: schemas,
  },
})
