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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-bg overflow-hidden pt-24 pb-12">
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

      <div className="relative hero-container mx-auto w-full">
        <div className="grid lg:grid-cols-12 hero-gap items-center">
          {/* Левая часть - контент */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 hero-gap flex flex-col"
          >
            {/* Современный бейдж */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-primary text-white rounded-full btn-adaptive shadow-lg shadow-primary self-start"
            >
              <Sparkles className="icon-adaptive" />
              <span className="hero-subtitle">Рекламное агентство полного цикла</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </motion.div>

            {/* SEO-оптимизированный заголовок */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-gap flex flex-col"
            >
              <h1 className="hero-title text-primary-dark tracking-tight">
                Широкоформатная печать
                <br />
                и{' '}
                <span className="text-primary relative">
                  изготовление вывесок
                  {/* <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-1 lg:h-2 bg-gradient-primary rounded-full"
                  /> */}
                </span>
                <br />
                <span className="text-primary">в Уфе</span>
              </h1>
              
              <div className="hero-gap flex flex-col">
                <p className="hero-text text-muted leading-relaxed max-w-3xl">
                  Профессиональная широкоформатная печать баннеров, изготовление вывесок, 
                  интерьерная печать и полное брендирование для вашего бизнеса.
                </p>
                
                                {/* SEO ключевые фразы */}
                <div className="flex flex-wrap card-gap">
                  {[
                    'Печать баннеров',
                    'Изготовление вывесок', 
                    'Интерьерная реклама',
                    'Цифровая печать',
                    'Брендирование'
                  ].map((keyword, index) => (
                    <motion.span
                      key={keyword}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-primary-light-30 text-primary-dark btn-adaptive hero-subtitle"
                    >
                      {keyword}
                    </motion.span>
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
                  <span className="text-primary-dark hero-text hover:text-primary transition-colors">
                    {service.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Современные CTA кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row card-gap"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-primary text-white btn-adaptive shadow-xl shadow-primary hover:shadow-2xl hover:shadow-primary-lg transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 hero-subtitle">Рассчитать стоимость</span>
                <motion.div
                  className="relative z-10 inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="icon-adaptive" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-card backdrop-blur-sm text-primary-dark btn-adaptive border-2 border-primary-light hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Phone className="icon-adaptive group-hover:scale-110 transition-transform" />
                <span className="hero-subtitle">+7 (347) 123-45-67</span>
              </motion.button>
            </motion.div>

            {/* Гарантии и особенности */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-2 lg:grid-cols-3 card-gap"
            >
              {[
                { icon: TrendingUp, text: 'Быстрое производство' },
                { icon: Target, text: 'Точная цветопередача' },
                { icon: Eye, text: 'Индивидуальный дизайн' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="flex items-center space-x-2 hero-text text-muted"
                >
                  <feature.icon className="icon-adaptive text-primary" />
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

                    {/* Правая часть - интерактивное портфолио */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            {/* Интерактивное портфолио */}
            <div className="relative bg-gradient-to-br from-primary-bg to-primary-light-30 card-adaptive min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] overflow-hidden border border-primary-light-40 shadow-2xl shadow-primary">
              {/* Динамический фон */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-05 via-transparent to-primary-dark-05"></div>
              
              {/* Декоративная сетка */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)
                `,
                backgroundSize: '30px 30px'
              }}></div>
              
              {/* Floating элементы */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-primary-20 to-primary-dark-20 rounded-2xl rotate-12"
              />
              
              <motion.div
                animate={{ 
                  rotate: [0, -180, 0],
                  y: [0, -20, 0]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute bottom-20 left-8 w-12 h-12 bg-gradient-to-br from-primary-light to-primary-30 rounded-xl"
              />
              
              {/* Главный контент портфолио */}
              <div className="relative h-full flex flex-col justify-center items-center text-center p-8">
                {/* Центральная статистика */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="text-6xl lg:text-8xl font-black text-primary mb-4">
                    <AnimatedNumber to={2500} suffix="+" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-primary-dark mb-2">
                    Успешных проектов
                  </div>
                  <div className="text-lg text-muted">
                    по всей Республике Башкортостан
                  </div>
                </motion.div>

                {/* Ключевые достижения */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="grid grid-cols-2 gap-6 w-full max-w-md"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1"><AnimatedNumber to={15} /></div>
                    <div className="text-sm text-muted">лет опыта</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">100%</div>
                    <div className="text-sm text-muted">качество</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-sm text-muted">поддержка</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1"><AnimatedNumber to={500} suffix="+" /></div>
                    <div className="text-sm text-muted">клиентов</div>
                  </div>
                </motion.div>

                {/* Кнопка портфолио */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-3 bg-gradient-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Смотреть портфолио</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
            
            {/* Плавающие достижения */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-4 bg-white card-adaptive shadow-xl border border-primary/40 z-10 rotate-2"
            >
              <div className="text-center">
                <div className="hero-title text-primary mb-1"><AnimatedNumber to={2500} suffix="+" /></div>
                <div className="hero-text text-primary-dark font-semibold">Проектов</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-4 right-4 bg-gradient-primary text-white card-adaptive shadow-xl z-10 -rotate-3"
            >
              <div className="text-center">
                <div className="hero-title mb-1"><AnimatedNumber to={15} /></div>
                <div className="hero-text font-semibold opacity-90">Лет опыта</div>
              </div>
            </motion.div>

            {/* Индикатор качества */}
            <motion.div
              animate={{ 
                x: [0, 10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 right-2 bg-primary card-adaptive shadow-lg z-10"
            >
              <Star className="icon-adaptive text-white fill-current" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Плавный переход */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}