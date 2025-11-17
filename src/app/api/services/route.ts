import { NextResponse } from 'next/server'
import { db } from '@/db'
import { services } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET - получить активные услуги для фронтенда
export async function GET() {
  try {
    const activeServices = await db
      .select()
      .from(services)
      .where(eq(services.active, true))
      .orderBy(desc(services.order), desc(services.createdAt))

    return NextResponse.json(activeServices)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

