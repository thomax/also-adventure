/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import {arabicToRoman} from './utils'
import styles from './SpaceshipSummary.module.css'

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

  const moduleCount = installedModules.length + installedWeapons.length
  const maxModules = modules + bonusWeaponModules
  const moduleWarning =
    moduleCount > maxModules
      ? `Too many modules! You have ${installedModules.length} modules and ${
          installedWeapons.length
        } weapons. Maximum is ${modules + bonusWeaponModules} combined. ${
          bonusWeaponModules ? bonusWeaponModules + ' can only be weapons' : ''
        }`
      : null

  return (
    <table className={styles.table} cellSpacing={0}>
      <thead>
        <tr>
          <th colSpan={2}>
            {name} - Class {arabicToRoman(size)}
          </th>
        </tr>
      </thead>
      <tbody>
        {moduleWarning && (
          <tr>
            <td colSpan={2} className={styles.warningBorder}>
              {moduleWarning}
            </td>
          </tr>
        )}
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
          <td>{numeral(baseprice + additionalPrice).format('0,0')} birr</td>
        </tr>
      </tbody>
    </table>
  )
}
