import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { socialLinks } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// GET - получить все соцсети
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allSocialLinks = await db
      .select()
      .from(socialLinks)
      .orderBy(desc(socialLinks.order), desc(socialLinks.createdAt))

    return NextResponse.json(allSocialLinks)
  } catch (error) {
    console.error('Error fetching social links:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social links' },
      { status: 500 }
    )
  }
}

// POST - создать новую соцсеть
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const newSocialLink = await db
      .insert(socialLinks)
      .values({
        id: nanoid(),
        platform: data.platform,
        url: data.url,
        icon: data.icon,
        color: data.color,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
      })
      .returning()

    return NextResponse.json(newSocialLink[0], { status: 201 })
  } catch (error) {
    console.error('Error creating social link:', error)
    return NextResponse.json(
      { error: 'Failed to create social link' },
      { status: 500 }
    )
  }
}

// PUT - обновить соцсеть
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
        { error: 'Social link ID is required' },
        { status: 400 }
      )
    }

    const updatedSocialLink = await db
      .update(socialLinks)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(socialLinks.id, id))
      .returning()

    if (updatedSocialLink.length === 0) {
      return NextResponse.json(
        { error: 'Social link not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedSocialLink[0])
  } catch (error) {
    console.error('Error updating social link:', error)
    return NextResponse.json(
      { error: 'Failed to update social link' },
      { status: 500 }
    )
  }
}

// DELETE - удалить соцсеть
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
        { error: 'Social link ID is required' },
        { status: 400 }
      )
    }

    await db.delete(socialLinks).where(eq(socialLinks.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting social link:', error)
    return NextResponse.json(
      { error: 'Failed to delete social link' },
      { status: 500 }
    )
  }
}

