import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const files = pgTable('files', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  key: text('key').notNull(),
  contentType: text('contentType').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type InsetFilesType = InferInsertModel<typeof files>
export type SelectFilesType = InferSelectModel<typeof files>
