import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { services } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const servicesData = await db
      .select()
      .from(services)
      .orderBy(desc(services.createdAt))

    return NextResponse.json(servicesData)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const [service] = await db
      .insert(services)
      .values({
        id: nanoid(),
        name: data.title,
        slug: data.slug,
        description: data.description,
        shortDesc: data.shortDesc || data.description?.substring(0, 100),
        features: data.features || [],
        advantages: data.advantages || [],
        price: data.price,
        priceFrom: data.priceMin,
        priceTo: data.priceMax,
        image: data.image,
        gallery: data.images || [],
        popular: data.featured || false,
        active: data.isActive ?? true,
      })
      .returning()

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
