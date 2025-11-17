import 'dotenv/config'
import { db } from './index'
import { 
  users, 
  services, 
  leads, 
  testimonials, 
  faq, 
  team, 
  partners, 
  socialLinks, 
  contactInfo, 
  themeSettings,
  pageContent,
  portfolioItems,
  blogPosts
} from './schema'
import { eq } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)

console.log('📍 DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 30) + '...')

async function main() {
  console.log('🌱 Создание тестового администратора...')
  
  // Check if admin exists
  const existingAdmin = await db
    .select()
    .from(users)
    .where(eq(users.email, 'admin@kvartett.ru'))
    .limit(1)

  let admin
  if (existingAdmin.length > 0) {
    admin = existingAdmin[0]
    console.log('✅ Администратор уже существует:', admin)
  } else {
    [admin] = await db
      .insert(users)
      .values({
        id: nanoid(),
        email: 'admin@kvartett.ru',
        name: 'Администратор',
        role: 'ADMIN',
      })
      .returning()
    console.log('✅ Администратор создан:', admin)
  }

  console.log('🌱 Создание тестовых услуг...')

  const servicesData = [
    {
      id: nanoid(),
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
      id: nanoid(),
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
      id: nanoid(),
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

  for (const serviceData of servicesData) {
    const existing = await db
      .select()
      .from(services)
      .where(eq(services.slug, serviceData.slug))
      .limit(1)

    if (existing.length === 0) {
      await db.insert(services).values(serviceData)
      console.log(`✅ Создана услуга: ${serviceData.name}`)
    } else {
      await db
        .update(services)
        .set(serviceData)
        .where(eq(services.slug, serviceData.slug))
      console.log(`✅ Обновлена услуга: ${serviceData.name}`)
    }
  }

  console.log('✅ Услуги созданы')

  console.log('🌱 Создание тестовых заявок...')

  const leadsData = [
    {
      id: nanoid(),
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
      id: nanoid(),
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

  for (const leadData of leadsData) {
    await db.insert(leads).values(leadData)
  }

  console.log('✅ Заявки созданы')

  console.log('🌱 Создание отзывов...')
  
  const testimonialsData = [
    {
      id: nanoid(),
      name: 'Александр Петров',
      position: 'Директор, ООО "СтройМонтаж"',
      rating: 5,
      text: 'Квартет выполнил заказ на изготовление наружной рекламы быстро и качественно. Особенно порадовали сроки - всего за 2 дня вывеска была готова и установлена. Рекомендую!',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      project: 'Световая вывеска',
      result: '+250% узнаваемости',
      budget: '150 000 ₽',
      videoReview: true,
      active: true,
      order: 5,
    },
    {
      id: nanoid(),
      name: 'Марина Сидорова',
      position: 'Управляющая сетью кафе "Вкусно"',
      rating: 5,
      text: 'Обратились в Квартет за комплексным оформлением нового кафе. Результат превзошел ожидания! Стильный дизайн, качественные материалы, профессиональный монтаж.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      project: 'Комплексное оформление',
      result: '+180% посещаемости',
      budget: '280 000 ₽',
      videoReview: false,
      active: true,
      order: 4,
    },
    {
      id: nanoid(),
      name: 'Дмитрий Козлов',
      position: 'Маркетолог, IT-компания "Софт"',
      rating: 5,
      text: 'Заказывали разработку фирменного стиля и печать презентационных материалов. Дизайнеры Квартета создали потрясающий образ компании. Очень довольны сотрудничеством!',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      project: 'Брендинг и полиграфия',
      result: '+320% лидов',
      budget: '95 000 ₽',
      videoReview: true,
      active: true,
      order: 3,
    },
    {
      id: nanoid(),
      name: 'Елена Волкова',
      position: 'Владелица магазина "Модный стиль"',
      rating: 5,
      text: 'Квартет помог с оформлением витрины и интерьерной рекламой. Продажи выросли на 40%! Спасибо за креативный подход и качественное исполнение.',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      project: 'Витринная реклама',
      result: '+200% продаж',
      budget: '120 000 ₽',
      videoReview: false,
      active: true,
      order: 2,
    },
    {
      id: nanoid(),
      name: 'Игорь Смирнов',
      position: 'Директор автосалона "Премиум Авто"',
      rating: 5,
      text: 'Сотрудничаем с Квартетом уже 3 года. За это время выполнили более 20 проектов - от визиток до билбордов. Всегда высокое качество, разумные цены.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
      project: 'Долгосрочное партнерство',
      result: '+400% клиентов',
      budget: '1 500 000 ₽',
      videoReview: true,
      active: true,
      order: 1,
    },
  ]

  for (const item of testimonialsData) {
    await db.insert(testimonials).values(item).onConflictDoNothing()
  }
  console.log('✅ Отзывы созданы')

  console.log('🌱 Создание FAQ...')
  
  const faqData = [
    {
      id: nanoid(),
      question: 'Какие сроки изготовления наружной рекламы?',
      answer: 'Стандартные сроки изготовления составляют от 3 до 7 рабочих дней в зависимости от сложности и объема заказа. Возможно срочное изготовление за 24-48 часов с доплатой.',
      category: 'production',
      active: true,
      order: 5,
    },
    {
      id: nanoid(),
      question: 'Предоставляете ли вы услуги дизайна?',
      answer: 'Да, у нас работает команда профессиональных дизайнеров. Мы разрабатываем макеты с нуля или дорабатываем ваши идеи. Первый вариант макета предоставляется бесплатно.',
      category: 'services',
      active: true,
      order: 4,
    },
    {
      id: nanoid(),
      question: 'Какая гарантия на вашу продукцию?',
      answer: 'На все виды наружной рекламы предоставляется гарантия от 1 до 3 лет в зависимости от типа конструкции. На полиграфическую продукцию действует гарантия качества печати.',
      category: 'warranty',
      active: true,
      order: 3,
    },
    {
      id: nanoid(),
      question: 'Занимаетесь ли вы монтажом?',
      answer: 'Да, мы осуществляем профессиональный монтаж всех видов рекламных конструкций. Наши специалисты имеют допуски для высотных работ и все необходимые разрешения.',
      category: 'services',
      active: true,
      order: 2,
    },
    {
      id: nanoid(),
      question: 'Какие способы оплаты вы принимаете?',
      answer: 'Мы принимаем оплату наличными, безналичным переводом для юридических лиц, банковскими картами. Возможна рассрочка для крупных заказов.',
      category: 'payment',
      active: true,
      order: 1,
    },
  ]

  for (const item of faqData) {
    await db.insert(faq).values(item).onConflictDoNothing()
  }
  console.log('✅ FAQ созданы')

  console.log('🌱 Создание команды...')
  
  const teamData = [
    {
      id: nanoid(),
      name: 'Алексей Иванов',
      position: 'Генеральный директор',
      bio: 'Основатель компании с 15-летним опытом в рекламной индустрии. Руководит стратегическим развитием и крупными проектами.',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      email: 'ivanov@kvartett-ufa.ru',
      phone: '+7 (347) 123-45-67',
      vk: 'https://vk.com/alexivanov',
      telegram: '@alexivanov',
      active: true,
      order: 4,
    },
    {
      id: nanoid(),
      name: 'Мария Соколова',
      position: 'Арт-директор',
      bio: 'Талантливый дизайнер с творческим подходом к каждому проекту. Специализируется на брендинге и фирменном стиле.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      email: 'sokolova@kvartett-ufa.ru',
      phone: '+7 (347) 123-45-68',
      instagram: '@maria_designer',
      telegram: '@mariadesign',
      active: true,
      order: 3,
    },
    {
      id: nanoid(),
      name: 'Дмитрий Волков',
      position: 'Руководитель производства',
      bio: 'Отвечает за качество и сроки выполнения заказов. Опыт работы в производстве рекламы более 10 лет.',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
      email: 'volkov@kvartett-ufa.ru',
      phone: '+7 (347) 123-45-69',
      active: true,
      order: 2,
    },
    {
      id: nanoid(),
      name: 'Екатерина Петрова',
      position: 'Менеджер по работе с клиентами',
      bio: 'Поможет подобрать оптимальное решение для вашего бизнеса и проконсультирует по всем вопросам.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      email: 'petrova@kvartett-ufa.ru',
      phone: '+7 (347) 123-45-70',
      telegram: '@katya_manager',
      whatsapp: '+79871234570',
      active: true,
      order: 1,
    },
  ]

  for (const item of teamData) {
    await db.insert(team).values(item).onConflictDoNothing()
  }
  console.log('✅ Команда создана')

  console.log('🌱 Создание партнеров...')
  
  const partnersData = [
    {
      id: nanoid(),
      name: '3M',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/3M_wordmark.svg/320px-3M_wordmark.svg.png',
      website: 'https://3m.com',
      description: 'Официальный партнер 3M - поставка качественных материалов для наружной рекламы',
      active: true,
      order: 5,
    },
    {
      id: nanoid(),
      name: 'ORACAL',
      logo: 'https://via.placeholder.com/200x100/2F4454/FFFFFF?text=ORACAL',
      website: 'https://orafol.com',
      description: 'Поставщик премиальных пленок для брендирования и рекламы',
      active: true,
      order: 4,
    },
    {
      id: nanoid(),
      name: 'Roland DG',
      logo: 'https://via.placeholder.com/200x100/376E6F/FFFFFF?text=Roland',
      website: 'https://rolanddg.com',
      description: 'Печатное оборудование Roland - гарантия качества печати',
      active: true,
      order: 3,
    },
    {
      id: nanoid(),
      name: 'Mimaki',
      logo: 'https://via.placeholder.com/200x100/DA7B93/FFFFFF?text=Mimaki',
      website: 'https://mimaki.com',
      description: 'Широкоформатные принтеры для профессиональной печати',
      active: true,
      order: 2,
    },
    {
      id: nanoid(),
      name: 'APPA',
      logo: 'https://via.placeholder.com/200x100/2F4454/FFFFFF?text=APPA',
      website: '#',
      description: 'Член ассоциации производителей рекламы',
      active: true,
      order: 1,
    },
  ]

  for (const item of partnersData) {
    await db.insert(partners).values(item).onConflictDoNothing()
  }
  console.log('✅ Партнеры созданы')

  console.log('🌱 Создание социальных сетей...')
  
  const socialLinksData = [
    {
      id: nanoid(),
      platform: 'ВКонтакте',
      url: 'https://vk.com/kvartett_ufa',
      icon: 'В',
      color: '#2F4454',
      active: true,
      order: 4,
    },
    {
      id: nanoid(),
      platform: 'Telegram',
      url: 'https://t.me/kvartett_ufa',
      icon: 'T',
      color: '#2F4454',
      active: true,
      order: 3,
    },
    {
      id: nanoid(),
      platform: 'WhatsApp',
      url: 'https://wa.me/73471234567',
      icon: 'W',
      color: '#10B981',
      active: true,
      order: 2,
    },
    {
      id: nanoid(),
      platform: 'Instagram',
      url: 'https://instagram.com/kvartett_ufa',
      icon: 'I',
      color: '#DA7B93',
      active: true,
      order: 1,
    },
  ]

  for (const item of socialLinksData) {
    await db.insert(socialLinks).values(item).onConflictDoNothing()
  }
  console.log('✅ Социальные сети созданы')

  console.log('🌱 Создание контактной информации...')
  
  const contactsData = [
    {
      id: nanoid(),
      type: 'address' as const,
      label: 'Адрес',
      value: 'г. Уфа, ул. Ленская, 128',
      icon: 'MapPin',
      isPrimary: true,
      active: true,
      order: 4,
    },
    {
      id: nanoid(),
      type: 'phone' as const,
      label: 'Телефон',
      value: '+7 (347) 123-45-67',
      icon: 'Phone',
      isPrimary: true,
      active: true,
      order: 3,
    },
    {
      id: nanoid(),
      type: 'phone' as const,
      label: 'Дополнительный телефон',
      value: '+7 (347) 123-45-68',
      icon: 'Phone',
      isPrimary: false,
      active: true,
      order: 2,
    },
    {
      id: nanoid(),
      type: 'email' as const,
      label: 'Email',
      value: 'info@kvartett-ufa.ru',
      icon: 'Mail',
      isPrimary: true,
      active: true,
      order: 1,
    },
    {
      id: nanoid(),
      type: 'hours' as const,
      label: 'Время работы',
      value: 'Пн-Пт: 09:00 - 18:00\\nСб: 10:00 - 16:00',
      icon: 'Clock',
      isPrimary: false,
      active: true,
      order: 0,
    },
  ]

  for (const item of contactsData) {
    await db.insert(contactInfo).values(item).onConflictDoNothing()
  }
  console.log('✅ Контакты созданы')

  console.log('🌱 Создание настроек темы...')
  
  const existingTheme = await db.select().from(themeSettings).limit(1)
  
  if (existingTheme.length === 0) {
    await db.insert(themeSettings).values({
      id: nanoid(),
      themeName: 'default',
      colorPrimary: '#2F4454',
      colorPrimaryDark: '#1C3334',
      colorPrimaryLight: '#DA7B93',
      colorPrimaryBg: '#f8f5f6',
      colorAccent: '#376E6F',
      colorTextDark: '#2E151B',
      colorSuccess: '#10B981',
      colorWarning: '#F59E0B',
      fontHeading: 'Inter',
      fontBody: 'Inter',
      fontSizeBase: '16px',
      fontSizeH1: '3rem',
      fontSizeH2: '2.25rem',
      fontSizeH3: '1.875rem',
      borderRadiusBase: '0.5rem',
      borderRadiusLg: '1rem',
      borderRadiusXl: '1.5rem',
    })
    console.log('✅ Тема создана')
  } else {
    console.log('✅ Тема уже существует')
  }

  console.log('✅ Все данные успешно добавлены')
  console.log('🎉 Seed завершен!')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при выполнении seed:', e)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })

