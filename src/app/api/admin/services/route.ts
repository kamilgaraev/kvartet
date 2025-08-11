import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(services)
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
    
    const service = await prisma.service.create({
      data: {
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
      }
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 