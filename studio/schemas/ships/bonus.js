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
    }
  ],
  preview: {
    select: {
      amount: 'amount',
      statAffected: 'statAffected'
    },
    prepare({amount, statAffected}) {
      return {
        title: `${amount} ${statAffected}`
      }
    }
  }
}
