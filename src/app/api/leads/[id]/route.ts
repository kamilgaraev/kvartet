import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { leads, users } from '@/db/schema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { eq } from 'drizzle-orm'

// GET - получить конкретную заявку
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [lead] = await db
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
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(leads)
      .leftJoin(users, eq(leads.assignedTo, users.id))
      .where(eq(leads.id, params.id))

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ lead })
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - обновить заявку
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status, priority, assignedTo, notes } = body

    const updateData: any = { updatedAt: new Date() }
    
    if (status !== undefined) updateData.status = status
    if (priority !== undefined) updateData.priority = priority
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo
    if (notes !== undefined) updateData.notes = notes

    const [updatedLead] = await db
      .update(leads)
      .set(updateData)
      .where(eq(leads.id, params.id))
      .returning()

    if (!updatedLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Fetch the complete lead with assignee
    const [lead] = await db
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
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(leads)
      .leftJoin(users, eq(leads.assignedTo, users.id))
      .where(eq(leads.id, params.id))

    return NextResponse.json({ 
      success: true, 
      lead,
      message: 'Заявка успешно обновлена' 
    })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - удалить заявку
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.delete(leads).where(eq(leads.id, params.id))

    return NextResponse.json({ 
      success: true,
      message: 'Заявка успешно удалена' 
    })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
