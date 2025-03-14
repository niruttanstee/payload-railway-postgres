import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { Media } from './collections/Media'
import Users from './collections/Users'
import Services from './collections/Services'

export default buildConfig({
  serverURL : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://127.0.0.1:3000',
  admin: {
    user: Users.slug,
  bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Media, Users, Services],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
