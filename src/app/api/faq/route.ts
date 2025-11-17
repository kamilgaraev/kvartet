import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { faq } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET - получить активные FAQ для фронтенда
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = db
      .select()
      .from(faq)
      .where(eq(faq.active, true))

    if (category) {
      const categoryFaq = await query.where(eq(faq.category, category))
        .orderBy(desc(faq.order), desc(faq.createdAt))
      return NextResponse.json(categoryFaq)
    }

    const activeFaq = await query.orderBy(desc(faq.order), desc(faq.createdAt))

    return NextResponse.json(activeFaq)
  } catch (error) {
    console.error('Error fetching FAQ:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQ' },
      { status: 500 }
    )
  }
}

