'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Phone,
  Mail,
  MapPin,
  Zap,
  Star,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const quickLinks = [
    { name: 'Главная', href: '/', icon: Home },
    { name: 'Услуги', href: '/services', icon: Search },
    { name: 'Портфолио', href: '/portfolio', icon: ExternalLink },
    { name: 'Контакты', href: '/contacts', icon: Phone }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-bg via-white to-primary-05 relative overflow-hidden">
      {/* Интерактивные декоративные элементы */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.3,
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: mousePosition.x * -0.3,
            y: mousePosition.y * 0.4,
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary-dark/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] border border-primary-20 rounded-full"
        />
        
        {/* Плавающие элементы */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.7
            }}
            className={`absolute w-4 h-4 rounded-full opacity-20 ${
               i % 4 === 0 ? 'bg-primary' : 
               i % 4 === 1 ? 'bg-primary-dark' :
               i % 4 === 2 ? 'bg-warning' : 'bg-success'
             }`}
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Главный 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <div className="relative">
              <motion.h1 
                className="text-[12rem] md:text-[16rem] font-black text-transparent bg-gradient-to-r from-primary via-primary-dark to-warning bg-clip-text leading-none"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ 
                  backgroundSize: "200% 200%",
                  textShadow: '0 0 40px var(--color-primary-30)'
                }}
              >
                404
              </motion.h1>
              
              {/* Декоративные звезды */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`
                  }}
                >
                  <Star className="w-6 h-6 text-warning-light fill-current" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Заголовок и описание */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-6">
              Страница потерялась в пространстве
            </h2>
            <p className="text-xl text-muted mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              Не волнуйтесь! Даже самые лучшие дизайнеры иногда теряют страницы. 
              Давайте найдем то, что вы искали.
            </p>
            
            {/* Анимированная иконка */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl mb-8"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Быстрые ссылки */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={link.href}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-light hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl block"
                >
                  <link.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-semibold text-muted group-hover:text-primary transition-colors">
                    {link.name}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Основные действия */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/"
                className="group bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>На главную</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
              className="group bg-white/80 backdrop-blur-sm text-muted px-8 py-4 rounded-2xl border border-light hover:border-primary hover:text-primary transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Назад</span>
            </motion.button>
          </motion.div>

          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold text-primary-dark mb-6">
              Нужна помощь? Свяжитесь с нами!
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Phone, text: '+7 (347) 123-45-67', color: 'text-primary-dark' },
                { icon: Mail, text: 'info@kvartett-ufa.ru', color: 'text-primary' },
                { icon: MapPin, text: 'г. Уфа, ул. Ленская, 128', color: 'text-primary-light' }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center mx-auto mb-3 group-hover:shadow-xl transition-all ${contact.color}`}>
                    <contact.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm text-muted font-medium">
                    {contact.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Подпись */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted">
              © 2024 Квартет. Даже в космосе мы создаем лучшую рекламу! 🚀
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}