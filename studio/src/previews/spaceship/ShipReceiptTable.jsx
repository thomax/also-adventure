/* eslint-disable react/prop-types */

import React from 'react'
import numeral from 'numeral'
import styles from './SpaceshipSummary.css?inline'

function addItemPrices(pricesItemized) {
  let total = 0
  pricesItemized.forEach(item => (total = total + item.price))
  return total
}

export default function ShipReceiptTable(props) {
  const {pricesItemized, baseprice} = props
  const totalPrice = baseprice + addItemPrices(pricesItemized)
  const alignRight = {textAlign: 'right'}
  return (
    <table className={styles.table} cellSpacing={0}>
      <thead>
        <tr>
          <th colSpan={2}>Price by item</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Base price</th>
          <td style={alignRight}>{numeral(baseprice).format('0,0')}</td>
        </tr>

        {pricesItemized.map((priceItem, index) => {
          const {item, name, price} = priceItem
          return (
            <tr key={`${item}-${index}`}>
              <th>{name}</th>
              <td style={alignRight}>{numeral(price).format('0,0')}</td>
            </tr>
          )
        })}
        <tr>
          <th>Total</th>
          <td style={alignRight}>{numeral(totalPrice).format('0,0')}</td>
        </tr>
      </tbody>
    </table>
  )
}
