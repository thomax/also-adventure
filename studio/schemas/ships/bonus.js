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
      type: 'string'
    },
    {
      title: 'Multiplier',
      name: 'multiplier',
      type: 'string'
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
