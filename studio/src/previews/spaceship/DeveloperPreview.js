/* eslint-disable react/prop-types */

import React from 'react'
import Spinner from 'part:@sanity/components/loading/spinner'
import styles from './DeveloperPreview.module.css'

function DeveloperPreview(props) {
  const {history, draft, published} = props
  const {snapshot: historical, isLoading} = history.document

  if (!historical && isLoading) {
    return <Spinner center message="Loading document" />
  }

  const doc = historical || draft || published
  return (
    <div className={styles.root}>
      <pre>{JSON.stringify(doc, null, 2)}</pre>
    </div>
  )
}

export default DeveloperPreview
