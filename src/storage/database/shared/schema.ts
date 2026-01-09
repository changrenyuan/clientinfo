import { pgTable, index, varchar, integer, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createSchemaFactory } from "drizzle-zod"
import { z } from "zod"

export const contacts = pgTable("contacts", {
	id: varchar({ length: 36 }).default(sql`gen_random_uuid()`).primaryKey().notNull(),
	name: varchar({ length: 128 }).notNull(),
	gender: varchar({ length: 10 }),
	age: integer(),
	phone: varchar({ length: 20 }).notNull(),
	idCard: varchar("id_card", { length: 18 }),
	address: text(),
	email: varchar({ length: 255 }),
	company: varchar({ length: 255 }),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("contacts_name_idx").on(table.name),
	index("contacts_phone_idx").on(table.phone),
])

// 使用 createSchemaFactory 配置 date coercion（处理前端 string → Date 转换）
const { createInsertSchema: createCoercedInsertSchema } = createSchemaFactory({
  coerce: { date: true },
})

// Zod schemas for validation
export const insertContactSchema = createCoercedInsertSchema(contacts).pick({
  name: true,
  gender: true,
  age: true,
  phone: true,
  idCard: true,
  address: true,
  email: true,
  company: true,
  notes: true,
})

export const updateContactSchema = createCoercedInsertSchema(contacts)
  .pick({
    name: true,
    gender: true,
    age: true,
    phone: true,
    idCard: true,
    address: true,
    email: true,
    company: true,
    notes: true,
  })
  .partial()

// TypeScript types
export type Contact = typeof contacts.$inferSelect
export type InsertContact = z.infer<typeof insertContactSchema>
export type UpdateContact = z.infer<typeof updateContactSchema>
