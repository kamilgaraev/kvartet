import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Создание тестового администратора...')
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kvartett.ru' },
    update: {},
    create: {
      email: 'admin@kvartett.ru',
      name: 'Администратор',
      role: 'ADMIN',
    },
  })

  console.log('✅ Администратор создан:', admin)

  console.log('🌱 Создание тестовых услуг...')

  const services = [
    {
      name: 'Наружная реклама',
      slug: 'outdoor-advertising',
      description: 'Производство и монтаж наружной рекламы. Полный комплекс услуг от дизайна до установки рекламных конструкций.',
      shortDesc: 'Производство и монтаж наружной рекламы',
      features: ['Производство', 'Монтаж', 'Дизайн', 'Согласование'],
      advantages: ['Опыт 10+ лет', 'Гарантия качества', 'Быстрые сроки'],
      priceFrom: 5000,
      priceTo: 100000,
      popular: true,
      active: true,
    },
    {
      name: 'Брендинг и фирменный стиль',
      slug: 'branding',
      description: 'Создание фирменного стиля и айдентики бренда. Разработка логотипа, фирменных цветов, шрифтов и носителей.',
      shortDesc: 'Создание фирменного стиля и айдентики',
      features: ['Логотип', 'Фирменный стиль', 'Брендбук', 'Нейминг'],
      advantages: ['Уникальный дизайн', 'Полный пакет', 'Консультации'],
      priceFrom: 15000,
      priceTo: 200000,
      popular: true,
      active: true,
    },
    {
      name: 'Полиграфия',
      slug: 'printing',
      description: 'Печать рекламной продукции. Офсетная и цифровая печать любых тиражей.',
      shortDesc: 'Печать рекламной продукции',
      features: ['Визитки', 'Флаеры', 'Каталоги', 'Буклеты'],
      advantages: ['Качественная печать', 'Любые тиражи', 'Быстро'],
      priceFrom: 1000,
      priceTo: 50000,
      popular: false,
      active: true,
    }
  ]

  for (const serviceData of services) {
    await prisma.service.upsert({
      where: { slug: serviceData.slug },
      update: serviceData,
      create: serviceData,
    })
  }

  console.log('✅ Услуги созданы')

  console.log('🌱 Создание тестовых заявок...')

  const leads = [
    {
      name: 'Андрей Петров',
      email: 'petrov@example.com',
      phone: '+7 (917) 123-45-67',
      message: 'Нужна наружная реклама для магазина',
      type: 'CONTACT' as const,
      status: 'NEW' as const,
      priority: 'HIGH' as const,
      source: 'website',
      serviceType: 'Наружная реклама',
      budget: '50,000 ₽',
    },
    {
      name: 'ООО "Строй Инвест"',
      email: 'info@stroyinvest.ru',
      phone: '+7 (347) 555-77-88',
      message: 'Требуется печать каталогов',
      type: 'QUOTE' as const,
      status: 'CONTACTED' as const,
      priority: 'MEDIUM' as const,
      source: 'phone',
      serviceType: 'Полиграфия',
      budget: '25,000 ₽',
      assignedTo: admin.id,
    }
  ]

  for (const leadData of leads) {
    await prisma.lead.create({
      data: leadData
    })
  }

  console.log('✅ Заявки созданы')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 