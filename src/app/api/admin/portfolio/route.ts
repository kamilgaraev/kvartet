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

    const portfolio = await prisma.portfolioItem.findMany({
      include: {
        service: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
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
    
    const portfolioItem = await prisma.portfolioItem.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDesc: data.shortDesc || data.description?.substring(0, 150),
        category: data.category,
        categoryColor: data.categoryColor,
        image: data.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
        gallery: data.gallery || [],
        result: data.result,
        budget: data.budget,
        year: data.year ? parseInt(data.year) : new Date().getFullYear(),
        rating: data.rating ? parseFloat(data.rating) : 5.0,
        features: data.features || [],
        tags: data.tags || [],
        popular: data.popular ?? false,
        active: data.active ?? true,
        clientName: data.clientName,
        clientWebsite: data.clientWebsite,
      }
    })

    return NextResponse.json(portfolioItem, { status: 201 })
  } catch (error) {
    console.error('Error creating portfolio item:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 