import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { pageContent } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// GET - получить контент страниц
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const section = searchParams.get('section')

    let query = db.select().from(pageContent)

    if (page && section) {
      const content = await query.where(
        and(
          eq(pageContent.page, page),
          eq(pageContent.section, section)
        )
      )
      return NextResponse.json(content)
    } else if (page) {
      const content = await query.where(eq(pageContent.page, page))
      return NextResponse.json(content)
    } else {
      const allContent = await query
      return NextResponse.json(allContent)
    }
  } catch (error) {
    console.error('Error fetching page content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page content' },
      { status: 500 }
    )
  }
}

// POST - создать новый контент
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const newContent = await db
      .insert(pageContent)
      .values({
        id: nanoid(),
        page: data.page,
        section: data.section,
        key: data.key,
        value: data.value,
        type: data.type || 'text',
      })
      .returning()

    return NextResponse.json(newContent[0], { status: 201 })
  } catch (error) {
    console.error('Error creating page content:', error)
    return NextResponse.json(
      { error: 'Failed to create page content' },
      { status: 500 }
    )
  }
}

// PUT - обновить контент
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
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    const updatedContent = await db
      .update(pageContent)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(pageContent.id, id))
      .returning()

    if (updatedContent.length === 0) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedContent[0])
  } catch (error) {
    console.error('Error updating page content:', error)
    return NextResponse.json(
      { error: 'Failed to update page content' },
      { status: 500 }
    )
  }
}

// DELETE - удалить контент
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
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    await db.delete(pageContent).where(eq(pageContent.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page content:', error)
    return NextResponse.json(
      { error: 'Failed to delete page content' },
      { status: 500 }
    )
  }
}

