import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdUser from 'react-icons/lib/md/person'
import MdImage from 'react-icons/lib/md/palette'
import MdCampaign from 'react-icons/lib/md/toys'
import MdPost from 'react-icons/lib/md/book'
import MdPosts from 'react-icons/lib/md/library-books'

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
        .title('Posts by campaign')
        .icon(MdPost)
        .schemaType('campaign')
        .child(
          S.documentTypeList('campaign')
            .title('Select campaign')
            .filter('_type == "campaign"')
            .child(campaignId =>
              S.list()
                .title('Categories')
                .items(getItems(campaignId))
            )
        ),
      S.listItem()
        .title('All posts')
        .icon(MdPosts)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Users')
        .icon(MdUser)
        .schemaType('user')
        .child(S.documentTypeList('user').title('Users')),
      S.listItem()
        .title('Campaigns')
        .icon(MdCampaign)
        .schemaType('campaign')
        .child(S.documentTypeList('campaign').title('Campaigns')),
      S.listItem()
        .title('Images')
        .icon(MdImage)
        .schemaType('sanity.imageAsset')
        .child(S.documentTypeList('sanity.imageAsset').title('Images')),
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
    ])
