import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { portfolioItems, services } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portfolio = await db
      .select({
        id: portfolioItems.id,
        title: portfolioItems.title,
        slug: portfolioItems.slug,
        description: portfolioItems.description,
        shortDesc: portfolioItems.shortDesc,
        category: portfolioItems.category,
        categoryColor: portfolioItems.categoryColor,
        image: portfolioItems.image,
        gallery: portfolioItems.gallery,
        result: portfolioItems.result,
        budget: portfolioItems.budget,
        duration: portfolioItems.duration,
        year: portfolioItems.year,
        rating: portfolioItems.rating,
        features: portfolioItems.features,
        tags: portfolioItems.tags,
        popular: portfolioItems.popular,
        active: portfolioItems.active,
        order: portfolioItems.order,
        clientName: portfolioItems.clientName,
        clientWebsite: portfolioItems.clientWebsite,
        clientLogo: portfolioItems.clientLogo,
        metaTitle: portfolioItems.metaTitle,
        metaDescription: portfolioItems.metaDescription,
        metaKeywords: portfolioItems.metaKeywords,
        createdAt: portfolioItems.createdAt,
        updatedAt: portfolioItems.updatedAt,
        serviceId: portfolioItems.serviceId,
        service: {
          id: services.id,
          name: services.name,
          slug: services.slug,
        },
      })
      .from(portfolioItems)
      .leftJoin(services, eq(portfolioItems.serviceId, services.id))
      .orderBy(desc(portfolioItems.createdAt))

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
    
    const [portfolioItem] = await db
      .insert(portfolioItems)
      .values({
        id: nanoid(),
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDesc: data.shortDesc || data.description?.substring(0, 150),
        category: data.category,
        categoryColor: data.categoryColor,
        image: data.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
        gallery: data.gallery || [],
        
        // Extended fields
        challenge: data.challenge,
        solution: data.solution,
        reviewText: data.reviewText,
        reviewAuthor: data.reviewAuthor,
        reviewRole: data.reviewRole,
        
        result: data.result,
        budget: data.budget,
        duration: data.duration,
        year: data.year ? parseInt(data.year) : new Date().getFullYear(),
        rating: data.rating ? parseFloat(data.rating) : 5.0,
        features: data.features || [],
        tags: data.tags || [],
        popular: data.popular ?? false,
        active: data.active ?? true,
        clientName: data.clientName,
        clientWebsite: data.clientWebsite,
      })
      .returning()

    return NextResponse.json(portfolioItem, { status: 201 })
  } catch (error) {
    console.error('Error creating portfolio item:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
