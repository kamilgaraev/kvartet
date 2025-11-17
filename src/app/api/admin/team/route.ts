import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { team } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// GET - получить всех членов команды
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allTeam = await db
      .select()
      .from(team)
      .orderBy(desc(team.order), desc(team.createdAt))

    return NextResponse.json(allTeam)
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    )
  }
}

// POST - создать нового члена команды
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const newTeamMember = await db
      .insert(team)
      .values({
        id: nanoid(),
        name: data.name,
        position: data.position,
        bio: data.bio,
        photo: data.photo,
        email: data.email,
        phone: data.phone,
        vk: data.vk,
        telegram: data.telegram,
        instagram: data.instagram,
        linkedin: data.linkedin,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
      })
      .returning()

    return NextResponse.json(newTeamMember[0], { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}

// PUT - обновить члена команды
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
        { error: 'Team member ID is required' },
        { status: 400 }
      )
    }

    // Фильтруем только разрешенные поля
    const allowedFields: any = {
      updatedAt: new Date(),
    }
    if (updateData.name !== undefined) allowedFields.name = updateData.name
    if (updateData.position !== undefined) allowedFields.position = updateData.position
    if (updateData.bio !== undefined) allowedFields.bio = updateData.bio
    if (updateData.photo !== undefined) allowedFields.photo = updateData.photo
    if (updateData.email !== undefined) allowedFields.email = updateData.email
    if (updateData.phone !== undefined) allowedFields.phone = updateData.phone
    if (updateData.vk !== undefined) allowedFields.vk = updateData.vk
    if (updateData.telegram !== undefined) allowedFields.telegram = updateData.telegram
    if (updateData.instagram !== undefined) allowedFields.instagram = updateData.instagram
    if (updateData.linkedin !== undefined) allowedFields.linkedin = updateData.linkedin
    if (updateData.active !== undefined) allowedFields.active = updateData.active
    if (updateData.order !== undefined) allowedFields.order = updateData.order

    const updatedTeamMember = await db
      .update(team)
      .set(allowedFields)
      .where(eq(team.id, id))
      .returning()

    if (updatedTeamMember.length === 0) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTeamMember[0])
  } catch (error) {
    console.error('Error updating team member:', error)
    console.error('Error details:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to update team member', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// DELETE - удалить члена команды
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
        { error: 'Team member ID is required' },
        { status: 400 }
      )
    }

    await db.delete(team).where(eq(team.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}

