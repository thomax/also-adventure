export default {
  name: 'shipAmmo',
  title: 'Ship Ammunition',
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
      title: 'Category',
      name: 'category',
      type: 'string',
      options: {
        list: ['Mine', 'Torpedo'],
        layout: 'radio'
      }
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
      title: 'Tech',
      name: 'tech',
      type: 'object',
      fields: [
        {
          title: 'Level',
          name: 'level',
          type: 'string',
          options: {
            list: [
              {title: 'Primitive', value: 'P'},
              {title: 'Ordinary', value: 'O'},
              {title: 'Advanced', value: 'A'},
              {title: 'Faction', value: 'F'},
              {title: 'Portabl Builder', value: 'PB'}
            ],
            layout: 'radio'
          }
        },
        {
          title: 'Need license to purchase',
          name: 'isLicensed',
          type: 'boolean'
        }
      ]
    },
    {
      title: 'Space Required',
      name: 'spaceRequired',
      type: 'number',
      description:
        'One torpedo/mine module can hold 4 torpedoes or 8 mines or any combination of those'
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
      price: 'price',
      tech: 'tech'
    },
    prepare({name, price, tech = {}}) {
      return {
        title: `${name} [${tech.level}${tech.isLicensed ? '*' : ''}]`,
        subtitle: price || price === 0 ? `${price / 1000}k shirr` : 'N/A'
      }
    }
  }
}
