'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { 
  Users, 
  Award, 
  Clock, 
  Target,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Building,
  Lightbulb,
  Zap,
  Eye,
  Shield,
  TrendingUp,
  Map
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingAction from '../components/FloatingAction'

const stats = [
  { value: '15+', label: 'Лет на рынке', icon: Clock },
  { value: '500+', label: 'Довольных клиентов', icon: Users },
  { value: '1000+', label: 'Выполненных проектов', icon: Award },
  { value: '98%', label: 'Точность сроков', icon: Target }
]

const team = [
  {
    name: 'Александр Петров',
    position: 'Директор',
    experience: '15 лет в рекламе',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    description: 'Основатель компании, эксперт в области наружной рекламы'
  },
  {
    name: 'Мария Сидорова',
    position: 'Главный дизайнер',
    experience: '10 лет в дизайне',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    description: 'Создает уникальные дизайн-решения для каждого клиента'
  },
  {
    name: 'Дмитрий Козлов',
    position: 'Руководитель производства',
    experience: '12 лет в производстве',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    description: 'Контролирует качество на всех этапах производства'
  },
  {
    name: 'Елена Волкова',
    position: 'Менеджер проектов',
    experience: '8 лет в управлении',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    description: 'Обеспечивает своевременную реализацию проектов'
  }
]

const values = [
  {
    icon: Quality,
    title: 'Качество',
    description: 'Используем только проверенные материалы и современные технологии'
  },
  {
    icon: Clock,
    title: 'Пунктуальность', 
    description: 'Соблюдаем сроки и выполняем обещания в точно указанное время'
  },
  {
    icon: Heart,
    title: 'Индивидуальный подход',
    description: 'Каждый проект уникален, учитываем все пожелания клиента'
  },
  {
    icon: TrendingUp,
    title: 'Инновации',
    description: 'Следим за трендами и внедряем новые технологии в работу'
  }
]

function Quality({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

const timeline = [
  {
    year: '2009',
    title: 'Основание компании',
    description: 'Началось все с небольшой мастерской и большой мечты'
  },
  {
    year: '2012',
    title: 'Первая сотня клиентов',
    description: 'Завоевали доверие местного бизнеса качественной работой'
  },
  {
    year: '2015',
    title: 'Собственное производство',
    description: 'Открыли современный цех полного цикла производства'
  },
  {
    year: '2018',
    title: 'Расширение команды',
    description: 'В команде уже более 20 специалистов разного профиля'
  },
  {
    year: '2021',
    title: 'Новые технологии',
    description: 'Внедрили LED-технологии и цифровую печать'
  },
  {
    year: '2024',
    title: 'Лидер рынка',
    description: 'Стали одним из крупнейших рекламных агентств региона'
  }
]

const achievements = [
  {
    title: 'Диплом "Лучшее рекламное агентство года"',
    year: '2023',
    organization: 'Торгово-промышленная палата РБ'
  },
  {
    title: 'Сертификат качества ISO 9001',
    year: '2022',
    organization: 'Международная организация по стандартизации'
  },
  {
    title: 'Победитель конкурса "Реклама года"',
    year: '2021',
    organization: 'Ассоциация рекламистов Башкортостана'
  }
]

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1FCAD4]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-[#E91E63]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#1FCAD4]/10 to-[#E91E63]/10 rounded-full px-4 py-2 mb-6"
              >
                <Building className="w-4 h-4 text-[#1FCAD4]" />
                <span className="text-sm font-semibold text-gray-700">О компании Квартет</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Создаем{' '}
                <span className="relative inline-block">
                  <span className="gradient-kvartett-text">будущее</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1FCAD4] to-[#E91E63] opacity-30 rounded-full"
                  />
                </span>
                {' '}рекламы
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Уже 15 лет мы помогаем бизнесу расти, создавая яркую и эффективную рекламу. Наша миссия — делать ваш бренд заметным и запоминающимся.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/services"
                  className="group bg-gradient-to-r from-[#1FCAD4] to-[#0891A3] text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>Наши услуги</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/portfolio"
                  className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl border border-gray-200/50 hover:border-[#1FCAD4]/50 hover:text-[#1FCAD4] transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Eye className="w-5 h-5" />
                  <span>Портфолио</span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-[#1FCAD4]/20 to-[#E91E63]/20 rounded-3xl p-8 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop"
                  alt="Команда Квартет"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#1FCAD4] to-[#E91E63] rounded-full flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Цифры, которые говорят за нас
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Результаты нашей работы в цифрах и фактах
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-[#1FCAD4]/30 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg shadow-[#1FCAD4]/25 mx-auto mb-4"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-[#1FCAD4] mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наша история
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              От маленькой мастерской до лидера рынка рекламных услуг
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#1FCAD4] to-[#E91E63] h-full rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? 'lg:text-right' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                      <div className="text-2xl font-bold text-[#1FCAD4] mb-2">{event.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className={`hidden lg:block ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="w-full h-32 bg-gradient-to-br from-[#1FCAD4]/20 to-[#E91E63]/20 rounded-2xl"></div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-[#1FCAD4] rounded-full z-10"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Команда профессионалов
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Знакомьтесь с людьми, которые создают лучшую рекламу в регионе
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mb-6"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto shadow-lg">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#1FCAD4] to-[#E91E63] rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <div className="text-[#1FCAD4] font-medium mb-2">{member.position}</div>
                  <div className="text-sm text-gray-500 mb-3">{member.experience}</div>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg shadow-[#1FCAD4]/25 mx-auto mb-4"
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Награды и достижения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Признание профессионального сообщества и клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-[#1FCAD4]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl gradient-kvartett flex items-center justify-center shadow-lg flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</div>
                    <div className="text-[#1FCAD4] font-medium mb-1">{achievement.year}</div>
                    <div className="text-sm text-gray-600">{achievement.organization}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наш офис в Уфе
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Приезжайте к нам для обсуждения проектов и знакомства с производством
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-kvartett flex items-center justify-center shadow-lg">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Офис и производство</h3>
                    <p className="text-gray-600">Полный цикл под одной крышей</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-[#1FCAD4]" />
                    <span className="text-gray-700">г. Уфа, ул. Ленская, 128</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#1FCAD4]" />
                    <span className="text-gray-700">Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-[#1FCAD4]" />
                    <span className="text-gray-700">20+ специалистов</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contacts"
                    className="group bg-gradient-to-r from-[#1FCAD4] to-[#0891A3] text-white px-6 py-3 rounded-xl font-medium inline-flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                  >
                    <span>Как добраться</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-[#1FCAD4]/20 to-[#E91E63]/20 rounded-2xl p-4">
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <div className="text-gray-500">Интерактивная карта</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-[#1FCAD4] via-[#E91E63] to-[#FBBF24] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Готовы работать с профессионалами?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            >
              Свяжитесь с нами и убедитесь, что мы — именно та команда, которая нужна вашему бизнесу
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contacts"
                className="group bg-white text-[#1FCAD4] px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <Users className="w-5 h-5" />
                <span>Познакомиться</span>
              </Link>
              
              <Link
                href="/services"
                className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <Lightbulb className="w-5 h-5" />
                <span>Обсудить проект</span>
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