import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import sanityClient from 'part:@sanity/base/client'
import MdSettings from 'react-icons/lib/md/settings'
import MdImage from 'react-icons/lib/md/palette'
import MdCampaign from 'react-icons/lib/md/toys'
import MdCategory from 'react-icons/lib/md/folder'
import MdUser from 'react-icons/lib/md/person'
import MdPost from 'react-icons/lib/md/book'
import MdPosts from 'react-icons/lib/md/library-books'

function campaignPostsByCategory(campaignId) {
  return sanityClient
    .fetch(
      '*[_type == "category"]|order(singular asc){..., "posts": *[_type == "post" && category._ref == ^._id && campaign._ref == $campaignId]|order(order asc)}',
      {campaignId}
    )
    .then(categories => {
      return S.list()
        .title('Categories')
        .items(
          categories
            .filter(cat => cat.posts.length > 0)
            .map(category =>
              S.listItem()
                .title(`${category.title} [${category.posts.length}]`)
                .child(
                  S.list()
                    .title(`${category.title}s`)
                    .items(
                      category.posts.map(post => {
                        const order = post.order || post.order === 0 ? `${post.order}` : null
                        const title = [order, post.title || 'untitled'].filter(Boolean).join(' - ')
                        return S.listItem()
                          .id(post._id)
                          .title(title)
                          .icon(MdPost)
                          .child(
                            S.editor()
                              .id(post._id)
                              .schemaType('post')
                              .documentId(post._id)
                          )
                      })
                    )
                )
            )
        )
    })
}

const fetchSystemGroups = () => {
  return sanityClient.fetch('*[_type=="system.group"]')
}

export default () => {
  return fetchSystemGroups().then(systemGroups => {
    return S.list()
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
              .child(campaignId => campaignPostsByCategory(campaignId))
          ),
        S.listItem()
          .title('All posts')
          .icon(MdPosts)
          .schemaType('post')
          .child(S.documentTypeList('post').title('Posts')),
        S.listItem()
          .title('Campaigns')
          .icon(MdCampaign)
          .schemaType('campaign')
          .child(S.documentTypeList('campaign').title('Campaigns')),
        S.listItem()
          .title('Categories')
          .icon(MdCategory)
          .schemaType('category')
          .child(S.documentTypeList('category').title('Categories')),
        S.listItem()
          .title('Images')
          .icon(MdImage)
          .schemaType('sanity.imageAsset')
          .child(S.documentTypeList('sanity.imageAsset').title('Images')),
        S.listItem()
          .title('Users')
          .icon(MdUser)
          .schemaType('user')
          .child(S.documentTypeList('user').title('Users')),
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
          .title('System Groups')
          .icon(MdSettings)
          .child(
            S.list()
              .title(`All the groups`)
              .items(
                systemGroups.map(systemGroup =>
                  S.listItem()
                    .title(systemGroup._id)
                    .icon(MdSettings)
                    .child(
                      S.component()
                        .title(systemGroup._id)
                        .component(
                          <div>
                            <pre>{JSON.stringify(systemGroup, null, 2)}</pre>
                          </div>
                        )
                    )
                )
              )
          )
      ])
  })
}
