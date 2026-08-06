import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: "sajbthd8",
    dataset: "production"
  },
  studioHost: 'alsoadventure',
  deployment: {
    /**
     * Get the appId for a previously deployed Studio under the "Studio" tab for your project in sanity.io/manage
     * Note: this is required for fine-grained version selection
     */
    appId: '1ee99f8f2a2fa9cf4003df60',
    /**
     * Enable auto-updates.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity
     */
    autoUpdates: true,
  }
})