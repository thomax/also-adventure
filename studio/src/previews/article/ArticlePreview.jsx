/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import {Spinner} from '@sanity/ui'
//import BlockContent from '@sanity/block-content-to-react'
import {PortableText} from '@portabletext/react'
import {styles} from './ArticlePreview.css.js'

import imageUrlBuilder from '@sanity/image-url'
import {useClient} from 'sanity'

const today = new Date().toISOString().split('T')[0]
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

export default function ArticlePreview(props) {
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const client = useClient({apiVersion: today})
  const docId = props.document.displayed._id

  function urlFor(source) {
    const builder = imageUrlBuilder(client)
    return builder.image(source)
  }

  function fetchDocument(documentId) {
    client
      .fetch(query, {documentId})
      .then(post => setPost(post))
      .catch(error => {
        setError(error)
      })
  }

  useEffect(() => {
    if (!post) {
      console.log('post not yet fetched', docId)
      fetchDocument(docId)
    }
  }, [post])

  const mainImageStyle =
    post && post.mainImage
      ? {
          backgroundImage: `url(${urlFor(post.mainImage)
            .width(1000)
            .url()})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }
      : {}

  return (
    <>
      {error ? (
        <div style={styles.root}>{error}</div>
      ) : !post ? (
        <Spinner center message="Loading post" />
      ) : (
        <div style={styles.root}>
          <div style={{...styles.heading, ...mainImageStyle}}>
            <h1 style={styles.title}>{post.title}</h1>
            {post.category && <h5 style={styles.subTitle}>Category: {post.category.title}</h5>}
            {post.authors && (
              <h5 style={styles.subTitle}>
                Written by: {post.authors.map(author => author.name).join(', ')}
              </h5>
            )}
          </div>
          <div style={styles.body}>
            <PortableText value={post.body} />
          </div>
        </div>
      )}
    </>
  )
}
