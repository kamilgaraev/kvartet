import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// GET - получить все отзывы
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allTestimonials = await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.order), desc(testimonials.createdAt))

    return NextResponse.json(allTestimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST - создать новый отзыв
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const newTestimonial = await db
      .insert(testimonials)
      .values({
        id: nanoid(),
        name: data.name,
        position: data.position,
        rating: data.rating || 5,
        text: data.text,
        imageUrl: data.imageUrl,
        project: data.project,
        result: data.result,
        budget: data.budget,
        videoReview: data.videoReview || false,
        videoUrl: data.videoUrl,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
      })
      .returning()

    return NextResponse.json(newTestimonial[0], { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}

// PUT - обновить отзыв
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
        { error: 'Testimonial ID is required' },
        { status: 400 }
      )
    }

    // Фильтруем только разрешенные поля
    const allowedFields: any = {
      updatedAt: new Date(),
    }
    if (updateData.name !== undefined) allowedFields.name = updateData.name
    if (updateData.position !== undefined) allowedFields.position = updateData.position
    if (updateData.rating !== undefined) allowedFields.rating = updateData.rating
    if (updateData.text !== undefined) allowedFields.text = updateData.text
    if (updateData.imageUrl !== undefined) allowedFields.imageUrl = updateData.imageUrl
    if (updateData.project !== undefined) allowedFields.project = updateData.project
    if (updateData.result !== undefined) allowedFields.result = updateData.result
    if (updateData.budget !== undefined) allowedFields.budget = updateData.budget
    if (updateData.videoReview !== undefined) allowedFields.videoReview = updateData.videoReview
    if (updateData.videoUrl !== undefined) allowedFields.videoUrl = updateData.videoUrl
    if (updateData.active !== undefined) allowedFields.active = updateData.active
    if (updateData.order !== undefined) allowedFields.order = updateData.order

    const updatedTestimonial = await db
      .update(testimonials)
      .set(allowedFields)
      .where(eq(testimonials.id, id))
      .returning()

    if (updatedTestimonial.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTestimonial[0])
  } catch (error) {
    console.error('Error updating testimonial:', error)
    console.error('Error details:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to update testimonial', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// DELETE - удалить отзыв
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      )
    }

    await db.delete(testimonials).where(eq(testimonials.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}

