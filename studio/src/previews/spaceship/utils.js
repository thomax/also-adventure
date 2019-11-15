function priceTag(price, isAbsolute, baseprice) {
  if (!price || price === 0) {
    return 0
  }
  return isAbsolute ? price : (baseprice * price) / 100
}

export function calculateShip(doc) {
  const {
    name,
    problem,
    template,
    image,
    modules: installedModules,
    shipyard,
    weapons: installedWeapons,
    features: installedFeatures
  } = doc

  const {
    modules,
    hullPoints,
    energyPoints,
    maneuverability,
    size,
    signature,
    armor,
    speed,
    baseprice,
    bonusWeaponModules,
    name: templateName
  } = template

  const ship = {
    name,
    templateName,
    modules,
    bonusWeaponModules,
    problem,
    hullPoints,
    energyPoints,
    maneuverability,
    size,
    image,
    signature,
    armor,
    speed,
    baseprice,
    additionalPrice: 0,
    shipyard,
    installedModules,
    installedFeatures,
    installedWeapons
  }

  const pricesItemized = []
  // shipyard
  if (shipyard) {
    ship.additionalPrice = ship.additionalPrice + priceTag(shipyard.price, false, ship.baseprice)
    pricesItemized.push({
      item: 'shipyard',
      name: shipyard.name,
      price: priceTag(shipyard.price, false, ship.baseprice)
    })
    if (shipyard.bonuses) {
      shipyard.bonuses.forEach(bonus => {
        const {statAffected, amount, multiplier} = bonus
        if (multiplier) {
          ship[statAffected] = ship[statAffected] + amount * ship[multiplier]
        } else {
          ship[statAffected] = ship[statAffected] + amount
        }
      })
    }
  }

  // installedModules
  if (installedWeapons) {
    installedModules.forEach(module => {
      const {price, bonuses} = module
      ship.additionalPrice = ship.additionalPrice + priceTag(price, true, ship.baseprice)
      pricesItemized.push({
        item: 'module',
        name: module.name,
        price: priceTag(price, true, ship.baseprice)
      })

      if (bonuses) {
        bonuses.forEach(bonus => {
          const {statAffected, amount, multiplier} = bonus
          if (multiplier) {
            ship[statAffected] = ship[statAffected] + amount * ship[multiplier]
          } else {
            ship[statAffected] = ship[statAffected] + amount
          }
        })
      }
    })
  }

  // installedFeatures
  if (installedFeatures) {
    installedFeatures.forEach(feature => {
      const {price, bonuses} = feature
      ship.additionalPrice = ship.additionalPrice + priceTag(price, false, ship.baseprice)
      pricesItemized.push({
        item: 'feature',
        name: feature.name,
        price: priceTag(price, false, ship.baseprice)
      })
      if (bonuses) {
        bonuses.forEach(bonus => {
          const {statAffected, amount, multiplier} = bonus
          if (multiplier) {
            ship[statAffected] = ship[statAffected] + amount * ship[multiplier]
          } else {
            ship[statAffected] = ship[statAffected] + amount
          }
        })
      }
    })
  }

  // installedWeapons
  if (installedWeapons) {
    installedWeapons.forEach(weapon => {
      const {price} = weapon
      ship.additionalPrice = ship.additionalPrice + priceTag(price, true, ship.baseprice)
      pricesItemized.push({
        item: 'weapon',
        name: weapon.name,
        price: priceTag(price, true, ship.baseprice)
      })
    })

    return {ship, pricesItemized}
  }
}

export function arabicToRoman(number) {
  return ['', 'I', 'II', 'III', 'IV', 'V'][number]
}
