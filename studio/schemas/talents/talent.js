import shared from '../shared'
const talentTypes = shared.talentTypes


export default {
  title: 'Talent',
  name: 'talent',
  type: 'object',
  liveEdit: true,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Body',
      name: 'body',
      type: 'text'
    },
    {
      title: 'Prerequisite',
      name: 'prerequisite',
      type: 'reference',
      to: {type: 'talent'}
    },
    {
      title: 'Talent Type',
      name: 'talentType',
      type: 'string',
      options: {
        list: talentTypes
      }
    },
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
      talentType: 'talentType'
    },
    prepare({title, body, talentType}) {
      return {
        title: `${title} [${talentType}]`,
        subtitle: `${body.substring(0, 25)}...`,
      }
    }
  }
}
