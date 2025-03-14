import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import { files } from './schema/files-schema'

export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, {
  schema: {
    files,
  },
})
