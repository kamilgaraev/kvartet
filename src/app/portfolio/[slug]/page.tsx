import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { portfolioItems } from '@/db/schema'
import { eq } from 'drizzle-orm'
import PortfolioClient from './PortfolioClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const dynamicParams = true

async function getPortfolioItem(slug: string) {
  const [item] = await db
    .select()
    .from(portfolioItems)
    .where(eq(portfolioItems.slug, slug))
    .limit(1)
  
  return item
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = await getPortfolioItem(slug)

  if (!item) {
    return {
      title: 'Проект не найден',
    }
  }

  return {
    title: item.metaTitle || `${item.title} | Портфолио Квартет`,
    description: item.metaDescription || item.shortDesc || item.description?.substring(0, 160),
    openGraph: {
      title: item.metaTitle || item.title,
      description: item.metaDescription || item.shortDesc || item.description?.substring(0, 160),
      images: [item.image],
    },
    keywords: item.metaKeywords,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getPortfolioItem(slug)

  if (!item) {
    notFound()
  }

  return <PortfolioClient item={item} />
}
