import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { partners } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET - получить активных партнеров для фронтенда
export async function GET(request: NextRequest) {
  try {
    const activePartners = await db
      .select()
      .from(partners)
      .where(eq(partners.active, true))
      .orderBy(desc(partners.order), desc(partners.createdAt))

    return NextResponse.json(activePartners)
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    )
  }
}

