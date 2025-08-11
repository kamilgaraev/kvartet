'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp, 
  Send,
  Star,
  Award,
  Users,
  Zap,
  ChevronRight,
  Heart
} from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const footerSections = [
    {
      title: 'Услуги',
      links: [
        { name: 'Наружная реклама', href: '/services/outdoor', icon: '🏢' },
        { name: 'Полиграфия', href: '/services/printing', icon: '📰' },
        { name: 'Интерьерная реклама', href: '/services/interior', icon: '🏪' },
        { name: 'Брендинг', href: '/services/branding', icon: '🎨' },
        { name: 'Калькулятор стоимости', href: '/calculator', icon: '🧮' }
      ]
    },
    {
      title: 'Компания',
      links: [
        { name: 'О нас', href: '/about', icon: '👥' },
        { name: 'Портфолио', href: '/portfolio', icon: '💼' },
        { name: 'Блог', href: '/blog', icon: '📝' },
        { name: 'Карьера', href: '/career', icon: '🚀' },
        { name: 'Контакты', href: '/contacts', icon: '📞' }
      ]
    },
    {
      title: 'Поддержка',
      links: [
        { name: 'Помощь', href: '/help', icon: '🆘' },
        { name: 'FAQ', href: '/faq', icon: '❓' },
        { name: 'Политика конфиденциальности', href: '/privacy', icon: '🔒' },
        { name: 'Условия использования', href: '/terms', icon: '📄' },
        { name: 'Гарантии', href: '/warranty', icon: '✅' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'ВКонтакте', href: '#', color: 'bg-info hover:bg-info-dark', icon: 'В' },
    { name: 'Telegram', href: '#', color: 'bg-info hover:bg-info-dark', icon: 'T' },
    { name: 'WhatsApp', href: '#', color: 'bg-success hover:bg-success-dark', icon: 'W' },
    { name: 'Instagram', href: '#', color: 'bg-gradient-to-r from-primary-dark to-primary hover:opacity-80', icon: 'I' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-primary-dark via-primary-dark to-primary-dark text-white overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary-05 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-dark-05 rounded-full blur-3xl"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] border border-gray-700/30 rounded-full"
        />
      </div>

      {/* Верхняя секция с CTA */}
      <div className="relative border-b border-gray-700/50">
        <div className="container-adaptive section-padding-y">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-display-3 weight-bold mb-6 leading-tight-kw">
                Готовы начать свой{' '}
                <span className="gradient-kvartett-text">успешный проект?</span>
              </h2>
              <p className="text-body-xl text-gray-300 mb-8 leading-relaxed-kw">
                Получите бесплатную консультацию и персональное предложение уже сегодня
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-primary text-white px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>Заказать звонок</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 weight-semibold"
                >
                  Рассчитать стоимость
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-title weight-bold mb-6 flex items-center space-x-2">
                <Mail className="w-6 h-6 text-primary" />
                <span>Подписаться на новости</span>
              </h3>
              <p className="text-body text-gray-300 mb-6">
                Получайте полезные материалы о рекламе и специальные предложения
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-primary text-white py-3 rounded-xl weight-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  {isSubscribed ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-white rounded-full flex items-center justify-center"
                      >
                        <span className="text-primary-dark text-caption">✓</span>
                      </motion.div>
                      <span>Подписка оформлена!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Подписаться</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative container-adaptive section-padding-y">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* О компании */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-12 h-12 rounded-xl gradient-kvartett flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                >
                  <span className="text-white weight-bold text-title">К</span>
                </motion.div>
                <div>
                  <h1 className="text-title-lg weight-bold group-hover:text-primary transition-colors">
                    КВАРТЕТ
                  </h1>
                  <p className="text-caption text-gray-400 weight-medium">РЕКЛАМНОЕ АГЕНТСТВО</p>
                </div>
              </Link>
              
              <p className="text-body text-gray-300 leading-relaxed-kw mb-6">
                Производственно-рекламная группа "Квартет" — ваш надежный партнер 
                в мире рекламы. Полный цикл услуг от идеи до воплощения.
              </p>

              {/* Достижения */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Users, number: '500+', label: 'Клиентов' },
                  { icon: Award, number: '15+', label: 'Лет опыта' },
                  { icon: Star, number: '4.9', label: 'Рейтинг' }
                ].map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <achievement.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-title weight-bold text-white">{achievement.number}</div>
                    <div className="text-caption text-gray-400">{achievement.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Социальные сети */}
            <div>
              <h4 className="text-title weight-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white weight-bold transition-all duration-300 shadow-lg hover:shadow-xl`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Навигационные секции */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-title weight-bold text-white">{section.title}</h3>
              <nav className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Link
                      href={link.href}
                        className="group flex items-center space-x-3 text-gray-300 hover:text-primary transition-all duration-300 text-body-sm py-2"
                    >
                      <span className="text-title">{link.icon}</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          ))}
        </div>

        {/* Контактная информация */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700/50"
        >
          <h3 className="text-title weight-bold mb-6">Контакты</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: 'Адрес',
                content: 'г. Уфа, ул. Ленская, 128',
                color: 'text-primary'
              },
              {
                icon: Phone,
                title: 'Телефоны',
                content: '+7 (347) 123-45-67\n+7 (347) 123-45-68',
                color: 'text-primary-dark'
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'info@kvartett-ufa.ru\nsales@kvartett-ufa.ru',
                color: 'text-primary-light'
              },
              {
                icon: Clock,
                title: 'Время работы',
                content: 'Пн-Пт: 09:00 - 18:00\nСб: 10:00 - 16:00',
                color: 'text-success'
              }
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <contact.icon className={`w-5 h-5 ${contact.color}`} />
                  <h4 className="text-title-sm weight-semibold text-white">{contact.title}</h4>
                </div>
                <p className="text-body-sm text-gray-300 leading-relaxed whitespace-pre-line">
                  {contact.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Нижняя секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-700/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-body-sm text-gray-400">
              <span>© 2024 Квартет. Все права защищены.</span>
              <span className="flex items-center space-x-1">
                <span>Сделано с</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span>в Уфе</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-body-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Кнопка "Наверх" */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-primary text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-40 hover:shadow-xl hover:shadow-primary"
        title="Наверх"
      >
        <ArrowUp className="w-6 h-6" />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-primary rounded-full"
        />
      </motion.button>
    </footer>
  )
}