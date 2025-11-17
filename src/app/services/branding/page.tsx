'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { 
  Palette, 
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
  Sparkles,
  Target,
  Layers,
  Feather,
  Heart
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FloatingAction from '../../components/FloatingAction'

const services = [
  {
    name: 'Логотип и фирменный знак',
    description: 'Создание уникального логотипа и фирменного знака',
    price: 'от 25 000 ₽',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
  },
  {
    name: 'Нейминг и слоган', 
    description: 'Разработка названия бренда и запоминающегося слогана',
    price: 'от 15 000 ₽',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  },
  {
    name: 'Брендбук и гайдлайны',
    description: 'Полное руководство по использованию фирменного стиля',
    price: 'от 45 000 ₽',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'
  },
  {
    name: 'Фирменная полиграфия',
    description: 'Визитки, бланки, конверты в едином стиле',
    price: 'от 8 000 ₽',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  },
  {
    name: 'Дизайн упаковки',
    description: 'Привлекательная упаковка для ваших товаров',
    price: 'от 35 000 ₽',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop'
  },
  {
    name: 'Фирменный стиль',
    description: 'Комплексная разработка айдентики бренда',
    price: 'от 75 000 ₽',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
  }
]

const process = [
  {
    step: '01',
    title: 'Исследование бренда',
    description: 'Анализируем рынок, аудиторию и конкурентов',
    icon: Users,
    duration: '3-5 дней'
  },
  {
    step: '02', 
    title: 'Концепция и стратегия',
    description: 'Разрабатываем позиционирование и концепцию',
    icon: Lightbulb,
    duration: '5-7 дней'
  },
  {
    step: '03',
    title: 'Дизайн-разработка',
    description: 'Создаем логотип и элементы фирменного стиля',
    icon: Wrench,
    duration: '7-10 дней'
  },
  {
    step: '04',
    title: 'Презентация и сдача',
    description: 'Представляем результат и передаем материалы',
    icon: Truck,
    duration: '2-3 дня'
  }
]

const advantages = [
  {
    icon: Sparkles,
    title: 'Индивидуальный подход',
    description: 'Каждый проект уникален и неповторим'
  },
  {
    icon: Award,
    title: 'Регистрация товарного знака',
    description: 'Помогаем оформить права на логотип'
  },
  {
    icon: Target,
    title: '3 варианта концепции',
    description: 'Предлагаем несколько решений на выбор'
  },
  {
    icon: Shield,
    title: 'Гарантия уникальности',
    description: 'Проверяем на похожесть с конкурентами'
  }
]

const brandingTypes = [
  {
    title: 'Стартапы',
    description: 'Создание бренда с нуля для новых компаний',
    icon: Zap,
    features: ['Логотип', 'Нейминг', 'Фирменные цвета', 'Базовая полиграфия'],
    price: 'от 50 000 ₽'
  },
  {
    title: 'Малый бизнес',
    description: 'Профессиональный брендинг для развивающихся компаний',
    icon: Users,
    features: ['Логотип', 'Брендбук', 'Полиграфия', 'Веб-стиль'],
    price: 'от 75 000 ₽'
  },
  {
    title: 'Корпорации',
    description: 'Комплексный ребрендинг крупных организаций',
    icon: Award,
    features: ['Полный аудит', 'Стратегия', 'Фирменный стиль', 'Гайдлайны'],
    price: 'от 150 000 ₽'
  }
]

const brandElements = [
  {
    name: 'Логотип',
    description: 'Основной графический элемент бренда',
    variations: ['Полноцветный', 'Одноцветный', 'Инверсный', 'Упрощенный']
  },
  {
    name: 'Цветовая палитра',
    description: 'Фирменные цвета и их сочетания',
    variations: ['Основные цвета', 'Дополнительные', 'Градиенты', 'Нейтральные']
  },
  {
    name: 'Типографика',
    description: 'Фирменные шрифты и правила их использования',
    variations: ['Заголовочный', 'Основной текст', 'Акцентный', 'Веб-шрифты']
  },
  {
    name: 'Графические элементы',
    description: 'Дополнительные элементы дизайна',
    variations: ['Паттерны', 'Иконки', 'Иллюстрации', 'Фотостиль']
  }
]

