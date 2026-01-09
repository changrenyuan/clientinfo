import { NextRequest, NextResponse } from "next/server"
import { contactManager } from "@/storage/database"

// GET /api/contacts/[id] - 获取单个联系人
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const contact = await contactManager.getContactById(id)

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "联系人不存在" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error("获取联系人失败:", error)
    return NextResponse.json(
      { success: false, error: "获取联系人失败" },
      { status: 500 }
    )
  }
}

// PUT /api/contacts/[id] - 更新联系人
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const contact = await contactManager.updateContact(id, body)

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "联系人不存在" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error("更新联系人失败:", error)
    return NextResponse.json(
      { success: false, error: "更新联系人失败" },
      { status: 500 }
    )
  }
}

// DELETE /api/contacts/[id] - 删除联系人
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const success = await contactManager.deleteContact(id)

    if (!success) {
      return NextResponse.json(
        { success: false, error: "联系人不存在" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "联系人删除成功",
    })
  } catch (error) {
    console.error("删除联系人失败:", error)
    return NextResponse.json(
      { success: false, error: "删除联系人失败" },
      { status: 500 }
    )
  }
}
