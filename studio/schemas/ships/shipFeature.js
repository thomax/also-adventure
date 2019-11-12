export default {
  name: 'shipFeature',
  title: 'Ship Feature',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text'
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
      description: 'Percent increase from baseprice'
    },
    {
      title: 'Bonuses',
      name: 'bonuses',
      type: 'array',
      of: [{type: 'bonus'}]
    }
  ],
  preview: {
    select: {
      name: 'name',
      price: 'price'
    },
    prepare({name, price}) {
      return {
        title: name,
        subtitle: price || price === 0 ? `${price}%` : 'price varies'
      }
    }
  }
}
