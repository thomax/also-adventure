/* eslint-disable react/prop-types */

import React from 'react'
import {styles} from './DeveloperPreview.css.js'

export default function DeveloperPreview(props) {
  return (
    <div style={styles.root}>
      <pre>{JSON.stringify(props.document.displayed, null, 2)}</pre>
    </div>
  )
}
