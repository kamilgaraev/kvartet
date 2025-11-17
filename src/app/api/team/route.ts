import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { team } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET - получить активных членов команды для фронтенда
export async function GET(request: NextRequest) {
  try {
    const activeTeam = await db
      .select()
      .from(team)
      .where(eq(team.active, true))
      .orderBy(desc(team.order), desc(team.createdAt))

    return NextResponse.json(activeTeam)
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    )
  }
}

