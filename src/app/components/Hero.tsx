'use client'

import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Star, Printer, Palette, Monitor, Sparkles, TrendingUp, Eye, Target, Layers, Zap, Shield, Users, Award, Phone, CheckCircle, ExternalLink, Image, Video } from 'lucide-react'
import HeroVisual from './HeroVisual'

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
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {[
                { icon: Printer, text: 'Широкоформатная печать баннеров', gradient: 'bg-gradient-primary' },
                { icon: Monitor, text: 'Изготовление вывесок и табличек', gradient: 'bg-gradient-primary-reverse' },
                { icon: Palette, text: 'Интерьерное брендирование', gradient: 'bg-gradient-light' },
                { icon: Layers, text: 'Цифровая печать материалов', gradient: 'bg-gradient-accent' }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group flex items-center space-x-4 bg-card backdrop-blur-sm p-5 rounded-xl border border-light hover:border-hover hover:shadow-lg hover:shadow-primary transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${service.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-primary-dark text-body-lg hover:text-primary transition-colors leading-snug-kw">
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

                    {/* Правая часть - интерактивный 3D элемент */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative flex items-center justify-center lg:h-[600px]"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Плавный переход */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}