import { NextResponse } from 'next/server'
import { db } from '@/db'
import { blogPosts } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET - получить опубликованные посты для фронтенда
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt))

    const posts = await query

    // Фильтрация по категории на клиенте, если нужно
    if (category && category !== 'all') {
      return NextResponse.json(posts.filter(p => p.category === category))
    }

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