const portfolio = [
  {
    title: 'Строительная компания "ЭкоСтрой"',
    category: 'Фирменный стиль',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    result: 'Рост узнаваемости на 60%'
  },
  {
    title: 'Ресторан "Вкус востока"',
    category: 'Полный брендинг',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    result: '+45% новых клиентов'
  },
  {
    title: 'IT-стартап "TechFlow"',
    category: 'Логотип и айдентика',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    result: 'Успешный выход на рынок'
  }
]

export default function BrandingPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-primary-05)' }}></div>
          <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-primary-dark-05)' }}></div>
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
                <Palette className="w-4 h-4 text-primary" />
                <span className="text-caption weight-semibold text-gray-700">Брендинг</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-display-1 weight-bold text-on-dark mb-6"
              >
                Создаем{' '}
                <span className="relative inline-block">
                  <span className="gradient-kvartett-text">бренды</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-primary opacity-30 rounded-full"
                  />
                </span>
                {' '}с душой
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-body-xl text-on-dark-muted mb-8 leading-relaxed-kw"
              >
                От логотипа до комплексного фирменного стиля. Создаем уникальную айдентику, которая выделит ваш бренд среди конкурентов и останется в памяти клиентов.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/calculator"
                  className="group bg-gradient-primary text-white px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Рассчитать бренд</span>
                </Link>
                
                <a
                  href="tel:+73471234567"
                  className="group bg-primary-dark text-white px-8 py-4 rounded-2xl border border-primary-dark hover:bg-primary transition-all duration-300 weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
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
                  { label: 'Брендов создано', value: '100+' },
                  { label: 'Дней разработка', value: '14' },
                  { label: 'Концепций', value: '3' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-title weight-bold text-primary">{stat.value}</div>
                    <div className="text-caption text-muted">{stat.label}</div>
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
              <div className="aspect-square bg-primary-10 rounded-3xl p-8 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop"
                  alt="Брендинг"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-white" />
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
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6">
              Услуги брендинга
            </h2>
            <p className="text-body-xl text-muted max-w-3xl mx-auto">
              Полный спектр услуг по созданию и развитию фирменного стиля
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
                      <button className="w-full bg-white/90 backdrop-blur-sm text-primary-dark py-2 px-4 rounded-lg weight-medium flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Смотреть примеры</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-body-lg weight-bold text-primary-dark mb-2 group-hover:text-warning transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted mb-4 text-caption leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-body-lg weight-bold text-warning">{service.price}</span>
                    <button className="text-warning hover:bg-warning hover:text-white px-4 py-2 rounded-lg transition-all duration-300 text-caption weight-medium">
                      Заказать
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Types */}
      <section className="py-24 bg-gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6">
              Пакеты брендинга
            </h2>
            <p className="text-body-xl text-muted max-w-3xl mx-auto">
              Готовые решения для разных типов бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {brandingTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
              >
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-warning to-warning-dark text-white px-4 py-1 rounded-full text-caption weight-medium">
                      Популярный
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-r from-warning to-warning-dark flex items-center justify-center shadow-lg shadow-warning/25 mx-auto mb-6"
                  >
                    <type.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-title weight-bold text-primary-dark mb-3">{type.title}</h3>
                  <p className="text-muted mb-6">{type.description}</p>
                  
                  <div className="text-title-lg weight-bold text-warning mb-6">{type.price}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-6 rounded-xl weight-semibold transition-all duration-300 ${
                    index === 1 
                      ? 'bg-gradient-to-r from-warning to-warning-dark text-white hover:shadow-lg'
                      : 'bg-primary-10 text-gray-700 hover:bg-gray-200'
                  }`}>
                    Выбрать пакет
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Elements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6">
              Элементы фирменного стиля
            </h2>
            <p className="text-body-xl text-muted max-w-3xl mx-auto">
              Что входит в полный фирменный стиль бренда
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandElements.map((element, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-warning to-warning-dark flex items-center justify-center shadow-lg mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-body-lg weight-bold text-primary-dark mb-2">{element.name}</h3>
                <p className="text-muted text-caption mb-4">{element.description}</p>
                <ul className="space-y-1">
                  {element.variations.map((variation, i) => (
                    <li key={i} className="text-xs text-warning bg-warning/10 px-2 py-1 rounded-full inline-block mr-1 mb-1">
                      {variation}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-24 bg-gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6">
              Как мы создаем бренды
            </h2>
            <p className="text-body-xl text-muted max-w-3xl mx-auto">
              Проверенная методология разработки фирменного стиля
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
                      className="w-16 h-16 rounded-2xl bg-gradient-to-r from-warning to-warning-dark flex items-center justify-center shadow-lg shadow-warning/25 mx-auto"
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center text-caption weight-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-body-lg weight-bold text-primary-dark mb-3">{step.title}</h3>
                  <p className="text-muted mb-4 text-caption leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center space-x-1 text-warning text-caption weight-medium">
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
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6">
              Наши преимущества
            </h2>
            <p className="text-body-xl text-primary-dark max-w-3xl mx-auto">
              Почему выбирают нас для создания фирменного стиля
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
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-warning/30 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg shadow-primary mx-auto mb-4"
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
      <section className="py-24 bg-gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6">
              Примеры наших работ
            </h2>
            <p className="text-body-xl text-muted max-w-3xl mx-auto">
              Успешные бренды, которые мы создали для наших клиентов
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
                    <span className="bg-warning text-white px-3 py-1 rounded-full text-caption weight-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-body-lg weight-bold text-primary-dark mb-2">{item.title}</h3>
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
              className="group bg-gradient-to-r from-warning to-warning-dark text-white px-8 py-4 rounded-2xl weight-semibold inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Все работы</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Quiz */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6">
              Проверьте свой бренд
            </h2>
            <p className="text-body-xl text-muted max-w-3xl mx-auto">
              Ответьте на несколько вопросов и узнайте, нужен ли вам ребрендинг
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-warning/10 to-warning-dark/10 p-8 rounded-2xl border border-warning/20">
                <h3 className="text-title weight-bold text-primary-dark mb-6">Быстрый тест бренда</h3>
                <div className="space-y-4">
                  {[
                    'Ваш логотип выглядит устаревшим?',
                    'Клиенты не запоминают ваш бренд?',
                    'Конкуренты выглядят современнее?',
                    'Нет единого стиля в материалах?'
                  ].map((question, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-primary-light border-gray-300 rounded focus:ring-primary-light"
                      />
                      <span className="text-gray-700">{question}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-warning to-warning-dark text-white py-3 rounded-xl weight-semibold hover:shadow-lg transition-all duration-300">
                  Получить результат
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h4 className="text-body-lg weight-bold text-primary-dark mb-3">
                    Когда нужен ребрендинг?
                  </h4>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Смена направления бизнеса</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Выход на новые рынки</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Устаревший образ</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Слияние компаний</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h4 className="text-body-lg weight-bold text-primary-dark mb-3">
                    Что даст новый бренд?
                  </h4>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-warning flex-shrink-0" />
                      <span>Рост узнаваемости</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-warning flex-shrink-0" />
                      <span>Привлечение клиентов</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-warning flex-shrink-0" />
                      <span>Доверие к компании</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-warning flex-shrink-0" />
                      <span>Конкурентное преимущество</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-display-2 weight-bold mb-6"
            >
              Готовы создать уникальный бренд?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body-xl mb-8 max-w-2xl mx-auto opacity-90"
            >
              Начните с бесплатной консультации и узнайте, как мы можем помочь вашему бренду
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="tel:+73471234567"
                className="group bg-white text-primary-dark px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Бесплатная консультация</span>
              </a>
              
              <Link
                href="/calculator"
                className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 weight-semibold flex items-center justify-center space-x-2"
              >
                <Feather className="w-5 h-5" />
                <span>Бриф на разработку</span>
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