import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { leads, analytics, users } from '@/db/schema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { eq, and, or, like, ilike, desc, count, sql } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)

// GET - получить все заявки (только для админов)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const statusParam = url.searchParams.get('status')
    const typeParam = url.searchParams.get('type')
    const priorityParam = url.searchParams.get('priority')
    const search = url.searchParams.get('search')

    const skip = (page - 1) * limit

    // Построение фильтров
    const conditions = []
    
    if (statusParam) conditions.push(eq(leads.status, statusParam as any))
    if (typeParam) conditions.push(eq(leads.type, typeParam as any))
    if (priorityParam) conditions.push(eq(leads.priority, priorityParam as any))
    if (search) {
      conditions.push(
        or(
          ilike(leads.name, `%${search}%`),
          ilike(leads.email, `%${search}%`),
          ilike(leads.phone, `%${search}%`),
          ilike(leads.message, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const [leadsData, [{ value: total }]] = await Promise.all([
      db
        .select({
          id: leads.id,
          name: leads.name,
          email: leads.email,
          phone: leads.phone,
          message: leads.message,
          source: leads.source,
          type: leads.type,
          status: leads.status,
          priority: leads.priority,
          serviceType: leads.serviceType,
          budget: leads.budget,
          deadline: leads.deadline,
          details: leads.details,
          utmSource: leads.utmSource,
          utmMedium: leads.utmMedium,
          utmCampaign: leads.utmCampaign,
          utmContent: leads.utmContent,
          utmTerm: leads.utmTerm,
          ipAddress: leads.ipAddress,
          country: leads.country,
          city: leads.city,
          assignedTo: leads.assignedTo,
          notes: leads.notes,
          createdAt: leads.createdAt,
          updatedAt: leads.updatedAt,
          assignee: {
            name: users.name,
            email: users.email,
          },
        })
        .from(leads)
        .leftJoin(users, eq(leads.assignedTo, users.id))
        .where(whereClause)
        .orderBy(desc(leads.createdAt))
        .limit(limit)
        .offset(skip),
      db
        .select({ value: count() })
        .from(leads)
        .where(whereClause),
    ])

    return NextResponse.json({
      leads: leadsData,
      pagination: {
        page,
        limit,
        total: total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - создать новую заявку
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, type, serviceType, budget, deadline, details, source } = body

    // Валидация обязательных полей
    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Name and either email or phone are required' },
        { status: 400 }
      )
    }

    // Получение IP и User-Agent для аналитики
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Извлечение UTM меток из рефеера или headers
    const referer = request.headers.get('referer')
    let utmData: any = {}
    if (referer) {
      const url = new URL(referer)
      utmData = {
        utmSource: url.searchParams.get('utm_source'),
        utmMedium: url.searchParams.get('utm_medium'),
        utmCampaign: url.searchParams.get('utm_campaign'),
        utmContent: url.searchParams.get('utm_content'),
        utmTerm: url.searchParams.get('utm_term')
      }
    }

    const [lead] = await db.insert(leads).values({
      id: nanoid(),
      name,
      email,
      phone,
      message,
      type: type || 'CONTACT',
      serviceType,
      budget,
      deadline,
      details,
      source: source || 'website',
      ipAddress,
      ...utmData
    }).returning()

    // Отправка уведомления в Telegram
    try {
      const { sendTelegramNotification } = await import('@/lib/telegram')
      await sendTelegramNotification({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        serviceType: lead.serviceType,
        budget: lead.budget,
        source: lead.source
      })
    } catch (error) {
      console.error('Error sending Telegram notification:', error)
    }

    // Трекинг события для аналитики
    await db.insert(analytics).values({
      id: nanoid(),
      page: '/api/leads',
      event: 'form_submit',
      data: { leadId: lead.id, type: lead.type },
      ipAddress,
      userAgent
    })

    return NextResponse.json({ 
      success: true, 
      leadId: lead.id,
      message: 'Заявка успешно отправлена' 
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
