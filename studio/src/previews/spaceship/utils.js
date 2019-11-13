export function transformToShip(doc) {
  const {
    name,
    problem,
    template,
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
    name: templateName
  } = template
  const ship = {
    name,
    templateName,
    modules,
    problem,
    hullPoints,
    energyPoints,
    maneuverability,
    size,
    signature,
    armor,
    speed,
    baseprice,
    price: 0,
    shipyard,
    installedModules,
    installedFeatures,
    installedWeapons
  }

  // TODO iterate through all to modify vars and calculate price
  // shipyard
  // installedModules
  // installedFeatures
  // installedWeapons
  return ship
}
