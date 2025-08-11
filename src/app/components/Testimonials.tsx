'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, ChevronLeft, ChevronRight, Play, CheckCircle, Award, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Александр Петров',
    position: 'Директор, ООО "СтройМонтаж"',
    rating: 5,
    text: 'Квартет выполнил заказ на изготовление наружной рекламы быстро и качественно. Особенно порадовали сроки - всего за 2 дня вывеска была готова и установлена. Рекомендую!',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    project: 'Световая вывеска',
    result: '+250% узнаваемости',
    budget: '150 000 ₽',
    videoReview: true
  },
  {
    id: 2,
    name: 'Марина Сидорова',
    position: 'Управляющая сетью кафе "Вкусно"',
    rating: 5,
    text: 'Обратились в Квартет за комплексным оформлением нового кафе. Результат превзошел ожидания! Стильный дизайн, качественные материалы, профессиональный монтаж.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    project: 'Комплексное оформление',
    result: '+180% посещаемости',
    budget: '280 000 ₽',
    videoReview: false
  },
  {
    id: 3,
    name: 'Дмитрий Козлов',
    position: 'Маркетолог, IT-компания "Софт"',
    rating: 5,
    text: 'Заказывали разработку фирменного стиля и печать презентационных материалов. Дизайнеры Квартета создали потрясающий образ компании. Очень довольны сотрудничеством!',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    project: 'Брендинг и полиграфия',
    result: '+320% лидов',
    budget: '95 000 ₽',
    videoReview: true
  },
  {
    id: 4,
    name: 'Елена Волкова',
    position: 'Владелица магазина "Модный стиль"',
    rating: 5,
    text: 'Квартет помог с оформлением витрины и интерьерной рекламой. Продажи выросли на 40%! Спасибо за креативный подход и качественное исполнение.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    project: 'Витринная реклама',
    result: '+200% продаж',
    budget: '120 000 ₽',
    videoReview: false
  },
  {
    id: 5,
    name: 'Игорь Смирнов',
    position: 'Директор автосалона "Премиум Авто"',
    rating: 5,
    text: 'Сотрудничаем с Квартетом уже 3 года. За это время выполнили более 20 проектов - от визиток до билбордов. Всегда высокое качество, разумные цены.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    project: 'Долгосрочное партнерство',
    result: '+400% клиентов',
    budget: '1 500 000 ₽',
    videoReview: true
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Автопереключение отзывов
  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  return (
    <section className="py-24 bg-gradient-bg relative overflow-hidden" ref={ref}>
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-05 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-dark-05 rounded-full blur-3xl"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] border border-gray-200/30 rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-10 to-primary-dark-10 rounded-full px-6 py-2 mb-6"
          >
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-gray-700">Отзывы клиентов</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Что говорят наши{' '}
            <span className="relative inline-block">
              <span className="gradient-kvartett-text">клиенты</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary opacity-30 rounded-full"
              />
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Более 500 довольных клиентов доверили нам свою рекламу и получили превосходные результаты
          </p>
        </motion.div>

        {/* Основной отзыв */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 overflow-hidden">
            {/* Декоративные элементы */}
            <div className="absolute top-6 left-6 opacity-10">
              <Quote className="w-16 h-16 text-primary" />
            </div>
            <div className="absolute bottom-6 right-6 rotate-180 opacity-10">
              <Quote className="w-16 h-16 text-primary-dark" />
            </div>

            {/* Градиентная полоса - скрыта */}
            {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div> */}

            <div className="relative z-10">
              <AnimatePresence>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Рейтинг */}
                  <div className="flex justify-center mb-8">
                    <div className="flex space-x-1">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                        >
                          <Star className="w-7 h-7 text-primary-light fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Текст отзыва */}
                  <blockquote className="text-xl md:text-2xl text-gray-800 text-center leading-relaxed mb-8 font-medium">
                    "{testimonials[activeIndex].text}"
                  </blockquote>

                  {/* Результаты проекта */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-primary-10 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {testimonials[activeIndex].result}
                      </div>
                      <div className="text-sm text-muted">Результат</div>
                    </div>
                    <div className="bg-primary-10 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {testimonials[activeIndex].budget}
                      </div>
                      <div className="text-sm text-muted">Бюджет</div>
                    </div>
                    <div className="bg-primary-dark-10 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary-dark mb-1">
                        {testimonials[activeIndex].project}
                      </div>
                      <div className="text-sm text-muted">Проект</div>
                    </div>
                  </div>

                  {/* Информация о клиенте */}
                  <div className="flex items-center justify-center space-x-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <img
                          src={testimonials[activeIndex].imageUrl}
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const root = document.documentElement;
                            const computed = getComputedStyle(root).getPropertyValue('--color-primary').trim();
                            const hex = computed.startsWith('#') ? computed.slice(1) : computed;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[activeIndex].name)}&background=${hex}&color=fff&size=200`;
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {testimonials[activeIndex].position}
                      </p>
                      {testimonials[activeIndex].videoReview && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center space-x-2 bg-primary-10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-20 transition-colors"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>Видео отзыв</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Навигация */}
              <div className="flex items-center justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center text-muted hover:text-primary hover:bg-white transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                {/* Индикаторы */}
                <div className="flex space-x-3">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => {
                        setActiveIndex(index)
                        setIsAutoPlay(false)
                      }}
                      className={`relative transition-all duration-300 ${
                        index === activeIndex 
                          ? 'w-8 h-3 bg-gradient-primary rounded-full' 
                          : 'w-3 h-3 bg-light hover:bg-hover rounded-full'
                      }`}
                    >
                      {index === activeIndex && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-gradient-primary rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-white transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Миниатюры отзывов */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveIndex(index)
                setIsAutoPlay(false)
              }}
              className={`relative p-6 rounded-2xl transition-all duration-300 text-left group ${
                index === activeIndex
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-xl scale-105'
                  : 'bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 shadow-lg border border-white/20'
              }`}
            >
              {/* Активный индикатор */}
              {index === activeIndex && (
                <motion.div
                  layoutId="activeCard"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-2xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 mx-auto mb-3">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const root = document.documentElement;
                      const computed = getComputedStyle(root).getPropertyValue('--color-primary').trim();
                      const hex = computed.startsWith('#') ? computed.slice(1) : computed;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=${hex}&color=fff&size=200`;
                    }}
                  />
                </div>
                <div className="text-sm font-semibold truncate mb-1">
                  {testimonial.name}
                </div>
                <div className={`text-xs truncate mb-2 ${
                  index === activeIndex ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {testimonial.project}
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 fill-current ${
                      index === activeIndex ? 'text-warning' : 'text-warning'
                    }`} />
                  ))}
                </div>
              </div>

              {/* Видео индикатор */}
              {testimonial.videoReview && (
                <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                  index === activeIndex ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                  <Play className={`w-3 h-3 fill-current ${
                    index === activeIndex ? 'text-white' : 'text-primary'
                  }`} />
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Статистика с анимацией */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { icon: Users, number: '500+', label: 'Довольных клиентов', color: 'text-primary' },
    { icon: Award, number: '15', label: 'Лет на рынке', color: 'text-primary-dark' },
    { icon: CheckCircle, number: '98%', label: 'Клиентов возвращаются', color: 'text-success' },
    { icon: Star, number: '4.9', label: 'Средний рейтинг', color: 'text-warning' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all duration-300 ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-gray-600 leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}