'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Megaphone, 
  Printer, 
  Home, 
  Palette, 
  ArrowRight,
  Check,
  Star,
  Sparkles,
  Zap
} from 'lucide-react'

const services = [
  {
    icon: Megaphone,
    title: 'Наружная реклама',
    description: 'Световые короба, баннеры, вывески. Полный цикл производства и монтажа.',
    features: ['Световые короба', 'Баннеры', 'Билборды', 'Вывески'],
    color: 'from-primary to-primary-dark',
    bgColor: 'bg-primary-05',
    href: '/services/outdoor',
    popular: true
  },
  {
    icon: Printer,
    title: 'Полиграфия',
    description: 'Визитки, листовки, каталоги, брошюры. Качественная печать на любых материалах.',
    features: ['Визитки', 'Листовки', 'Каталоги', 'Календари'],
    color: 'from-primary-dark to-primary',
    bgColor: 'bg-primary-dark-05',
    href: '/services/printing'
  },
  {
    icon: Home,
    title: 'Интерьерная реклама',
    description: 'Оформление торговых точек, офисов, выставочных стендов и презентационных материалов.',
    features: ['Стенды', 'Таблички', 'Указатели', 'POS-материалы'],
    color: 'from-primary to-primary-light',
    bgColor: 'bg-primary-light-05',
    href: '/services/interior'
  },
  {
    icon: Palette,
    title: 'Брендинг',
    description: 'Разработка логотипов, фирменного стиля, создание узнаваемого образа компании.',
    features: ['Логотип', 'Фирмстиль', 'Гайдлайн', 'Айдентика'],
    color: 'from-primary-light to-primary',
    bgColor: 'bg-primary-light-05',
    href: '/services/branding'
  }
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="section-padding-y bg-gradient-bg relative overflow-hidden" ref={ref}>
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary-05 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-dark-05 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container-adaptive">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-10 to-primary-dark-10 rounded-full px-6 py-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-caption weight-semibold text-gray-700">Наши услуги</span>
          </motion.div>

          <h2 className="text-display-2 text-gray-900 mb-6 leading-tight-kw" style={{ textShadow: '0 2px 8px var(--color-bg-card-hover)' }}>
            Полный спектр{' '}
            <span className="relative inline-block">
              <span className="text-gray-900 weight-extrabold">рекламных услуг</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary opacity-30 rounded-full"
              />
            </span>
          </h2>
          <p className="text-body-xl text-gray-800 max-w-3xl mx-auto leading-relaxed-kw weight-medium" style={{ textShadow: '0 1px 3px var(--color-bg-card)' }}>
            От концепции до реализации — создаем эффективную рекламу, 
            которая работает на результат вашего бизнеса
          </p>
        </motion.div>

        {/* Сетка услуг */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Популярная услуга бейдж */}
              {service.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                  className="absolute -top-3 -right-3 z-10 bg-gradient-primary text-white text-caption weight-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1"
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>Популярно</span>
                </motion.div>
              )}

              <div className={`relative bg-card backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-light hover:shadow-2xl transition-all duration-500 overflow-hidden h-full ${service.bgColor}`}>
                {/* Декоративный элемент */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${service.color} transform rotate-45 translate-x-8 -translate-y-8`}></div>
                </div>

                {/* Иконка */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} p-5 mb-6 shadow-lg`}
                >
                  <service.icon className="w-full h-full text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-30`}
                  />
                </motion.div>

                {/* Контент */}
                <div className="relative z-10 space-y-6">
                  <div>
                    <h3 className="text-title text-primary-dark mb-3 hover:text-primary transition-colors weight-bold">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted text-body-sm leading-relaxed-kw">
                      {service.description}
                    </p>
                  </div>

                  {/* Особенности */}
                  <div className="space-y-3">
                    {service.features.map((feature) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                        className="flex items-center space-x-3 text-body-sm text-muted"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary-20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Кнопка */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-gradient-to-r from-card to-white text-muted py-4 rounded-2xl border border-light hover:border-hover hover:text-primary hover:shadow-lg transition-all duration-300 weight-semibold flex items-center justify-center space-x-2 group"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="relative bg-gradient-primary rounded-3xl p-12 text-white overflow-hidden">
            {/* Декоративные элементы */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-white/20 rounded-full"></div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full"
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex justify-center mb-6"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <h3 className="text-display-3 weight-bold mb-6">
                Не знаете, какую услугу выбрать?
              </h3>
              <p className="text-body-xl text-white/90 mb-8 leading-relaxed-kw">
                Получите бесплатную консультацию наших экспертов и найдите 
                идеальное решение для роста вашего бизнеса
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-8 py-4 rounded-2xl hover:bg-card transition-colors weight-semibold shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Получить консультацию</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-colors weight-semibold"
                >
                  Калькулятор стоимости
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}