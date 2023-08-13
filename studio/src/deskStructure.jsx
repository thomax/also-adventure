import React from 'react'

import {
  MdSettings,
  MdPalette,
  MdToys,
  MdFolder,
  MdPerson,
  MdBook,
  MdLibraryBooks,
  MdDirectionsBoat
} from 'react-icons/md'

import {EditIcon} from '@sanity/icons'
import {EyeOpenIcon} from '@sanity/icons'
import ArticlePreview from './previews/article/ArticlePreview'
//import SpaceshipSummary from './previews/spaceship/SpaceshipSummary'
import DeveloperPreview from './previews/spaceship/DeveloperPreview'

import {useClient} from 'sanity'

const today = new Date().toISOString().split('T')[0]

const fetchSystemGroups = client => {
  return client.fetch('*[_type=="system.group"]')
}

const fetchCategoriesWithPosts = (campaignId, client) => {
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
  return client.fetch(query, {campaignId})
}

function campaignPostsByCategory(S, campaignId, client) {
  return fetchCategoriesWithPosts(campaignId, client).then(categories => {
    return S.list()
      .title('Categories')
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
              .icon(MdFolder)
              .child(id =>
                S.documentList()
                  .title(`${category.title}s`)
                  .schemaType('post')
                  .menuItems([
                    ...S.documentTypeList('post').getMenuItems(),
                    S.orderingMenuItem({
                      title: 'Order ascending',
                      by: [{field: 'order', direction: 'asc'}]
                    }),
                    S.orderingMenuItem({
                      title: 'Order descending',
                      by: [{field: 'order', direction: 'desc'}]
                    })
                  ])
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
                          .icon(EyeOpenIcon)
                          .title('Preview')
                      ])
                  )
              )
          })
      )
  })
}

export default S => {
  const client = useClient({apiVersion: today})

  return fetchSystemGroups(client).then(systemGroups => {
    return S.list()
      .title('Content')
      .items([
        S.listItem()
          .title('Posts by campaign')
          .icon(MdBook)
          .schemaType('campaign')
          .child(
            S.documentTypeList('campaign')
              .title('Select campaign')
              .filter('_type == "campaign"')
              .child(campaignId => campaignPostsByCategory(S, campaignId, client))
          ),
        S.listItem()
          .title('All posts')
          .icon(MdLibraryBooks)
          .schemaType('post')
          .child(
            S.documentTypeList('post')
              .title('Posts')
              .child(documentId =>
                S.document()
                  .documentId(documentId)
                  .schemaType('post')
                  .views([
                    S.view.form().icon(EditIcon),
                    S.view
                      .component(ArticlePreview)
                      .icon(EyeOpenIcon)
                      .title('Preview')
                  ])
              )
          ),
        S.listItem()
          .title('Campaigns')
          .icon(MdToys)
          .schemaType('campaign')
          .child(S.documentTypeList('campaign').title('Campaigns')),
        S.listItem()
          .title('Talents')
          .icon(MdToys)
          .schemaType('talent')
          .child(S.documentTypeList('talent').title('Talents')),
        S.listItem()
          .title('Categories')
          .icon(MdFolder)
          .schemaType('category')
          .child(S.documentTypeList('category').title('Categories')),
        S.listItem()
          .title('Images')
          .icon(MdPalette)
          .schemaType('sanity.imageAsset')
          .child(S.documentTypeList('sanity.imageAsset').title('Images')),
        S.listItem()
          .title('Users')
          .icon(MdPerson)
          .schemaType('user')
          .child(S.documentTypeList('user').title('Users')),
        S.listItem()
          .title('Spaceships')
          .icon(MdDirectionsBoat)
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
                              .component(DeveloperPreview)
                              .icon(EyeOpenIcon)
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
                  .title('Ship Features')
                  .child(S.documentTypeList('shipFeature').title('Ship Feature')),
                S.listItem()
                  .title('Ship Weapons')
                  .child(S.documentTypeList('shipWeapon').title('Ship Weapon')),
                S.listItem()
                  .title('Ship Ammo')
                  .child(S.documentTypeList('shipAmmo').title('Ship Ammo'))
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
                          `<div>
                            <pre>{JSON.stringify(systemGroup, null, 2)}</pre>
                          </div>`
                        )
                    )
                )
              )
              .menuItems([
                S.menuItem()
                  .title('New Level 1 Item')
                  .intent({type: 'create', params: {type: 'mydocument'}}),
                S.menuItem()
                  .title('Edit this Level 1 Item')
                  .intent({type: 'edit', params: {type: 'mydocument', id: 'asdf'}})
              ])
          )
      ])
  })
}
