const shipStats = [
  'size',
  'maneuverability',
  'modules',
  'bonusWeaponModules',
  'energyPoints',
  'hullPoints',
  'signature',
  'armor',
  'speed',
  'ammoCapacity'
]

export default {
  name: 'bonus',
  title: 'Bonus',
  type: 'object',
  fields: [
    {
      title: 'Amount',
      name: 'amount',
      type: 'number'
    },
    {
      title: 'Stat affected',
      name: 'statAffected',
      type: 'string',
      options: {
        list: shipStats
      }
    },
    {
      title: 'Multiplier',
      name: 'multiplier',
      type: 'string',
      options: {
        list: shipStats
      }
    }
  ],
  preview: {
    select: {
      amount: 'amount',
      statAffected: 'statAffected',
      multiplier: 'multiplier'
    },
    prepare({amount, statAffected, multiplier}) {
      return {
        title: multiplier
          ? `${amount} x ${multiplier} ${statAffected}`
          : `${amount} ${statAffected}`
      }
    }
  }
}
