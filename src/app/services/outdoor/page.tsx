'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { 
  Building, 
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
  Shield
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FloatingAction from '../../components/FloatingAction'

const services = [
  {
    name: 'Световые короба',
    description: 'Объемные световые конструкции с LED-подсветкой',
    price: 'от 25 000 ₽',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop'
  },
  {
    name: 'Объемные буквы', 
    description: 'Металлические и пластиковые буквы с подсветкой',
    price: 'от 2 500 ₽/буква',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=300&fit=crop'
  },
  {
    name: 'Баннеры',
    description: 'Широкоформатная печать на баннерной ткани',
    price: 'от 350 ₽/м²',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'
  },
  {
    name: 'Билборды',
    description: 'Размещение и изготовление билбордов 6х3м',
    price: 'от 150 000 ₽',
    image: 'https://images.unsplash.com/photo-1588200618307-6fd9ad04ad3c?w=400&h=300&fit=crop'
  },
  {
    name: 'Неоновая реклама',
    description: 'Эффектная неоновая подсветка любой сложности',
    price: 'от 15 000 ₽',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop'
  },
  {
    name: 'LED экраны',
    description: 'Современные светодиодные экраны для рекламы',
    price: 'от 300 000 ₽',
    image: 'https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?w=400&h=300&fit=crop'
  }
]

const process = [
  {
    step: '01',
    title: 'Консультация',
    description: 'Обсуждаем ваши задачи, цели и бюджет проекта',
    icon: Users,
    duration: '1 день'
  },
  {
    step: '02', 
    title: 'Дизайн-проект',
    description: 'Создаем дизайн-макет и 3D визуализацию',
    icon: Lightbulb,
    duration: '2-3 дня'
  },
  {
    step: '03',
    title: 'Производство',
    description: 'Изготавливаем рекламную конструкцию на заводе',
    icon: Wrench,
    duration: '5-10 дней'
  },
  {
    step: '04',
    title: 'Монтаж',
    description: 'Устанавливаем готовую конструкцию на объекте',
    icon: Truck,
    duration: '1-2 дня'
  }
]

const advantages = [
  {
    icon: Building,
    title: 'Собственное производство',
    description: 'Полный цикл от дизайна до монтажа'
  },
  {
    icon: Clock,
    title: 'Быстрые сроки',
    description: 'Изготовление за 5-10 рабочих дней'
  },
  {
    icon: Shield,
    title: 'Гарантия 3 года',
    description: 'На все виды наружной рекламы'
  },
  {
    icon: Award,
    title: 'Опыт 15+ лет',
    description: 'Реализовали более 1000 проектов'
  }
]

const portfolio = [
  {
    title: 'Ресторан "Мираж"',
    category: 'Световой короб',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
    result: '+40% посетителей'
  },
  {
    title: 'Автосалон "Премиум"', 
    category: 'Объемные буквы',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop',
    result: '+25% узнаваемости'
  },
  {
    title: 'Торговый центр',
    category: 'LED экран',
    image: 'https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?w=600&h=400&fit=crop',
    result: '+60% трафика'
  }
]

export default function OutdoorAdvertisingPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-dark/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-full px-4 py-2 mb-6"
              >
                <Building className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-gray-700">Наружная реклама</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Яркая реклама{' '}
                <span className="relative inline-block">
                  <span className="gradient-kvartett-text">24/7</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-primary-dark opacity-30 rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Полный цикл производства наружной рекламы: от разработки дизайна до монтажа. Собственное производство, опыт 15+ лет, гарантия качества.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/calculator"
                  className="group bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Рассчитать стоимость</span>
                </Link>
                
                <a
                  href="tel:+73471234567"
                  className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl border border-gray-200/50 hover:border-primary/50 hover:text-primary transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
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
                  { label: 'Проектов', value: '1000+' },
                  { label: 'Лет опыта', value: '15+' },
                  { label: 'Гарантия', value: '3 года' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
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
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-3xl p-8 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop"
                  alt="Наружная реклама"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center"
              >
                <Zap className="w-8 h-8 text-white" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Виды наружной рекламы
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр решений для эффективного продвижения вашего бизнеса
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
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Смотреть примеры</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{service.price}</span>
                    <button className="text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium">
                      Заказать
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Как мы работаем
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Прозрачный процесс от первого звонка до готового результата
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
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg shadow-primary mx-auto"
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center space-x-1 text-primary text-sm font-medium">
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наши преимущества
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Почему клиенты выбирают нас для изготовления наружной рекламы
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
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg shadow-primary mx-auto mb-4"
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Примеры наших работ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Успешные проекты наружной рекламы для разных сфер бизнеса
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
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-success font-medium">{item.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="group bg-gradient-primary text-white px-8 py-4 rounded-2xl font-semibold inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Все работы</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-dark to-warning relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Начните с бесплатной консультации
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            >
              Обсудим ваш проект, подготовим дизайн-макет и рассчитаем точную стоимость
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="tel:+73471234567"
                className="group bg-white text-primary px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Позвонить сейчас</span>
              </a>
              
              <Link
                href="/calculator"
                className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Рассчитать стоимость</span>
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