import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const portfolioItem = await prisma.portfolioItem.findUnique({
      where: {
        slug: slug,
        active: true
      }
    })

    if (!portfolioItem) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(portfolioItem)
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 