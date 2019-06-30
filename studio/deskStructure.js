import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdPerson from 'react-icons/lib/md/person'
import MdImage from 'react-icons/lib/md/palette'
import MdCampaign from 'react-icons/lib/md/toys'

import shared from './schemas/shared'
const postCategories = shared.postCategories
console.log('asdf', postCategories)

function getItems(campaignId) {
  return postCategories.map(category => {
    return S.listItem()
      .title(category.plural)
      .child(
        S.documentList()
          .title(category.plural)
          .filter('_type == "post" && campaign._ref == $campaignId && category == $category')
          .params({campaignId, category: category.value})
      )
  })
}

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Posts')
        .icon(MdCampaign)
        .schemaType('campaign')
        .child(
          S.documentTypeList('campaign')
            .title('Campaigns')
            .filter('_type == "campaign"')
            .child(campaignId =>
              S.list()
                .title('Posts')
                .items(getItems(campaignId))
            )
        ),
      S.listItem()
        .title('Users')
        .icon(MdPerson)
        .schemaType('user')
        .child(S.documentTypeList('user').title('Users')),
      S.listItem()
        .title('All posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('All campaigns')
        .icon(MdCampaign)
        .schemaType('campaign')
        .child(S.documentTypeList('campaign').title('Campaign')),
      S.listItem()
        .title('Image gallery')
        .icon(MdImage)
        .schemaType('sanity.imageAsset')
        .child(S.documentTypeList('sanity.imageAsset').title('Images'))
    ])
