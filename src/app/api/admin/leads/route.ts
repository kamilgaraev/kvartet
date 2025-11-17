import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { leads, users } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const leadsData = await db
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
      .orderBy(desc(leads.createdAt))

    return NextResponse.json(leadsData)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
