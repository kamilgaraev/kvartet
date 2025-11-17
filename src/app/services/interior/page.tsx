'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { 
  Home, 
  CheckCircle, 
  Star, 
  Clock,
  Award,
  ArrowRight,
  Eye,
  Zap,
  Users,
  MapPin,
  Phone,
  Calculator,
  Lightbulb,
  Wrench,
  Truck,
  Shield,
  Navigation,
  Grid,
  Layers,
  Store
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FloatingAction from '../../components/FloatingAction'

const services = [
  {
    name: 'Навигационные таблички',
    description: 'Указатели, направляющие и информационные таблички',
    price: 'от 800 ₽',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
  },
  {
    name: 'Информационные стенды', 
    description: 'Стенды для размещения информации и рекламы',
    price: 'от 12 000 ₽',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  },
  {
    name: 'Световые панели',
    description: 'Подсвеченные информационные панели',
    price: 'от 18 000 ₽',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop'
  },
  {
    name: 'Интерьерные вывески',
    description: 'Вывески для офисов, магазинов, ресторанов',
    price: 'от 15 000 ₽',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=300&fit=crop'
  },
  {
    name: 'POS-материалы',
    description: 'Рекламные материалы в местах продаж',
    price: 'от 3 000 ₽',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  },
  {
    name: 'Оформление витрин',
    description: 'Декорирование витрин магазинов и салонов',
    price: 'от 25 000 ₽',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
  }
]

const process = [
  {
    step: '01',
    title: 'Выезд на объект',
    description: 'Замеры помещения и анализ пространства',
    icon: Users,
    duration: '1 день'
  },
  {
    step: '02', 
    title: 'Дизайн-проект',
    description: 'Создаем 3D-визуализацию интерьерной рекламы',
    icon: Lightbulb,
    duration: '2-3 дня'
  },
  {
    step: '03',
    title: 'Изготовление',
    description: 'Производим элементы согласно проекту',
    icon: Wrench,
    duration: '5-7 дней'
  },
  {
    step: '04',
    title: 'Монтаж',
    description: 'Устанавливаем и настраиваем систему',
    icon: Truck,
    duration: '1-2 дня'
  }
]

const advantages = [
  {
    icon: Grid,
    title: 'Дизайн-проект в подарок',
    description: 'Бесплатная 3D-визуализация проекта'
  },
  {
    icon: Clock,
    title: 'Быстрый монтаж',
    description: 'Установка без нарушения работы'
  },
  {
    icon: Shield,
    title: 'Экологичные материалы',
    description: 'Безопасные для помещений материалы'
  },
  {
    icon: Award,
    title: 'Гарантия 2 года',
    description: 'На все виды интерьерной рекламы'
  }
]

const materials = [
  {
    name: 'Акрил',
    description: 'Прозрачный и цветной акрил различной толщины',
    usage: 'Таблички, стенды, панели'
  },
  {
    name: 'Композитные панели',
    description: 'Алюминиевые композитные панели Dibond',
    usage: 'Вывески, указатели'
  },
  {
    name: 'ПВХ пластик',
    description: 'Листовой ПВХ для внутренних работ',
    usage: 'Навигация, информационные таблички'
  },
  {
    name: 'Пленки',
    description: 'Самоклеящиеся пленки разных типов',
    usage: 'Оклейка витрин, декор'
  }
]

const applications = [
  {
    title: 'Торговые центры',
    description: 'Навигация, указатели магазинов, информационные стенды',
    icon: Store,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop'
  },
  {
    title: 'Офисные центры',
    description: 'Таблички кабинетов, этажные планы, корпоративная навигация',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'
  },
  {
    title: 'Медицинские учреждения',
    description: 'Указатели кабинетов, информационные стенды, навигация',
    icon: Grid,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop'
  }
]

const portfolio = [
  {
    title: 'Клиника "Здоровье"',
    category: 'Навигация',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    result: 'Улучшение навигации'
  },
  {
    title: 'Торговый центр "Семья"',
    category: 'Указатели',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    result: '+40% посещаемости'
  },
  {
    title: 'Офис "ТехноСофт"',
    category: 'Корпоративный стиль',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    result: 'Современный образ'
  }
]

