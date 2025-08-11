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
  Monitor
} from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

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
          icon: '🏢', 
          description: 'Вывески, световые короба, баннеры',
          price: 'от 5000₽',
          popular: true
        },
        { 
          name: 'Полиграфия', 
          href: '/services/printing', 
          icon: '📄', 
          description: 'Визитки, листовки, каталоги',
          price: 'от 500₽',
          popular: false
        },
        { 
          name: 'Интерьерная реклама', 
          href: '/services/interior', 
          icon: '🏪', 
          description: 'Оформление офисов и магазинов',
          price: 'от 3000₽',
          popular: false
        },
        { 
          name: 'Брендинг', 
          href: '/services/branding', 
          icon: '🎨', 
          description: 'Логотипы и фирменный стиль',
          price: 'от 15000₽',
          popular: false
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
                  <span className="text-white weight-bold text-title">К</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full"
                />
              </motion.div>
              <div>
                <h1 className="nav-logo-title text-primary-dark group-hover:text-primary transition-colors">
                  КВАРТЕТ
                </h1>
                <p className="nav-logo-subtitle text-primary-dark opacity-70">РЕКЛАМНОЕ АГЕНТСТВО</p>
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
                          : 'text-primary-dark hover:text-primary hover:bg-primary-bg'
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

                  {/* Классический Dropdown */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
                      >
                        {/* Заголовок */}
                        <div className="bg-primary-bg card-adaptive border-b border-primary">
                          <h3 className="nav-logo-title text-primary-dark">Наши услуги</h3>
                          <p className="nav-logo-subtitle text-primary-dark opacity-70">Полный цикл рекламного производства</p>
                        </div>
                        
                        {/* Услуги */}
                        <div className="card-adaptive">
                          {item.dropdownItems?.map((dropItem, index) => (
                            <motion.div
                              key={dropItem.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.01, x: 4 }}
                            >
                              <Link
                                href={dropItem.href}
                                className="flex items-center hero-gap nav-item hover:bg-primary-bg transition-all group/item"
                              >
                                <div className="text-title-lg flex-shrink-0">{dropItem.icon}</div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="nav-text text-primary-dark group-hover/item:text-primary transition-colors">
                                      {dropItem.name}
                                    </span>
                                    {dropItem.popular && (
                                      <span className="bg-primary text-white text-caption weight-bold px-2 py-1 rounded-full">
                                        ХИТ
                                      </span>
                                    )}
                                  </div>
                                  <p className="nav-logo-subtitle text-primary-dark opacity-70 group-hover/item:text-primary-dark transition-colors mb-1">
                                    {dropItem.description}
                                  </p>
                                  <div className="nav-logo-subtitle weight-bold text-primary">
                                    {dropItem.price}
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-primary-dark/50 group-hover/item:text-primary opacity-0 group-hover/item:opacity-100 transition-all" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Футер с контактами */}
                        <div className="bg-gradient-primary card-adaptive">
                          <div className="text-white text-center">
                            <div className="nav-text weight-bold mb-1">
                              БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ
                            </div>
                            <div className="nav-logo-subtitle opacity-90">+7 (347) 123-45-67</div>
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
                className="flex items-center space-x-2 nav-text text-primary-dark bg-primary-bg nav-item border border-primary"
              >
                <Phone className="icon-adaptive text-primary" />
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
              className="lg:hidden p-3 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
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
                <div className="py-6 border-t border-gray-200/50">
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
                    className="mt-6 pt-6 border-t border-gray-200/50 space-y-4"
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