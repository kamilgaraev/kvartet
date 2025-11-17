'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { 
  Building, 
  FileText, 
  Home, 
  Palette, 
  CheckCircle, 
  Star, 
  Users,
  Award,
  Clock,
  Zap,
  ArrowRight,
  Phone,
  MessageCircle
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingAction from '../components/FloatingAction'

const services = [
  {
    id: 'outdoor',
    name: 'Наружная реклама',
    icon: Building,
    description: 'Полный цикл производства наружной рекламы: от разработки дизайна до монтажа',
    slug: '/services/outdoor',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    features: [
      'Световые короба и объемные буквы',
      'Баннеры и растяжки',
      'Вывески и указатели', 
      'Билборды и сити-форматы',
      'Неоновая реклама',
      'LED экраны'
    ],
    advantages: [
      'Собственное производство',
      'Монтаж под ключ',
      'Гарантия 3 года'
    ],
    price: 'от 15 000 ₽'
  },
  {
    id: 'printing',
    name: 'Полиграфия',
    icon: FileText,
    description: 'Высококачественная печать любых тиражей и форматов',
    slug: '/services/printing',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
    features: [
      'Визитки и листовки',
      'Каталоги и брошюры',
      'Календари и блокноты',
      'Этикетки и наклейки',
      'Упаковка и пакеты',
      'Широкоформатная печать'
    ],
    advantages: [
      'Цифровая и офсетная печать',
      'Экспресс-заказы за 1 день',
      'Постпечатная обработка'
    ],
    price: 'от 500 ₽'
  },
  {
    id: 'interior', 
    name: 'Интерьерная реклама',
    icon: Home,
    description: 'Оформление интерьеров торговых и офисных помещений',
    slug: '/services/interior',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    features: [
      'Навигация и указатели',
      'Стенды и витрины',
      'Световые панели',
      'Интерьерные вывески',
      'POS-материалы',
      'Оформление витрин'
    ],
    advantages: [
      'Дизайн-проект в подарок',
      'Быстрый монтаж',
      'Эко-материалы'
    ],
    price: 'от 8 000 ₽'
  },
  {
    id: 'branding',
    name: 'Брендинг',
    icon: Palette,
    description: 'Создание и развитие фирменного стиля компании',
    slug: '/services/branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    features: [
      'Логотип и фирменный стиль',
      'Нейминг и слоган',
      'Брендбук и гайдлайны',
      'Упаковка и этикетки',
      'Корпоративная полиграфия',
      'Сувенирная продукция'
    ],
    advantages: [
      'Индивидуальный подход',
      'Регистрация товарного знака',
      '3 варианта концепции'
    ],
    price: 'от 50 000 ₽'
  }
]

const advantages = [
  {
    icon: Award,
    title: 'Опыт 15+ лет',
    description: 'Более 15 лет успешной работы в сфере рекламы'
  },
  {
    icon: Users,
    title: '500+ клиентов',
    description: 'Довольных клиентов, которые нам доверяют'
  },
  {
    icon: Clock,
    title: 'Соблюдаем сроки',
    description: '98% заказов выполняем точно в срок'
  },
  {
    icon: CheckCircle,
    title: 'Гарантия качества',
    description: 'Полная гарантия на все виды работ'
  }
]

export default function ServicesPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [advantagesRef, advantagesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-to-br from-primary-bg via-white to-primary-05 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-05 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-dark-05 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container-adaptive">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-10 to-primary-dark-10 rounded-full px-6 py-2 mb-8"
            >
              <Star className="w-5 h-5 text-primary" />
              <span className="text-caption weight-semibold text-primary-dark">Полный спектр рекламных услуг</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-display-1 weight-bold text-primary-dark mb-8 leading-tight-kw"
            >
              Наши{' '}
              <span className="relative inline-block">
                <span className="gradient-kvartett-text">услуги</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-primary opacity-30 rounded-full"
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-body-xl text-primary-dark mb-12 max-w-3xl mx-auto leading-relaxed-kw"
            >
              От разработки концепции до полной реализации проекта. Мы предоставляем комплексные решения для продвижения вашего бизнеса
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#services"
                className="group bg-gradient-primary text-white px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Выбрать услугу</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/calculator"
                className="group bg-white/80 backdrop-blur-sm text-muted px-8 py-4 rounded-2xl border border-light hover:border-primary hover:text-primary transition-all duration-300 weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Рассчитать стоимость</span>
                <Zap className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" ref={servicesRef} className="py-24 bg-white">
        <div className="container-adaptive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl weight-bold text-primary-dark mb-6">
              Что мы предлагаем
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Профессиональные решения для эффективного продвижения вашего бизнеса
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-8 border border-light hover:border-primary-30 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg shadow-primary"
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl weight-bold text-primary-dark mb-3 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="weight-semibold text-primary-dark mb-3">Услуги:</h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center space-x-2 text-sm text-muted">
                              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="weight-semibold text-primary-dark mb-3">Преимущества:</h4>
                        <ul className="space-y-2">
                          {service.advantages.map((advantage, i) => (
                            <li key={i} className="flex items-center space-x-2 text-sm text-muted">
                              <Star className="w-4 h-4 text-warning flex-shrink-0" />
                              <span>{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted">Стоимость</span>
                        <div className="text-2xl weight-bold text-primary">{service.price}</div>
                      </div>
                      
                      <Link
                        href={service.slug}
                        className="group/btn bg-gradient-primary text-white px-6 py-3 rounded-xl weight-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                      >
                        <span>Подробнее</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section ref={advantagesRef} className="py-24 bg-gradient-to-br from-primary-bg to-white">
        <div className="container-adaptive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={advantagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Почему выбирают нас
            </h2>
            <p className="text-body-xl text-primary-dark max-w-3xl mx-auto">
              Наши конкурентные преимущества и гарантии качества
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={advantagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-dark to-warning relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-adaptive">
          <div className="text-center text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-display-2 weight-bold mb-6 leading-tight-kw"
            >
              Готовы начать проект?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body-xl mb-8 max-w-2xl mx-auto opacity-90"
            >
              Свяжитесь с нами для консультации и расчета стоимости вашего проекта
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contacts"
                className="group bg-white text-primary px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 hover:bg-primary-bg transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Связаться с нами</span>
              </Link>
              
              <Link
                href="/calculator"
                className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 weight-semibold flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Рассчитать проект</span>
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