export default function InteriorPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-to-br from-primary-bg via-white to-primary-light-10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-dark/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-primary-dark/10 rounded-full px-4 py-2 mb-6"
              >
                <Home className="w-4 h-4 text-purple-500" />
                <span className="text-sm weight-semibold text-muted">Интерьерная реклама</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl weight-bold text-primary-dark mb-6"
              >
                Стильное{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">оформление</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-purple-600 opacity-30 rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted mb-8 leading-relaxed"
              >
                Комплексное оформление интерьеров: навигация, стенды, вывески. Создаем функциональное и стильное пространство для вашего бизнеса.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/calculator"
                  className="group bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Рассчитать проект</span>
                </Link>
                
                <a
                  href="tel:+73471234567"
                  className="group bg-white/80 backdrop-blur-sm text-muted px-8 py-4 rounded-2xl border border-light hover:border-primary hover:text-primary transition-all duration-300 weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  <span>+7 (347) 123-45-67</span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
              >
                {[
                  { label: 'Объектов', value: '200+' },
                  { label: 'Дней проект', value: '10' },
                  { label: 'Лет гарантии', value: '2' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl weight-bold text-purple-500">{stat.value}</div>
                    <div className="text-sm text-muted">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-primary-dark/20 rounded-3xl p-8 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                  alt="Интерьерная реклама"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Grid className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl weight-bold text-primary-dark mb-6">
              Виды интерьерной рекламы
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Комплексные решения для оформления внутренних пространств
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-10 to-primary-20 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full bg-white/90 backdrop-blur-sm text-primary-dark py-2 px-4 rounded-lg weight-medium flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Смотреть примеры</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl weight-bold text-primary-dark mb-2 group-hover:text-purple-500 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg weight-bold text-purple-500">{service.price}</span>
                    <button className="text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm weight-medium">
                      Заказать
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 bg-gradient-to-br from-primary-bg to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl weight-bold text-primary-dark mb-6">
              Сферы применения
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Оформляем интерьеры для различных типов объектов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <app.icon className="w-5 h-5" />
                        <h3 className="text-lg weight-bold">{app.title}</h3>
                      </div>
                      <p className="text-sm opacity-90">{app.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl weight-bold text-primary-dark mb-6">
              Материалы и технологии
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Используем качественные материалы, безопасные для интерьеров
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {materials.map((material, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg weight-bold text-primary-dark mb-2">{material.name}</h3>
                <p className="text-muted text-sm mb-3">{material.description}</p>
                <div className="text-xs text-purple-500 weight-medium bg-purple-500/10 px-3 py-1 rounded-full">
                  {material.usage}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-24 bg-gradient-to-br from-primary-bg to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl weight-bold text-primary-dark mb-6">
              Как мы работаем
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              От замеров до монтажа — профессиональный подход на каждом этапе
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-light">
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25 mx-auto"
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center text-sm weight-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl weight-bold text-primary-dark mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center space-x-1 text-purple-500 text-sm weight-medium">
                    <Clock className="w-4 h-4" />
                    <span>{step.duration}</span>
                  </div>
                </div>
                
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl weight-bold text-primary-dark mb-6">
              Наши преимущества
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Почему выбирают нас для оформления интерьеров
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-purple-500/30 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25 mx-auto mb-4"
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl weight-bold text-primary-dark mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-gradient-to-br from-primary-bg to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl weight-bold text-primary-dark mb-6">
              Примеры наших работ
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Успешные проекты интерьерной рекламы для различных объектов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {portfolio.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm weight-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl weight-bold text-primary-dark mb-2">{item.title}</h3>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-success weight-medium">{item.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="group bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-2xl weight-semibold inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Все работы</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl weight-bold mb-6"
            >
              Готовы преобразить интерьер?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            >
              Свяжитесь с нами для выезда на объект и бесплатного дизайн-проекта
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="tel:+73471234567"
                className="group bg-white text-purple-500 px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Заказать выезд</span>
              </a>
              
              <Link
                href="/calculator"
                className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 weight-semibold flex items-center justify-center space-x-2"
              >
                <Navigation className="w-5 h-5" />
                <span>3D-визуализация</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingAction />
    </>
  )
}