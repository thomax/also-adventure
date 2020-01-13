export default {
  title: 'Ammo',
  name: 'ammoElement',
  type: 'object',
  fields: [
    {
      title: 'Amount',
      name: 'amount',
      type: 'number'
    },
    {
      title: 'Ammo Type',
      name: 'ammoType',
      type: 'reference',
      to: [{type: 'shipAmmo'}]
    }
  ],
  preview: {
    select: {
      amount: 'amount',
      ammoType: 'ammoType.name'
    },
    prepare({amount, ammoType}) {
      return {
        title: `${amount} x ${ammoType}`
      }
    }
  }
}
