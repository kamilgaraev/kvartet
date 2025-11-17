import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { portfolioItems } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const [portfolioItem] = await db
      .select()
      .from(portfolioItems)
      .where(
        and(
          eq(portfolioItems.slug, slug),
          eq(portfolioItems.active, true)
        )
      )

    if (!portfolioItem) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(portfolioItem)
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
