import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { contactInfo } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// GET - получить всю контактную информацию
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allContacts = await db
      .select()
      .from(contactInfo)
      .orderBy(desc(contactInfo.order), desc(contactInfo.createdAt))

    return NextResponse.json(allContacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

// POST - создать новый контакт
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const newContact = await db
      .insert(contactInfo)
      .values({
        id: nanoid(),
        type: data.type,
        label: data.label,
        value: data.value,
        icon: data.icon,
        isPrimary: data.isPrimary || false,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
      })
      .returning()

    return NextResponse.json(newContact[0], { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    )
  }
}

// PUT - обновить контакт
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      )
    }

    // Фильтруем только разрешенные поля
    const allowedFields: any = {
      updatedAt: new Date(),
    }
    if (updateData.type !== undefined) allowedFields.type = updateData.type
    if (updateData.label !== undefined) allowedFields.label = updateData.label
    if (updateData.value !== undefined) allowedFields.value = updateData.value
    if (updateData.icon !== undefined) allowedFields.icon = updateData.icon
    if (updateData.isPrimary !== undefined) allowedFields.isPrimary = updateData.isPrimary
    if (updateData.active !== undefined) allowedFields.active = updateData.active
    if (updateData.order !== undefined) allowedFields.order = updateData.order

    const updatedContact = await db
      .update(contactInfo)
      .set(allowedFields)
      .where(eq(contactInfo.id, id))
      .returning()

    if (updatedContact.length === 0) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedContact[0])
  } catch (error) {
    console.error('Error updating contact:', error)
    console.error('Error details:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to update contact', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// DELETE - удалить контакт
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      )
    }

    await db.delete(contactInfo).where(eq(contactInfo.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    )
  }
}

