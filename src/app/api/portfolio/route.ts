import { NextResponse } from 'next/server'
import { db } from '@/db'
import { portfolioItems, services } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  try {
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
      .where(eq(portfolioItems.active, true))
      .orderBy(desc(portfolioItems.popular), desc(portfolioItems.createdAt))

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
