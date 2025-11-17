import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET - получить активные отзывы для фронтенда
export async function GET(request: NextRequest) {
  try {
    const activeTestimonials = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.active, true))
      .orderBy(desc(testimonials.order), desc(testimonials.createdAt))

    return NextResponse.json(activeTestimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

