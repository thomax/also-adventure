/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import sleep from 'sleep-promise'
import Spinner from 'part:@sanity/components/loading/spinner'

import imageUrlBuilder from '@sanity/image-url'
import sanityClient from 'part:@sanity/base/client'
import BlockContent from '@sanity/block-content-to-react'

import styles from './ArticlePreview.css'
const client = sanityClient.withConfig({apiVersion: '2021-12-12'})

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
          "slug": @.reference->slug,
          "category": @.reference->category
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
      const ref = mark.reference._ref
      const category = mark.category
      const hrefElements = decodeURI(document.location.href).split(';')
      hrefElements[hrefElements.length - 2] = category._ref
      hrefElements[hrefElements.length - 1] = `${ref},view=preview`
      const href = hrefElements.join(';')
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
    document: PropTypes.object
  }

  state = {
    post: null,
    error: null
  }

  fetchDocument(documentId) {
    client
      .fetch(query, {documentId})
      .then(post => this.setState({post}))
      .catch(error => {
        this.setState({error: error.message})
      })
  }

  componentDidMount() {
    const docId = this.props.document.displayed._id
    if (docId) {
      this.fetchDocument(docId)
    }
  }

  componentDidUpdate(prevProps) {
    const docId = this.props.document.displayed._id
    const prevDocId = prevProps.document.displayed._id
    if (docId !== prevDocId) {
      this.fetchDocument(docId)
    }
  }

  render() {
    const {post, error} = this.state

    if (error) {
      return <div className={styles.root}>{error}</div>
    }

    if (!post) {
      return <Spinner center message={`Loading post`} />
    }

    const mainImageUrl = urlFor(post.mainImage)
      .width(1000)
      .url()

    return (
      <div className={styles.root}>
        <div
          className={styles.heading}
          style={{
            backgroundImage: `url(${mainImageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          <h1 className={styles.title}>{post.title}</h1>
          {post.category && <h5 className={styles.title}>Category: {post.category.title}</h5>}
          {post.authors && (
            <h5 className={styles.title}>
              Written by: {post.authors.map(author => author.name).join(', ')}
            </h5>
          )}
        </div>
        <div className={styles.body}>
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
