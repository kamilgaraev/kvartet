import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { pageContent } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

// GET - получить контент страницы
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const section = searchParams.get('section')

    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      )
    }

    let query = db.select().from(pageContent).where(eq(pageContent.page, page))

    if (section) {
      const content = await query.where(eq(pageContent.section, section))
      return NextResponse.json(content)
    }

    const allPageContent = await query
    return NextResponse.json(allPageContent)
  } catch (error) {
    console.error('Error fetching page content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page content' },
      { status: 500 }
    )
  }
}

