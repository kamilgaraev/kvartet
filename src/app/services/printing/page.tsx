'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { 
  FileText, 
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
  Palette,
  Layers,
  Download
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FloatingAction from '../../components/FloatingAction'

const services = [
  {
    name: 'Визитки',
    description: 'Дизайн и печать визитных карточек любых форматов',
    price: 'от 500 ₽',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'
  },
  {
    name: 'Листовки и флаеры', 
    description: 'Рекламные листовки формата А4, А5, А6',
    price: 'от 800 ₽',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  },
  {
    name: 'Каталоги и брошюры',
    description: 'Многостраничные каталоги с переплетом',
    price: 'от 2 500 ₽',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  },
  {
    name: 'Календари',
    description: 'Настенные, настольные и карманные календари',
    price: 'от 1 200 ₽',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
  },
  {
    name: 'Этикетки и наклейки',
    description: 'Самоклеящиеся этикетки любых размеров',
    price: 'от 300 ₽',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop'
  },
  {
    name: 'Широкоформатная печать',
    description: 'Постеры, плакаты, баннеры до 5 метров',
    price: 'от 400 ₽/м²',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
  }
]

const process = [
  {
    step: '01',
    title: 'Техническое задание',
    description: 'Обсуждаем формат, тираж, материалы и сроки',
    icon: Users,
    duration: '1 час'
  },
  {
    step: '02', 
    title: 'Дизайн-макет',
    description: 'Создаем дизайн или адаптируем ваш',
    icon: Lightbulb,
    duration: '1-2 дня'
  },
  {
    step: '03',
    title: 'Печать',
    description: 'Печатаем на профессиональном оборудовании',
    icon: Wrench,
    duration: '1-3 дня'
  },
  {
    step: '04',
    title: 'Постобработка',
    description: 'Резка, фальцовка, ламинирование, упаковка',
    icon: Truck,
    duration: '1 день'
  }
]

const advantages = [
  {
    icon: Palette,
    title: 'Цифровая и офсетная печать',
    description: 'Выбираем оптимальную технологию'
  },
  {
    icon: Clock,
    title: 'Экспресс-заказы',
    description: 'Срочная печать за 24 часа'
  },
  {
    icon: Shield,
    title: 'Контроль качества',
    description: 'Проверяем каждый тираж'
  },
  {
    icon: Award,
    title: 'Постобработка',
    description: 'Полный цикл финишной обработки'
  }
]

const materials = [
  {
    name: 'Мелованная бумага',
    description: '115-300 г/м², глянцевая и матовая',
    usage: 'Каталоги, буклеты, листовки'
  },
  {
    name: 'Дизайнерская бумага',
    description: 'Фактурная бумага премиум-класса',
    usage: 'Визитки, приглашения'
  },
  {
    name: 'Самоклеящаяся пленка',
    description: 'Матовая и глянцевая, разные цвета',
    usage: 'Этикетки, наклейки'
  },
  {
    name: 'Синтетические материалы',
    description: 'Пластик, пленка, баннерная ткань',
    usage: 'Долговечная продукция'
  }
]

const portfolio = [
  {
    title: 'Каталог "Мебель Плюс"',
    category: 'Каталог',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
    result: '+30% продаж'
  },
  {
    title: 'Визитки стоматологии',
    category: 'Визитки',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    result: 'Премиум качество'
  },
  {
    title: 'Листовки ресторана',
    category: 'Листовки',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    result: '+25% заказов'
  }
]

