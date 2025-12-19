'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Phone, 
  PhoneCall,
  MessageCircle,
  ChevronDown,
  FileText,
  ArrowRight,
  Star,
  Truck,
  Shield,
  Clock,
  Users,
  Award,
  Zap,
  Printer,
  Monitor,
  Layers,
  Palette
} from 'lucide-react'
import LogoK from './LogoK'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isOverDark, setIsOverDark] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Проверяем, находится ли хедер над темными секциями (только футер и секции с темным фоном)
      const footer = document.querySelector('footer')
      const darkSections = document.querySelectorAll('section.bg-gradient-primary, section.bg-primary, section.bg-primary-dark, footer')
      
      const headerHeight = 80 // Примерная высота хедера
      const scrollPosition = window.scrollY
      
      let overDark = false
      
      // Проверяем только футер
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        // Хедер над футером, если футер начинается в зоне видимости хедера
        if (footerRect.top < headerHeight && footerRect.bottom > 0) {
          overDark = true
        }
      }
      
      // Проверяем другие темные секции (только полноэкранные секции с темным фоном)
      darkSections.forEach(section => {
        if (section.tagName.toLowerCase() === 'section') {
          const rect = section.getBoundingClientRect()
          const sectionHeight = rect.height
          // Только если секция достаточно большая (больше 200px) и хедер в её области
          if (sectionHeight > 200 && rect.top < headerHeight && rect.bottom > headerHeight) {
            overDark = true
          }
        }
      })
      
      setIsOverDark(overDark)
    }

    handleScroll() // Проверка при монтировании
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { 
      name: 'Главная', 
      href: '/',
      isActive: pathname === '/'
    },
    { 
      name: 'Услуги', 
      href: '/services',
      isActive: pathname.startsWith('/services'),
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Наружная реклама', 
          href: '/services/outdoor', 
          icon: Monitor, 
          description: 'Вывески, световые короба, баннеры',
          price: 'от 5000₽',
          popular: true,
          color: 'text-blue-500',
          bg: 'bg-blue-50'
        },
        { 
          name: 'Полиграфия', 
          href: '/services/printing', 
          icon: Printer, 
          description: 'Визитки, листовки, каталоги',
          price: 'от 500₽',
          popular: false,
          color: 'text-purple-500',
          bg: 'bg-purple-50'
        },
        { 
          name: 'Интерьерная реклама', 
          href: '/services/interior', 
          icon: Layers, 
          description: 'Оформление офисов и магазинов',
          price: 'от 3000₽',
          popular: false,
          color: 'text-orange-500',
          bg: 'bg-orange-50'
        },
        { 
          name: 'Брендинг', 
          href: '/services/branding', 
          icon: Palette, 
          description: 'Логотипы и фирменный стиль',
          price: 'от 15000₽',
          popular: false,
          color: 'text-pink-500',
          bg: 'bg-pink-50'
        },
      ]
    },
    { 
      name: 'Портфолио', 
      href: '/portfolio',
      isActive: pathname === '/portfolio'
    },
    { 
      name: 'О нас', 
      href: '/about',
      isActive: pathname === '/about'
    },
    { 
      name: 'Блог', 
      href: '/blog',
      isActive: pathname === '/blog'
    },
    { 
      name: 'Контакты', 
      href: '/contacts',
      isActive: pathname === '/contacts'
    },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-card-hover backdrop-blur-lg shadow-primary' 
            : 'bg-card backdrop-blur-md'
        }`}
      >
        <div className="container-adaptive">
          <div className="flex justify-between items-center py-2">
            {/* Логотип */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary group-hover:shadow-xl hover:shadow-primary transition-all duration-300">
                  <LogoK className="w-7 h-7 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full"
                />
              </motion.div>
              <div>
                <h1 className={`nav-logo-title ${isOverDark ? 'text-white' : 'text-primary-dark'} group-hover:text-primary transition-colors`}>
                  КВАРТЕТ
                </h1>
                <p className={`nav-logo-subtitle ${isOverDark ? 'text-white' : 'text-primary-dark'} opacity-70`}>РЕКЛАМНОЕ АГЕНТСТВО</p>
              </div>
            </Link>

            {/* Навигация для десктопа */}
            <nav className="hidden lg:flex items-center space-x-1" style={{whiteSpace: 'nowrap'}}>
              {navigation.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative nav-item transition-all duration-300 flex items-center space-x-1 group ${
                        item.isActive
                          ? 'text-white bg-primary shadow-lg shadow-primary'
                          : `${isOverDark ? 'text-white hover:text-primary-light' : 'text-primary-dark hover:text-primary'} hover:bg-primary-bg`
                      }`}
                    >
                      <span className="relative z-10 text-body">{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      )}
                      
                      {item.isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary rounded-xl"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.div>

                  {/* Мега-меню Dropdown */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-4 w-[42rem] bg-white/98 backdrop-blur-xl rounded-2xl shadow-card-hover border border-light overflow-hidden z-50"
                      >
                        <div className="flex">
                          {/* Левая колонка - Основное */}
                          <div className="flex-1 p-6">
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">Наши услуги</h3>
                                <p className="text-sm text-muted-foreground">Полный цикл производства</p>
                              </div>
                              <Link 
                                href="/services"
                                className="text-xs font-semibold text-primary hover:underline flex items-center"
                              >
                                Все услуги <ArrowRight className="w-3 h-3 ml-1" />
                              </Link>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              {item.dropdownItems?.map((dropItem, index) => (
                                <Link
                                  key={dropItem.name}
                                  href={dropItem.href}
                                  className="group block p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className={`w-10 h-10 rounded-lg ${dropItem.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                      {/* @ts-ignore */}
                                      <dropItem.icon className={`w-5 h-5 ${dropItem.color}`} />
                                    </div>
                                    <div>
                                      <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm">
                                          {dropItem.name}
                                        </span>
                                        {dropItem.popular && (
                                          <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                            HIT
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                        {dropItem.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Правая колонка - Акцент */}
                          <div className="w-48 bg-gray-50 p-6 flex flex-col justify-between border-l border-gray-100">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2 text-sm">Акции</h4>
                              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                <span className="text-xs font-bold text-green-600 mb-1 block">-15%</span>
                                <p className="text-xs text-gray-600 leading-snug">
                                  На первый заказ наружной рекламы
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-6">
                              <div className="text-xs text-gray-500 mb-2">Нужна консультация?</div>
                              <Link 
                                href="/contacts"
                                className="w-full bg-primary text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors"
                              >
                                Связаться
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Контакты и CTA */}
            <div className="hidden xl:flex items-center space-x-4">
              {/* Телефон */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-2 nav-text ${isOverDark ? 'text-white bg-white/10 border-white/30' : 'text-primary-dark bg-primary-bg border-primary'} nav-item border transition-colors`}
              >
                <Phone className={`icon-adaptive ${isOverDark ? 'text-white' : 'text-primary'} transition-colors`} />
                <span>+7 (347) 123-45-67</span>
              </motion.div>

              {/* Действия */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-success hover:bg-success rounded-xl transition-colors group"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gradient-primary text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-primary transition-all duration-300 weight-bold group"
                >
                  <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>ЗАКАЗАТЬ</span>
                  <motion.div
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Мобильное меню */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`lg:hidden p-3 rounded-xl ${isOverDark ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-primary/20 hover:bg-primary/30 text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Мобильная навигация */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-6 border-t border-light">
                  <nav className="space-y-2">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={`block nav-item transition-all ${
                            item.isActive
                              ? 'text-white bg-primary'
                              : 'text-primary-dark hover:text-primary hover:bg-primary-bg'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Мобильные контакты */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 pt-6 border-t border-light space-y-4"
                  >
                    <div className="flex items-center space-x-3 nav-logo-subtitle text-primary-dark/70 px-4">
                      <Phone className="icon-adaptive text-primary" />
                      <span className="nav-text">+7 (347) 123-45-67</span>
                    </div>
                    
                    <div className="flex space-x-3 px-4">
                      <button className="flex-1 bg-success text-white btn-adaptive">
                        WhatsApp
                      </button>
                      <button className="flex-1 bg-gradient-primary text-white btn-adaptive">
                        ЗАКАЗАТЬ
                      </button>
                    </div>

                    {/* Мобильные преимущества */}
                    <div className="mx-4 bg-primary-bg p-4 rounded-xl border border-primary/30">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <Printer className="w-6 h-6 text-primary mx-auto mb-1" />
                          <div className="text-caption weight-bold text-primary-dark">Печать</div>
                        </div>
                        <div>
                          <Monitor className="w-6 h-6 text-primary mx-auto mb-1" />
                          <div className="text-caption weight-bold text-primary-dark">Вывески</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Отступ для фиксированного хедера */}
      <div className="h-20"></div>
    </>
  )
}