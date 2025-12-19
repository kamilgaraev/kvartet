'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { 
  Megaphone, 
  Printer, 
  Home, 
  Palette, 
  ArrowRight,
  Check
} from 'lucide-react'

const iconMap: any = {
  'Megaphone': Megaphone,
  'Printer': Printer,
  'Home': Home,
  'Palette': Palette,
}

export default function Services() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Преобразуем данные из API в формат компонента
          const mapped = data.map((s: any, i: number) => ({
            icon: iconMap[s.icon] || Megaphone,
            title: s.name,
            description: s.description || s.shortDesc,
            features: s.features || [],
            gradient: ['bg-gradient-primary', 'bg-gradient-primary-reverse', 'bg-gradient-light', 'bg-gradient-accent'][i % 4],
            bgColor: ['bg-primary-05', 'bg-primary-dark-05', 'bg-primary-light-05', 'bg-primary-light-05'][i % 4],
            href: `/services/${s.slug}`,
            popular: s.popular
          }))
          setServices(mapped)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch services:', error)
        // Fallback к дефолтным данным
        setServices([
          {
            icon: Megaphone,
            title: 'Наружная реклама',
            description: 'Световые короба, баннеры, вывески. Полный цикл производства и монтажа.',
            features: ['Световые короба', 'Баннеры', 'Билборды', 'Вывески'],
            gradient: 'bg-gradient-primary',
            bgColor: 'bg-primary-05',
            href: '/services/outdoor',
            popular: true
          },
          {
            icon: Printer,
            title: 'Полиграфия',
            description: 'Печать рекламной продукции. Офсетная и цифровая печать любых тиражей.',
            features: ['Визитки', 'Листовки', 'Каталоги', 'Буклеты'],
            gradient: 'bg-gradient-primary-reverse',
            bgColor: 'bg-primary-dark-05',
            href: '/services/printing',
            popular: false
          },
          {
            icon: Home,
            title: 'Интерьерная реклама',
            description: 'Оформление офисов и магазинов. Создаем уникальную атмосферу для вашего бизнеса.',
            features: ['Оформление офисов', 'Навигация', 'Стенды', 'POS-материалы'],
            gradient: 'bg-gradient-light',
            bgColor: 'bg-primary-light-05',
            href: '/services/interior',
            popular: false
          },
          {
            icon: Palette,
            title: 'Брендинг и фирменный стиль',
            description: 'Создание фирменного стиля и айдентики бренда. Разработка логотипа, фирменных цветов, шрифтов и носителей.',
            features: ['Логотипы', 'Фирменный стиль', 'Брендбуки', 'Носители'],
            gradient: 'bg-gradient-accent',
            bgColor: 'bg-primary-light-05',
            href: '/services/branding',
            popular: false
          }
        ])
        setLoading(false)
      })
  }, [])

  if (loading || !Array.isArray(services) || services.length === 0) {
    return null
  }

  return (
    <section className="section-padding-y bg-gradient-bg" ref={ref}>
      <div className="container-adaptive">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-10 to-primary-dark-10 rounded-full px-6 py-2 mb-6"
          >
            <Megaphone className="w-5 h-5 text-primary-dark" />
            <span className="text-body-sm weight-semibold text-muted">Что мы предлагаем</span>
          </motion.div>

          <h2 className="text-display-2 text-primary-dark mb-6 leading-tight-kw weight-bold">
            Наши <span className="text-primary">услуги</span>
          </h2>
          <p className="text-body-xl text-muted max-w-3xl mx-auto leading-relaxed-kw">
            Мы предлагаем полный спектр рекламных услуг: от разработки дизайна до производства и монтажа. 
            Собственное производство позволяет нам гарантировать высокое качество и сжатые сроки.
          </p>
        </motion.div>

        {/* Сетка услуг */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.a
              href={service.href}
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative block h-full"
            >
              {service.popular && (
                <div className="absolute -top-3 -right-3 z-10 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white animate-pulse">
                  ХИТ ПРОДАЖ
                </div>
              )}

              <div className="relative bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover border border-light hover:border-primary transition-all duration-300 h-full flex flex-col group-hover:bg-primary-bg/30">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary-05 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>

                <h3 className="text-title-lg font-bold text-primary-dark mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-body text-muted mb-6 leading-relaxed-kw flex-grow">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-body-sm text-primary-dark/80">
                        <div className="w-5 h-5 rounded-full bg-primary-10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-gradient-primary rounded-3xl p-10 md:p-16 text-white overflow-hidden shadow-primary-lg">
            {/* Декоративные круги */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left md:max-w-xl">
                <h3 className="text-display-3 font-bold mb-4 leading-tight">
                  Не нашли то, что искали?
                </h3>
                <p className="text-white/90 text-body-lg leading-relaxed">
                  Оставьте заявку на бесплатную консультацию. Мы подберем индивидуальное решение под ваш бюджет и задачи за 15 минут.
                </p>
              </div>

              <div className="flex flex-col gap-4 min-w-[280px]">
                <motion.a
                  href="/contacts"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-primary-dark px-8 py-4 rounded-xl font-bold text-body shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <span>Связаться с менеджером</span>
                </motion.a>

                <motion.a
                  href="/calculator"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl border border-white/30 hover:bg-white/20 transition-all font-semibold text-body text-center"
                >
                  Рассчитать стоимость
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}