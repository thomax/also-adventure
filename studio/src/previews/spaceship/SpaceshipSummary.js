/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'part:@sanity/components/loading/spinner'
import client from 'part:@sanity/base/client'

import styles from './SpaceshipSummary.module.css'
import {calculateShip} from './utils'

const shipQuery = `
  *[_id==$documentId][0]{
    name, problem,
    shipyard->{name, description, price, bonuses, system},
    template->{armor, baseprice, energyPoints, hullPoints, maneuverability, modules, name, signature, size, speed, bonusWeaponModules},
    modules[]->{name, description, price, bonuses},
    weapons[]->{name, description, price},
    features[]->{name, description, price, bonuses}
  }`

export default class SpaceshipSummary extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    draft: PropTypes.object,
    published: PropTypes.object
  }

  state = {ship: null, materializedDocument: null, pricesItemized: null}

  componentDidMount() {
    const {draft, published} = this.props
    const doc = draft || published
    const documentId = doc._id
    client.fetch(shipQuery, {documentId}).then(materialized => {
      const {ship, pricesItemized} = calculateShip(materialized)
      this.setState({materializedDocument: materialized, ship, pricesItemized})
    })
  }

  render() {
    const {history, draft, published} = this.props
    const {snapshot: historical, isLoading} = history.document
    const {ship, materializedDocument} = this.state

    if (!ship) {
      return <Spinner center message="Materializing document" />
    }

    if (!historical && isLoading) {
      return <Spinner center message="Loading document" />
    }

    return (
      <div className={styles.root}>
        <pre>{JSON.stringify(ship, null, 2)}</pre>
        <hr />
        <pre>{JSON.stringify(materializedDocument, null, 2)}</pre>
      </div>
    )
  }
}
