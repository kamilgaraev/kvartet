import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { socialLinks, contactInfo, themeSettings } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET - получить все настройки сайта (соцсети, контакты, тема)
export async function GET(request: NextRequest) {
  try {
    // Получить активные соцсети
    const activeSocialLinks = await db
      .select()
      .from(socialLinks)
      .where(eq(socialLinks.active, true))
      .orderBy(desc(socialLinks.order))

    // Получить активные контакты
    const activeContacts = await db
      .select()
      .from(contactInfo)
      .where(eq(contactInfo.active, true))
      .orderBy(desc(contactInfo.order))

    // Получить тему
    const theme = await db.select().from(themeSettings).limit(1)

    return NextResponse.json({
      socialLinks: activeSocialLinks,
      contacts: activeContacts,
      theme: theme[0] || null,
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

