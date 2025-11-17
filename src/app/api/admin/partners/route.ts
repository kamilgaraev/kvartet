import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { partners } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// GET - получить всех партнеров
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allPartners = await db
      .select()
      .from(partners)
      .orderBy(desc(partners.order), desc(partners.createdAt))

    return NextResponse.json(allPartners)
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    )
  }
}

// POST - создать нового партнера
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const newPartner = await db
      .insert(partners)
      .values({
        id: nanoid(),
        name: data.name,
        logo: data.logo,
        website: data.website,
        description: data.description,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
      })
      .returning()

    return NextResponse.json(newPartner[0], { status: 201 })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    )
  }
}

// PUT - обновить партнера
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
        { error: 'Partner ID is required' },
        { status: 400 }
      )
    }

    const updatedPartner = await db
      .update(partners)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(partners.id, id))
      .returning()

    if (updatedPartner.length === 0) {
      return NextResponse.json(
        { error: 'Partner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedPartner[0])
  } catch (error) {
    console.error('Error updating partner:', error)
    return NextResponse.json(
      { error: 'Failed to update partner' },
      { status: 500 }
    )
  }
}

// DELETE - удалить партнера
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
        { error: 'Partner ID is required' },
        { status: 400 }
      )
    }

    await db.delete(partners).where(eq(partners.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting partner:', error)
    return NextResponse.json(
      { error: 'Failed to delete partner' },
      { status: 500 }
    )
  }
}

