/* eslint-disable react/prop-types */

import React from 'react'
import numeral from 'numeral'
import {arabicToRoman} from './utils'
import styles from './SpaceshipSummary.css'

export default function ShipTable(props) {
  const {ship} = props
  const {
    name,
    templateName,
    modules,
    problem,
    hullPoints,
    energyPoints,
    maneuverability,
    size,
    bonusWeaponModules,
    signature,
    armor,
    speed,
    baseprice,
    additionalPrice,
    shipyard,
    installedModules,
    installedFeatures,
    installedWeapons
  } = ship

  return (
    <div>
      <table className={styles.table} cellSpacing={0}>
        <thead>
          <tr>
            <th colSpan={2}>
              {name} [Class {arabicToRoman(size)} - {templateName}]
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Energy points</th>
            <td>{energyPoints}</td>
          </tr>
          <tr>
            <th>Hull points</th>
            <td>{hullPoints}</td>
          </tr>
          <tr>
            <th>Maneuverability</th>
            <td>{maneuverability}</td>
          </tr>
          <tr>
            <th>Signature</th>
            <td>{signature}</td>
          </tr>
          <tr>
            <th>Armor</th>
            <td>{armor}</td>
          </tr>
          <tr>
            <th>Speed</th>
            <td>{speed}</td>
          </tr>
          <tr>
            <th>Modules</th>
            <td>{(installedModules || []).map(module => module.name).join(', ')}</td>
          </tr>
          <tr>
            <th>Weapons</th>
            <td>{(installedWeapons || []).map(weapon => weapon.name).join(', ')}</td>
          </tr>
          <tr>
            <th>Features</th>
            <td>{(installedFeatures || []).map(feature => feature.name).join(', ')}</td>
          </tr>
          <tr>
            <th>Problem</th>
            <td>{problem}</td>
          </tr>
          <tr>
            <th>Shipyard</th>
            <td>{shipyard.name}</td>
          </tr>
          <tr>
            <th>Cost</th>
            <td>{numeral(baseprice + additionalPrice).format('0,0')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
