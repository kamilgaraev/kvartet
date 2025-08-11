'use client'

import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { ArrowRight, Play, Star, Printer, Palette, Monitor, Sparkles, TrendingUp, Eye, Target, Layers, Zap, Shield, Users, Award, Phone, CheckCircle, ExternalLink, Image, Video } from 'lucide-react'

function AnimatedNumber({ from = 0, to, duration = 1.6, suffix = '' }: { from?: number; to: number; duration?: number; suffix?: string }) {
  const [value, setValue] = useState<number>(from)
  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate: latest => setValue(Math.floor(latest))
    })
    return () => controls.stop()
  }, [from, to, duration])
  return <span>{value}{suffix}</span>
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-bg overflow-hidden section-padding-y">
      {/* Современные геометрические фоновые элементы */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-r from-primary-10 to-primary-dark-10 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-32 left-20 w-80 h-80 rounded-full bg-gradient-to-l from-primary-light-20 to-primary-10 blur-2xl"
        />
        
        {/* Сетка - скрыта */}
        {/* <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(var(--color-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div> */}
      </div>

      <div className="relative container-adaptive w-full">
        <div className="grid lg:grid-cols-12 hero-gap items-center">
          {/* Левая часть - контент */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 hero-gap flex flex-col"
          >
            {/* Корпоративный бейдж */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary-bg text-primary-dark rounded-full px-6 py-3 border border-primary-light shadow-card self-start"
            >
              <Award className="w-5 h-5 text-primary" />
              <span className="text-body-sm weight-semibold">Рекламное агентство полного цикла</span>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </motion.div>

            {/* SEO-оптимизированный заголовок */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-gap flex flex-col"
            >
              <h1 className="text-display-2 text-primary-dark tracking-tight leading-tight-kw weight-bold">
                Профессиональная широкоформатная печать
                <br />
                и{' '}
                <span className="relative text-primary">
                  изготовление вывесок
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary-light rounded-full opacity-60"
                  />
                </span>
                <br />
                <span className="text-primary">в Уфе</span>
              </h1>
              
              <div className="hero-gap flex flex-col">
                <p className="text-body-xl text-muted leading-relaxed-kw max-w-3xl">
                  Комплексные решения для наружной рекламы, полиграфии и брендинга. 
                  Собственное производство, качественные материалы, профессиональный монтаж.
                </p>
                
                {/* Ключевые услуги */}
                <div className="inline-flex flex-wrap gap-3">
                  {[
                    'Широкоформатная печать',
                    'Изготовление вывесок', 
                    'Интерьерная реклама',
                    'Цифровая печать'
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-primary-bg text-primary-dark border border-primary-light rounded-full px-4 py-2 hover:border-primary hover:bg-primary-light transition-all duration-300"
                    >
                      <span className="text-body-sm weight-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Услуги агентства */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 card-gap"
            >
              {[
                { icon: Printer, text: 'Широкоформатная печать баннеров', gradient: 'from-primary to-primary-dark' },
                { icon: Monitor, text: 'Изготовление вывесок и табличек', gradient: 'from-primary-dark to-primary' },
                { icon: Palette, text: 'Интерьерное брендирование', gradient: 'from-primary to-primary-light' },
                { icon: Layers, text: 'Цифровая печать материалов', gradient: 'from-primary-dark to-primary-light' }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group flex items-center space-x-3 bg-card backdrop-blur-sm card-adaptive border border-light hover:border-hover hover:shadow-lg hover:shadow-primary transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} card-adaptive flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon className="icon-adaptive text-white" />
                  </div>
                  <span className="text-primary-dark text-body hover:text-primary transition-colors">
                    {service.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Корпоративные CTA кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-primary text-white px-8 py-4 rounded-xl shadow-primary hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span className="text-body-lg weight-semibold">Рассчитать стоимость</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-card border border-light hover:border-primary text-primary-dark hover:text-primary px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-card"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-body-lg weight-semibold">+7 (347) 123-45-67</span>
              </motion.button>
            </motion.div>

            {/* Корпоративные преимущества */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
              {[
                { icon: TrendingUp, text: 'Быстрое производство', desc: 'от 24 часов' },
                { icon: Target, text: 'Точная цветопередача', desc: '100% качество' },
                { icon: Shield, text: 'Гарантия качества', desc: 'до 3 лет' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="flex items-center space-x-3 bg-primary-bg border border-primary-light rounded-xl p-4"
                >
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-body-sm weight-semibold text-primary-dark">{feature.text}</div>
                    <div className="text-caption text-muted">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

                    {/* Правая часть - корпоративная панель достижений */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Основная корпоративная карточка */}
            <div className="relative bg-white/95 backdrop-blur-sm border border-light rounded-3xl p-8 lg:p-12 shadow-card-hover min-h-[600px] w-full max-w-lg">
              
              {/* Заголовок секции */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center space-x-2 bg-primary-bg text-primary-dark rounded-full px-4 py-2 border border-primary-light mb-4">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-caption weight-semibold">Наши достижения</span>
                </div>
                <h3 className="text-title-lg text-primary-dark weight-bold leading-snug-kw">
                  Результаты работы
                </h3>
              </motion.div>

              {/* Основная статистика в строгой сетке */}
              <div className="space-y-8">
                {/* Главная метрика */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center bg-primary-bg rounded-2xl p-6 border border-primary-light"
                >
                  <div className="text-display-2 text-primary weight-black leading-tight-kw mb-2">
                    <AnimatedNumber to={2500} suffix="+" />
                  </div>
                  <div className="text-body weight-semibold text-primary-dark">
                    выполненных проектов
                  </div>
                </motion.div>

                {/* Сетка дополнительных метрик */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="text-center bg-white rounded-xl p-4 border border-light shadow-card">
                    <div className="text-title-lg text-primary weight-bold mb-1">
                      <AnimatedNumber to={15} />
                    </div>
                    <div className="text-caption text-muted weight-medium">лет опыта</div>
                  </div>
                  
                  <div className="text-center bg-success rounded-xl p-4 text-white shadow-card">
                    <div className="text-title-lg weight-bold mb-1">100%</div>
                    <div className="text-caption opacity-90 weight-medium">качество</div>
                  </div>
                  
                  <div className="text-center bg-white rounded-xl p-4 border border-light shadow-card">
                    <div className="text-title-lg text-primary weight-bold mb-1">
                      <AnimatedNumber to={500} suffix="+" />
                    </div>
                    <div className="text-caption text-muted weight-medium">клиентов</div>
                  </div>
                </motion.div>

                {/* Корпоративные показатели */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-4"
                >
                  {[
                    { label: 'Срок выполнения', value: 'от 24 часов', icon: Zap },
                    { label: 'Гарантия качества', value: 'до 3 лет', icon: Shield },
                    { label: 'Довольных клиентов', value: '98%', icon: Users }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="flex items-center justify-between bg-primary-bg rounded-xl p-4 border border-primary-light"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-body-sm text-primary-dark weight-medium">{item.label}</span>
                      </div>
                      <span className="text-body-sm text-primary weight-semibold">{item.value}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Корпоративная CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white rounded-xl py-4 px-6 text-body weight-semibold hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-2 shadow-primary"
                  >
                    <span>Смотреть портфолио</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Декоративный элемент в углу */}
              <div className="absolute top-6 right-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center opacity-20"
                >
                  <Target className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Тонкая линия акцента */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-primary rounded-full"></div>
            </div>

            {/* Минималистичные плавающие элементы для lg+ экранов */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
              className="hidden xl:block absolute -top-8 -right-8 bg-white border border-light rounded-2xl px-6 py-4 shadow-card"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-body-sm text-primary-dark weight-semibold">Сертифицированы</div>
                  <div className="text-caption text-muted">ISO 9001:2015</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
              className="hidden xl:block absolute -bottom-8 -left-8 bg-white border border-light rounded-2xl px-6 py-4 shadow-card"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-body-sm text-primary-dark weight-semibold">Лучшие в регионе</div>
                  <div className="text-caption text-muted">2023 год</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Плавный переход */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}