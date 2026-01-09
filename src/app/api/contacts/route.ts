import { NextRequest, NextResponse } from "next/server"
import { contactManager } from "@/storage/database"

// GET /api/contacts - 获取联系人列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || undefined

    const skip = (page - 1) * limit

    const [contacts, total] = await Promise.all([
      contactManager.getContacts({ skip, limit, search }),
      contactManager.getContactsCount(search),
    ])

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("获取联系人列表失败:", error)
    return NextResponse.json(
      { success: false, error: "获取联系人列表失败" },
      { status: 500 }
    )
  }
}

// POST /api/contacts - 创建新联系人
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 基本验证
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: "姓名和电话为必填项" },
        { status: 400 }
      )
    }

    const contact = await contactManager.createContact(body)

    return NextResponse.json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error("创建联系人失败:", error)
    return NextResponse.json(
      { success: false, error: "创建联系人失败" },
      { status: 500 }
    )
  }
}
