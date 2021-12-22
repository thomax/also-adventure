/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import sleep from 'sleep-promise'
import Spinner from 'part:@sanity/components/loading/spinner'
import imageUrlBuilder from '@sanity/image-url'

import styles from './SpaceshipSummary.css'
import {calculateShip, arabicToRoman} from './utils'
import ShipTable from './ShipTable'
import ShipReceiptTable from './ShipReceiptTable'

import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({apiVersion: '2021-12-12'})

const FREE_MODULES = 3 // grav projector, bridge, reactor

const shipQuery = `
  *[_id==$documentId][0]{
    name, problem, image,
    shipyard->{name, description, price, bonuses, system},
    template->{armor, baseprice, energyPoints, hullPoints, maneuverability, modules, name, signature, size, speed, ammoCapacity, bonusWeaponModules},
    modules[]->{name, description, price, bonuses},
    weapons[]->{name, description, price},
    ammo[]{amount, ammoType->{name, price, spaceRequired}},
    features[]->{name, description, price, bonuses}
  }`

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

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
    const {draft, published} = this.props.document
    const doc = draft || published
    const documentId = doc._id

    await sleep(2) // sleep to ensure draft is available

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

    const {
      installedModules,
      installedWeapons,
      modules,
      bonusWeaponModules,
      ammo,
      ammoCapacity,
      size,
      name,
      templateName
    } = ship

    const moduleCount = installedModules.length
    const weaponCount = installedWeapons.length
    const maxModules = modules + FREE_MODULES
    const maxModulesAndWeapons = maxModules + bonusWeaponModules

    const mineTorpoCount = ammo
      .map(ammoItem => ammoItem.amount * ammoItem.ammoType.spaceRequired)
      .reduce((a, b) => a + b, 0)
    const tooManyMineTorpos = mineTorpoCount > ammoCapacity

    const tooManyModules = moduleCount > maxModules
    const tooManyWeaponsAndModules = moduleCount + weaponCount > maxModulesAndWeapons
    let moduleWarning = null
    if (tooManyModules || tooManyWeaponsAndModules) {
      moduleWarning = `Too many modules! You can have a maximum of ${maxModulesAndWeapons} installed.`

      if (bonusWeaponModules > 0) {
        moduleWarning = `${moduleWarning} ${bonusWeaponModules} of these slots can only be occupied by weapons`
      }
    }

    let mineTorpoWarning = null
    if (tooManyMineTorpos) {
      mineTorpoWarning = `Too many units of mines/torpedoes! You can have a maximum of ${ammoCapacity} installed`
    }

    let maximumMessage = `${maxModules} of any module`
    if (bonusWeaponModules > 0) {
      maximumMessage = `${maximumMessage} + ${bonusWeaponModules} weapons`
    }

    return (
      <div className={styles.root}>
        <div className={styles.brand}>
          <h2>
            {name} [Class {arabicToRoman(size)} - {templateName}]
          </h2>
          <img
            className={styles.image}
            src={urlFor(ship.image)
              .width(400)
              .url()}
          />
        </div>

        <table className={styles.modulesTable}>
          <tbody>
            <tr>
              <th>Modules installed:</th>
              <td>{moduleCount}</td>
            </tr>
            <tr>
              <th>Weapons installed:</th>
              <td>{weaponCount}</td>
            </tr>
            <tr>
              <th>Total modules installed:</th>
              <td>
                {moduleCount + weaponCount}/{maxModules + bonusWeaponModules}
              </td>
            </tr>
            <tr>
              <th>Maximum allowed:</th>
              <td>{maximumMessage}</td>
            </tr>
            <tr>
              <th>Mine/torpedo units:</th>
              <td>
                {mineTorpoCount}/{ammoCapacity}
              </td>
            </tr>
          </tbody>
        </table>

        {moduleWarning && <p className={styles.warningBorder}>{moduleWarning}</p>}
        {mineTorpoWarning && <p className={styles.warningBorder}>{mineTorpoWarning}</p>}

        <ShipTable ship={ship} />
        <ShipReceiptTable pricesItemized={pricesItemized} baseprice={ship.baseprice} />
      </div>
    )
  }
}
