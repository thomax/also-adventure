/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import sleep from 'sleep-promise'
import Spinner from 'part:@sanity/components/loading/spinner'
import client from 'part:@sanity/base/client'

import styles from './SpaceshipSummary.module.css'
import {calculateShip} from './utils'
import ShipTable from './ShipTable'
import ShipReceiptTable from './ShipReceiptTable'

const shipQuery = `
  *[_id==$documentId][0]{
    name, problem,
    shipyard->{name, description, price, bonuses, system},
    template->{armor, baseprice, energyPoints, hullPoints, maneuverability, modules, name, signature, size, speed, bonusWeaponModules},
    modules[]->{name, description, price, bonuses},
    weapons[]->{name, description, price},
    features[]->{name, description, price, bonuses}
  }`

function serializeInput(props) {
  const {draft, published} = props
  const doc = draft || published
  return JSON.stringify(doc)
}

export default class SpaceshipSummary extends React.Component {
  static propTypes = {
    draft: PropTypes.object,
    published: PropTypes.object
  }

  state = {ship: null, materializedDocument: null, pricesItemized: null}

  materializeShip = async () => {
    const {draft, published} = this.props
    const doc = draft || published
    const documentId = doc._id

    await sleep(1) // sleep to ensure draft is available

    return client.fetch(shipQuery, {documentId}).then(materialized => {
      const {ship, pricesItemized} = calculateShip(materialized)
      this.setState({materializedDocument: materialized, ship, pricesItemized})
    })
  }

  componentDidMount() {
    this.materializeShip()
  }

  componentDidUpdate(prevProps) {
    const oldSerializedInput = serializeInput(prevProps)
    const newSerializedInput = serializeInput(this.props)

    if (oldSerializedInput !== newSerializedInput) {
      this.materializeShip()
    }
  }

  render() {
    const {ship, pricesItemized} = this.state

    if (!ship) {
      return <Spinner center message={`Loading document`} />
    }

    return (
      <div className={styles.root}>
        <ShipTable ship={ship} />
        <ShipReceiptTable pricesItemized={pricesItemized} baseprice={ship.baseprice} />
      </div>
    )
  }
}
