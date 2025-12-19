import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { portfolioItems } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const [item] = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.id, id))
      .limit(1)

    if (!item) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    console.log('Updating portfolio item:', id)
    console.log('Description length:', data.description?.length || 0)
    console.log('Description preview:', data.description?.substring(0, 100) || 'empty')

    const [updatedItem] = await db
      .update(portfolioItems)
      .set({
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDesc: data.shortDesc,
        category: data.category,
        image: data.image,
        gallery: data.gallery,
        challenge: data.challenge,
        solution: data.solution,
        reviewText: data.reviewText,
        reviewAuthor: data.reviewAuthor,
        reviewRole: data.reviewRole,
        result: data.result,
        budget: data.budget,
        duration: data.duration,
        year: data.year ? parseInt(data.year) : undefined,
        rating: data.rating ? parseFloat(data.rating) : undefined,
        features: data.features,
        tags: data.tags,
        popular: data.popular,
        active: data.active,
        clientName: data.clientName,
        clientWebsite: data.clientWebsite,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        updatedAt: new Date(),
      })
      .where(eq(portfolioItems.id, id))
      .returning()

    if (!updatedItem) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await db
      .delete(portfolioItems)
      .where(eq(portfolioItems.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

