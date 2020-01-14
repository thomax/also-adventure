/* eslint-disable react/prop-types */

import React from 'react'
import {arabicToRoman} from './utils'
import styles from './SpaceshipSummary.css'

const cargoCapacityBySize = {
  1: 1,
  2: 5,
  3: 50,
  4: 250,
  5: 1000,
  6: 5000,
  7: 25000,
  8: 100000,
  9: 500000
}

const stasisHoldsBySize = {
  1: 1,
  2: 4,
  3: 16,
  4: 64,
  5: 256,
  6: 1024,
  7: 4096,
  8: 16384,
  9: 65536
}

const escapePodsBySize = {
  1: 0,
  2: 1,
  3: 2,
  4: 4,
  5: 16,
  6: 64,
  7: 256,
  8: 1024,
  9: 4096
}

const cabins = {
  'Cabins - Coffins': {
    1: 1,
    2: 4,
    3: 16,
    4: 64,
    5: 256,
    6: 1024,
    7: 4096,
    8: 16384,
    9: 65536
  },
  'Cabins - Standard': {
    1: 0,
    2: 1,
    3: 4,
    4: 16,
    5: 64,
    6: 256,
    7: 1024,
    8: 4096,
    9: 16384
  },
  'Cabins - Suite': {
    1: 0,
    2: 0,
    3: 1,
    4: 4,
    5: 16,
    6: 64,
    7: 256,
    8: 1024,
    9: 4096
  }
}

const prisonCapacityBySize = {
  1: 0,
  2: 1,
  3: 4,
  4: 16,
  5: 64,
  6: 256,
  7: 1024,
  8: 4096,
  9: 16384
}

export default function ShipTable(props) {
  const {ship} = props
  const {
    name,
    templateName,
    problem,
    hullPoints,
    energyPoints,
    maneuverability,
    size,
    signature,
    armor,
    speed,
    shipyard,
    installedModules,
    installedFeatures,
    installedWeapons
  } = ship

  const numberOfPrisons = installedModules.filter(mod => mod.name === 'Prison').length
  const numberOfCargoHolds = installedModules.filter(mod => mod.name === 'Cargo hold').length
  const numberOfStasisHolds = installedModules.filter(mod => mod.name === 'Stasis hold').length
  const numberOfEscapePods = installedModules.filter(mod => mod.name === 'Escape pods').length
  const cabinsCoffin = installedModules.filter(mod => mod.name === 'Cabins - Coffins').length
  const cabinsStandard = installedModules.filter(mod => mod.name === 'Cabins - Standard').length
  const cabinsSuite = installedModules.filter(mod => mod.name === 'Cabins - Suite').length
  const numberOfCabinsCoffin = cabins['Cabins - Coffins'][ship.size] * cabinsCoffin
  const numberOfCabinsStandard = cabins['Cabins - Standard'][ship.size] * cabinsStandard
  const numberOfCabinsSuite = cabins['Cabins - Suite'][ship.size] * cabinsSuite
  const numberOfPrisonCells = prisonCapacityBySize[ship.size] * numberOfPrisons

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
            <th>Cabins</th>
            <td>
              {numberOfCabinsCoffin} coffins
              <br />
              {numberOfCabinsStandard} standard
              <br />
              {numberOfCabinsSuite} suites
            </td>
          </tr>
          <tr>
            <th>Escape pods</th>
            <td>
              {escapePodsBySize[ship.size] * numberOfEscapePods} pods [
              {escapePodsBySize[ship.size] * numberOfEscapePods * 4} people]
            </td>
          </tr>
          <tr>
            <th>Stasis capacity</th>
            <td>{stasisHoldsBySize[ship.size] * numberOfStasisHolds} people</td>
          </tr>
          <tr>
            <th>Prison capacity</th>
            <td>{numberOfPrisonCells} people</td>
          </tr>
          <tr>
            <th>Cargo capacity</th>
            <td>{cargoCapacityBySize[ship.size] * numberOfCargoHolds} tons</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
