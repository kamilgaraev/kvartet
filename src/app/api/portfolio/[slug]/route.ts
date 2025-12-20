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

    const result = item[0]
    console.log('API returning portfolio item:', {
      id: result.id,
      title: result.title,
      descriptionLength: result.description?.length || 0,
      hasChallenge: !!result.challenge,
      hasSolution: !!result.solution
    })

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    })
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    )
  }
}