export default function PrintingPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-to-br from-primary-bg via-white to-primary-10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-success/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-dark/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-success/10 to-primary-dark/10 rounded-full px-4 py-2 mb-6"
              >
                <FileText className="w-4 h-4 text-success" />
                <span className="text-sm weight-semibold text-muted">Полиграфия</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-display-1 weight-bold text-primary-dark mb-6 leading-tight-kw"
              >
                Качественная{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-success to-success-dark bg-clip-text text-transparent">печать</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-success to-success-dark opacity-30 rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted mb-8 leading-relaxed"
              >
                От визиток до каталогов — высококачественная печать любых тиражей. Цифровая и офсетная печать, экспресс-заказы, полная постобработка.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/calculator"
                  className="group bg-gradient-to-r from-success to-success-dark text-white px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Рассчитать тираж</span>
                </Link>
                
                <a
                  href="tel:+73471234567"
                  className="group bg-card/80 backdrop-blur-sm text-muted px-8 py-4 rounded-2xl border border-light/50 hover:border-success/50 hover:text-success transition-all duration-300 weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  <span>+7 (347) 123-45-67</span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-light"
              >
                {[
                  { label: 'Видов продукции', value: '50+' },
                  { label: 'Часов экспресс', value: '24' },
                  { label: 'Лет опыта', value: '15+' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl weight-bold text-success">{stat.value}</div>
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
              <div className="aspect-square bg-gradient-to-br from-success/20 to-primary-dark/20 rounded-3xl p-8 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop"
                  alt="Полиграфия"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-success to-success-dark rounded-full flex items-center justify-center"
              >
                <Layers className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Виды полиграфии
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Полный спектр полиграфических услуг от визиток до каталогов
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
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-light"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-10 to-primary-20 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full bg-card/90 backdrop-blur-sm text-primary-dark py-2 px-4 rounded-lg weight-medium flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Смотреть примеры</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl weight-bold text-primary-dark mb-2 group-hover:text-success transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg weight-bold text-success">{service.price}</span>
              <button className="text-success hover:bg-success hover:text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm weight-medium">
                      Заказать
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-24 bg-gradient-to-br from-primary-bg to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Материалы и технологии
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Используем только качественные материалы и современное оборудование
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
                className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-light"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-success to-success-dark flex items-center justify-center shadow-lg mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg weight-bold text-primary-dark mb-2">{material.name}</h3>
                <p className="text-muted text-sm mb-3">{material.description}</p>
                <div className="text-xs text-success weight-medium bg-success/10 px-3 py-1 rounded-full">
                  {material.usage}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Как мы работаем
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Профессиональный подход на каждом этапе производства
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
                <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-light">
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-r from-success to-success-dark flex items-center justify-center shadow-lg shadow-success/25 mx-auto"
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center text-sm weight-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl weight-bold text-primary-dark mb-3">{step.title}</h3>
                  <p className="text-muted mb-4 text-sm leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center space-x-1 text-success text-sm weight-medium">
                    <Clock className="w-4 h-4" />
                    <span>{step.duration}</span>
                  </div>
                </div>
                
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-gradient-to-br from-primary-bg to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Наши преимущества
            </h2>
            <p className="text-body-xl text-primary-dark max-w-3xl mx-auto">
              Почему клиенты выбирают нас для печати полиграфии
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
                className="text-center p-6 bg-card rounded-2xl border border-light hover:border-success/30 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-success to-success-dark flex items-center justify-center shadow-lg shadow-success/25 mx-auto mb-4"
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-title weight-bold text-primary-dark mb-3">{advantage.title}</h3>
                <p className="text-body text-primary-dark">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Примеры наших работ
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Качественная полиграфия для разных сфер бизнеса
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
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-success text-white px-3 py-1 rounded-full text-sm weight-medium">
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
              className="group bg-gradient-to-r from-success to-success-dark text-white px-8 py-4 rounded-2xl weight-semibold inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Все работы</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-24 bg-gradient-to-br from-primary-bg to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Рассчитайте стоимость
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Узнайте точную стоимость печати вашего тиража
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-light">
              <h3 className="text-2xl weight-bold text-primary-dark mb-6">Быстрый расчет</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm weight-medium text-muted mb-2">
                    Тип продукции
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-light focus:border-success focus:ring-2 focus:ring-success/20 transition-all duration-300">
                    <option>Визитки</option>
                    <option>Листовки A4</option>
                    <option>Каталоги</option>
                    <option>Календари</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm weight-medium text-muted mb-2">
                      Тираж
                    </label>
                    <input
                      type="number"
                      placeholder="1000"
                      className="w-full px-4 py-3 rounded-xl border border-light focus:border-success focus:ring-2 focus:ring-success/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm weight-medium text-muted mb-2">
                      Бумага
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-light focus:border-success focus:ring-2 focus:ring-success/20 transition-all duration-300">
                      <option>Мелованная 130г</option>
                      <option>Мелованная 170г</option>
                      <option>Дизайнерская</option>
                    </select>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-success to-success-dark text-white py-4 rounded-xl weight-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300">
                  <Calculator className="w-5 h-5" />
                  <span>Рассчитать стоимость</span>
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-success/10 to-success-dark/10 p-6 rounded-2xl border border-success/20">
                <h4 className="text-lg weight-bold text-primary-dark mb-4">
                  Примерные цены
                </h4>
                <div className="space-y-3">
                  {[
                    { item: 'Визитки 1000 шт', price: '500 ₽' },
                    { item: 'Листовки A4 1000 шт', price: '800 ₽' },
                    { item: 'Каталог 16 стр 100 шт', price: '2 500 ₽' },
                    { item: 'Календарь настенный 100 шт', price: '1 200 ₽' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-muted">{item.item}</span>
                      <span className="weight-bold text-success">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl shadow-lg border border-light">
                <h4 className="text-lg weight-bold text-primary-dark mb-4">
                  Скидки на тираж
                </h4>
                <div className="space-y-3">
                  {[
                    { range: 'От 1000 экз', discount: '5%' },
                    { range: 'От 5000 экз', discount: '10%' },
                    { range: 'От 10000 экз', discount: '15%' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-muted">{item.range}</span>
                      <span className="text-primary-dark weight-bold">-{item.discount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-success via-success-dark to-success-darker relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl weight-bold mb-6"
            >
              Нужна качественная печать?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            >
              Свяжитесь с нами для консультации и расчета стоимости вашего тиража
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="tel:+73471234567"
                className="group bg-card text-success px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 hover:bg-primary-bg transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Позвонить сейчас</span>
              </a>
              
              <Link
                href="/calculator"
                className="group bg-card/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/30 hover:bg-card/30 transition-all duration-300 weight-semibold flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Прайс-лист PDF</span>
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