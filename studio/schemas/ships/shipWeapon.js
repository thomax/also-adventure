export default {
  name: 'shipWeapon',
  title: 'Ship Weapon',
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
      title: 'Bonus',
      name: 'bonus',
      type: 'number'
    },
    {
      title: 'Range',
      name: 'range',
      type: 'string',
      options: {
        list: ['Contact', 'Short', 'Medium', 'Long', 'Extreme'],
        layout: 'radio'
      }
    },
    {
      title: 'Damage',
      name: 'damage',
      type: 'number'
    },
    {
      title: 'Critical',
      name: 'critical',
      type: 'number'
    },
    {
      title: 'Tech leevel',
      name: 'techLevel',
      type: 'string',
      options: {
        list: ['O', 'A', 'A*', 'F', 'F*'],
        layout: 'radio'
      }
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number'
    },
    {
      title: 'Special',
      name: 'special',
      type: 'string'
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
        subtitle: price || price === 0 ? `${price / 1000}k birr` : 'N/A'
      }
    }
  }
}
