import { eq, and, SQL, like, sql } from "drizzle-orm"
import { getDb } from "coze-coding-dev-sdk"
import { contacts, insertContactSchema, updateContactSchema } from "./shared/schema"
import type { Contact, InsertContact, UpdateContact } from "./shared/schema"

export class ContactManager {
  async createContact(data: InsertContact): Promise<Contact> {
    const db = await getDb()
    const validated = insertContactSchema.parse(data)
    const [contact] = await db.insert(contacts).values(validated).returning()
    return contact
  }

  async getContacts(options: {
    skip?: number
    limit?: number
    filters?: Partial<Pick<Contact, 'id' | 'name' | 'phone' | 'email'>>
    search?: string
  } = {}): Promise<Contact[]> {
    const { skip = 0, limit = 100, filters = {}, search } = options
    const db = await getDb()

    const conditions: SQL[] = []

    // 搜索功能：在姓名、电话、邮箱中搜索
    if (search) {
      conditions.push(
        sql`(${like(contacts.name, `%${search}%`)} OR ${like(contacts.phone, `%${search}%`)} OR ${like(contacts.email, `%${search}%`)})`
      )
    }

    // 精确过滤
    if (filters.id !== undefined) {
      conditions.push(eq(contacts.id, filters.id))
    }
    if (filters.name !== undefined) {
      conditions.push(eq(contacts.name, filters.name))
    }
    if (filters.phone !== undefined) {
      conditions.push(eq(contacts.phone, filters.phone))
    }
    if (filters.email !== undefined && filters.email !== null) {
      conditions.push(eq(contacts.email, filters.email))
    }

    if (conditions.length > 0) {
      return db
        .select()
        .from(contacts)
        .where(and(...conditions))
        .limit(limit)
        .offset(skip)
        .orderBy(contacts.createdAt)
    }

    return db
      .select()
      .from(contacts)
      .limit(limit)
      .offset(skip)
      .orderBy(contacts.createdAt)
  }

  async getContactById(id: string): Promise<Contact | null> {
    const db = await getDb()
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id))
    return contact || null
  }

  async updateContact(id: string, data: UpdateContact): Promise<Contact | null> {
    const db = await getDb()
    const validated = updateContactSchema.parse(data)
    const [contact] = await db
      .update(contacts)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(contacts.id, id))
      .returning()
    return contact || null
  }

  async deleteContact(id: string): Promise<boolean> {
    const db = await getDb()
    const result = await db.delete(contacts).where(eq(contacts.id, id))
    return (result.rowCount ?? 0) > 0
  }

  /**
   * 获取联系人总数
   */
  async getContactsCount(search?: string): Promise<number> {
    const db = await getDb()
    let result: [{ count: bigint }] | []

    if (search) {
      result = await db
        .select({ count: sql<number>`count(*)` })
        .from(contacts)
        .where(
          sql`(${like(contacts.name, `%${search}%`)} OR ${like(contacts.phone, `%${search}%`)})`
        )
    } else {
      result = await db.select({ count: sql<number>`count(*)` }).from(contacts)
    }

    return Number(result[0]?.count ?? 0)
  }
}

export const contactManager = new ContactManager()
