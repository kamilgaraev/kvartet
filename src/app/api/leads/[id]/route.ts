import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        assignee: {
          select: { id: true, name: true, email: true }
        }
      }
    })

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

    const updateData: any = {}
    
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo
    if (notes !== undefined) updateData.notes = notes

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: updateData,
      include: {
        assignee: {
          select: { id: true, name: true, email: true }
        }
      }
    })

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

    await prisma.lead.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Заявка успешно удалена' 
    })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 