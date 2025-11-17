import { NextResponse } from 'next/server'
import { db } from '@/db'
import { portfolioItems } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const item = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.slug, params.slug))
      .limit(1)

    if (item.length === 0) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(item[0])
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    )
  }
}
