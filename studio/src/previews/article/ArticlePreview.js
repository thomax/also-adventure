/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import sleep from 'sleep-promise'
import Spinner from 'part:@sanity/components/loading/spinner'

import imageUrlBuilder from '@sanity/image-url'
import client from 'part:@sanity/base/client'
import BlockContent from '@sanity/block-content-to-react'

import styles from './ArticlePreview.css'

const query = `
  *[_id==$documentId][0]{
    ...,
    category->{title},
    authors[]->{_id,name},
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug
        }
      }
    }
  }`

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

function serializeInput(props) {
  const {draft, published} = props.document
  const doc = draft || published
  return JSON.stringify(doc)
}

const serializers = {
  marks: {
    internalLink: ({mark, children}) => {
      const {slug = {}} = mark
      const href = `/${slug.current}`
      return <a href={href}>{children}</a>
    },
    link: ({mark, children}) => {
      const {blank, href} = mark
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      )
    }
  }
}

export default class ArticlePreview extends React.Component {
  static propTypes = {
    draft: PropTypes.object,
    published: PropTypes.object
  }

  state = {
    post: null
  }

  fetchDocument(documentId) {
    client.fetch(query, {documentId}).then(post => this.setState({post}))
  }

  componentDidMount() {
    this.fetchDocument(this.props.document.displayed._id)
  }

  componentDidUpdate(prevProps) {
    this.fetchDocument(this.props.document.displayed._id)
  }

  render() {
    const {post} = this.state

    if (!post) {
      return <Spinner center message={`Loading post`} />
    }
    //console.log('post', post)
    return (
      <div className={styles.root}>
        <h2>{post.title}</h2>
        {post.category && <h4>Category: {post.category.title}</h4>}
        {post.authors && <h4>Written by: {post.authors.map(author => author.name).join(', ')}</h4>}
        <div>
          <BlockContent
            blocks={post.body}
            serializers={serializers}
            imageOptions={{w: 320, h: 240, fit: 'max'}}
            projectId={client.clientConfig.projectId}
            dataset={client.clientConfig.dataset}
          />
        </div>
      </div>
    )
  }
}
