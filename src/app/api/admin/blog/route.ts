import { NextResponse } from 'next/server'
import { db } from '@/db'
import { blogPosts } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// GET - получить все посты для админки
export async function GET() {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt))

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST - создать новый пост
export async function POST(request: Request) {
  try {
    const data = await request.json()

    const newPost = {
      id: nanoid(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.insert(blogPosts).values(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

// PUT - обновить пост
export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    await db
      .update(blogPosts)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE - удалить пост
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await db.delete(blogPosts).where(eq(blogPosts.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}

