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
import MdShip from 'react-icons/lib/md/directions-boat'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

import SpaceshipSummary from './previews/spaceship/SpaceshipSummary'

const fetchSystemGroups = () => {
  return sanityClient.fetch('*[_type=="system.group"]')
}

const fetchCategoriesWithPosts = campaignId => {
  return sanityClient.fetch(
    '*[_type == "category"]|order(singular asc){..., "posts": *[_type == "post" && category._ref == ^._id && campaign._ref == $campaignId]|order(order asc)}',
    {campaignId}
  )
}

function campaignPostsByCategory(campaignId) {
  return fetchCategoriesWithPosts(campaignId).then(categories => {
    return S.list()
      .title('Categories')
      .initialValueTemplates([
        S.initialValueTemplateItem('post-by-campaign', {
          campaignId
        })
      ])
      .items(
        categories
          .filter(cat => cat.posts.length > 0)
          .map(category =>
            S.listItem()
              .title(`${category.title} [${category.posts.length}]`)
              .child(
                S.list()
                  .title(`${category.title}s`)
                  .initialValueTemplates([
                    S.initialValueTemplateItem('post-by-campaign-and-category', {
                      campaignId,
                      categoryId: category._id
                    })
                  ])
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
          .title('Spaceships')
          .icon(MdShip)
          .child(
            S.list()
              .title('Ship content')
              .items([
                S.listItem()
                  .title('Ships')
                  .child(
                    S.documentTypeList('ship')
                      .title('Ships')
                      .child(documentId =>
                        S.document()
                          .documentId(documentId)
                          .schemaType('ship')
                          .views([
                            S.view.form().icon(EditIcon),
                            S.view
                              .component(SpaceshipSummary)
                              .icon(EyeIcon)
                              .title('Preview')
                          ])
                      )
                  ),
                S.listItem()
                  .title('Shipyards')
                  .child(S.documentTypeList('shipyard').title('Shipyards')),
                S.listItem()
                  .title('Ship Templates')
                  .child(S.documentTypeList('shipTemplate').title('Ship Templates')),
                S.listItem()
                  .title('Ship Modules')
                  .child(S.documentTypeList('shipModule').title('Ship Module')),
                S.listItem()
                  .title('Ship Weapons')
                  .child(S.documentTypeList('shipWeapon').title('Ship Weapon')),
                S.listItem()
                  .title('Ship Features')
                  .child(S.documentTypeList('shipFeature').title('Ship Feature'))
              ])
          ),
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
