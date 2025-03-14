import { CollectionConfig } from 'payload/types'

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'service',
  },
  fields: [
    {
        name: 'service',
        type: 'text',
        required: true,
        unique: true
    },
    {
        name: 'description',
        type: 'textarea',
        required: true,
        maxLength: 255,
    }
  ],
}

export default Services
