import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { themeSettings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// GET - получить настройки темы
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const theme = await db.select().from(themeSettings).limit(1)

    if (theme.length === 0) {
      // Создать дефолтную тему если не существует
      const defaultTheme = await db
        .insert(themeSettings)
        .values({
          id: nanoid(),
          themeName: 'default',
        })
        .returning()

      return NextResponse.json(defaultTheme[0])
    }

    return NextResponse.json(theme[0])
  } catch (error) {
    console.error('Error fetching theme:', error)
    return NextResponse.json(
      { error: 'Failed to fetch theme' },
      { status: 500 }
    )
  }
}

// PUT - обновить настройки темы
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json(
        { error: 'Theme ID is required' },
        { status: 400 }
      )
    }

    const updatedTheme = await db
      .update(themeSettings)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(themeSettings.id, id))
      .returning()

    if (updatedTheme.length === 0) {
      return NextResponse.json(
        { error: 'Theme not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTheme[0])
  } catch (error) {
    console.error('Error updating theme:', error)
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    )
  }
}

// POST - создать новую тему (preset)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const newTheme = await db
      .insert(themeSettings)
      .values({
        id: nanoid(),
        ...data,
      })
      .returning()

    return NextResponse.json(newTheme[0], { status: 201 })
  } catch (error) {
    console.error('Error creating theme:', error)
    return NextResponse.json(
      { error: 'Failed to create theme' },
      { status: 500 }
    )
  }
}

