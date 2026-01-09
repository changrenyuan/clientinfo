import { pgTable } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createSchemaFactory } from "drizzle-zod"
import { z } from "zod"
import { text, varchar, integer, timestamp } from "drizzle-orm/pg-core"
import { index } from "drizzle-orm/pg-core"

export const contacts = pgTable(
  "contacts",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 128 }).notNull(),
    gender: varchar("gender", { length: 10 }),
    age: integer("age"),
    phone: varchar("phone", { length: 20 }).notNull(),
    idCard: varchar("id_card", { length: 18 }),
    address: text("address"),
    email: varchar("email", { length: 255 }),
    company: varchar("company", { length: 255 }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    nameIdx: index("contacts_name_idx").on(table.name),
    phoneIdx: index("contacts_phone_idx").on(table.phone),
  })
)

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




