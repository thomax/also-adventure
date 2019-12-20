import React from 'react'
import {merge, values} from 'lodash'
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
import ArticlePreview from './previews/article/ArticlePreview'

const fetchSystemGroups = () => {
  return sanityClient.fetch('*[_type=="system.group"]')
}

const fetchCategoriesWithPosts = campaignId => {
  const query = `
    *[_type == "category"]|order(singular asc){
      ...,
      "draftDocs": *[
        _type == "post" &&
        _id in path('drafts.**') &&
        category._ref == ^._id &&
        campaign._ref == $campaignId]{_id}|order(order asc),
      "publishedDocs": *[
        _type == "post" &&
        !(_id in path('drafts.**')) &&
        category._ref == ^._id &&
        campaign._ref == $campaignId]{_id}|order(order asc)
    }
  `
  return sanityClient.fetch(query, {campaignId})
}

function campaignPostsByCategory(campaignId) {
  return fetchCategoriesWithPosts(campaignId).then(categories => {
    return S.list()
      .title('Categories')
      .initialValueTemplates([S.initialValueTemplateItem('post-by-campaign', {campaignId})])
      .items(
        categories
          .filter(cat => cat.publishedDocs.length > 0)
          .map(category => {
            const {publishedDocs = [], draftDocs = []} = category
            const uniquePosts = publishedDocs.concat(
              draftDocs.filter(doc => {
                const id = doc._id.replace('drafts.', '')
                return !publishedDocs.some(doc => doc._id === id)
              })
            )
            return S.listItem()
              .id(category._id)
              .title(`${category.title} [${uniquePosts.length}]`)
              .child(id =>
                S.documentList()
                  .title(`${category.title}s`)
                  .schemaType('post')
                  .filter(
                    '_type == "post" && campaign._ref == $campaignId && category._ref == $categoryId'
                  )
                  .params({campaignId, categoryId: category._id})
                  .child(documentId =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('post')
                      .views([
                        S.view.form().icon(EditIcon),
                        S.view
                          .component(ArticlePreview)
                          .icon(EyeIcon)
                          .title('Preview')
                      ])
                  )
              )
          })
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
