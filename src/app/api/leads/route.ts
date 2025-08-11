import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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
    const status = url.searchParams.get('status')
    const type = url.searchParams.get('type')
    const priority = url.searchParams.get('priority')
    const search = url.searchParams.get('search')

    const skip = (page - 1) * limit

    // Построение фильтров
    const where: any = {}
    
    if (status) where.status = status
    if (type) where.type = type
    if (priority) where.priority = priority
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignee: {
            select: { name: true, email: true }
          }
        }
      }),
      prisma.lead.count({ where })
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
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
    let utmData = {}
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

    const lead = await prisma.lead.create({
      data: {
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
      }
    })

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
    await prisma.analytics.create({
      data: {
        page: '/api/leads',
        event: 'form_submit',
        data: { leadId: lead.id, type: lead.type },
        ipAddress,
        userAgent
      }
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