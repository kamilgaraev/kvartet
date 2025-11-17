'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, ChevronLeft, ChevronRight, Play, CheckCircle, Award, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Автопереключение отзывов
  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const nextTestimonial = () => {
    if (testimonials.length === 0) return
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const prevTestimonial = () => {
    if (testimonials.length === 0) return
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  if (loading || testimonials.length === 0) {
    return null
  }

  return (
    <section className="section-padding-y bg-gradient-bg relative overflow-hidden" ref={ref}>
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-05 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-dark-05 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container-adaptive">
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
            <span className="text-caption weight-semibold text-muted">Отзывы клиентов</span>
          </motion.div>

          <h2 className="text-display-2 text-primary-dark mb-6 leading-tight-kw weight-bold">
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
          <p className="text-body-xl text-muted max-w-3xl mx-auto leading-relaxed-kw">
            Более 500 довольных клиентов доверили нам свою рекламу и получили превосходные результаты
          </p>
        </motion.div>

        {/* Основной отзыв - новый современный дизайн */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="relative">
            {/* Основная карточка отзыва */}
            <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-primary-xl border border-white/40 overflow-hidden">
              {/* Градиентный фон */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-05 via-transparent to-primary-dark-05 opacity-50"></div>
              
              {/* Декоративные элементы */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-20 to-primary-dark-20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary-light-20 to-primary-20 rounded-full blur-3xl"></div>
              
              {/* Плавающие декоративные элементы */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-8 right-8 w-16 h-16 border-2 border-primary-30 rounded-xl opacity-20"
              />
              
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  x: [-5, 5, -5]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-primary rounded-full opacity-10"
              />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Звездный рейтинг с новым дизайном */}
                    <div className="flex justify-center mb-8">
                      <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: i * 0.1, 
                              type: "spring", 
                              stiffness: 200,
                              damping: 10 
                            }}
                          >
                            <Star className="w-7 h-7 text-warning fill-current drop-shadow-sm" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Крупная цитата */}
                    <div className="relative mb-10">
                      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary-30 transform -rotate-12" />
                      <blockquote className="text-2xl md:text-3xl text-primary-dark text-center leading-relaxed weight-medium italic">
                        "{testimonials[activeIndex].text}"
                      </blockquote>
                      <Quote className="absolute -bottom-4 -right-4 w-12 h-12 text-primary-30 transform rotate-12 scale-x-[-1]" />
                    </div>

                    {/* Статистика проекта в новом стиле */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <motion.div 
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-gradient-to-br from-primary-10 to-primary-20 rounded-2xl p-6 text-center border border-primary-30 shadow-lg backdrop-blur-sm"
                      >
                        <div className="text-3xl weight-bold text-primary mb-2">
                          {testimonials[activeIndex].result}
                        </div>
                        <div className="text-caption text-muted weight-semibold">Результат</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-gradient-to-br from-success/10 to-success/20 rounded-2xl p-6 text-center border border-success/30 shadow-lg backdrop-blur-sm"
                      >
                        <div className="text-3xl weight-bold text-success mb-2">
                          {testimonials[activeIndex].budget}
                        </div>
                        <div className="text-caption text-muted weight-semibold">Бюджет</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-gradient-to-br from-primary-dark-10 to-primary-dark-20 rounded-2xl p-6 text-center border border-primary-dark-30 shadow-lg backdrop-blur-sm"
                      >
                        <div className="text-lg weight-bold text-primary-dark mb-2">
                          {testimonials[activeIndex].project}
                        </div>
                        <div className="text-caption text-muted weight-semibold">Проект</div>
                      </motion.div>
                    </div>

                    {/* Информация о клиенте в новом стиле */}
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white">
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
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg"
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                        </motion.div>
                      </motion.div>
                      
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl weight-bold text-primary-dark mb-2">
                          {testimonials[activeIndex].name}
                        </h3>
                        <p className="text-body-lg text-muted mb-4 weight-medium">
                          {testimonials[activeIndex].position}
                        </p>
                        {testimonials[activeIndex].videoReview && (
                          <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-3 bg-gradient-primary text-white px-6 py-3 rounded-full weight-semibold shadow-lg hover:shadow-xl transition-all"
                          >
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                            <span>Смотреть видео отзыв</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Новая навигация */}
            <div className="flex items-center justify-center mt-8 space-x-8">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 flex items-center justify-center text-muted hover:text-primary hover:bg-white transition-all group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </motion.button>

              {/* Стильные индикаторы */}
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => {
                      setActiveIndex(index)
                      setIsAutoPlay(false)
                    }}
                    className={`relative transition-all duration-500 ${
                      index === activeIndex 
                        ? 'w-12 h-4 bg-gradient-primary rounded-full shadow-lg' 
                        : 'w-4 h-4 bg-primary-30 hover:bg-primary-50 rounded-full'
                    }`}
                  >
                    {index === activeIndex && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-gradient-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 flex items-center justify-center text-muted hover:text-primary hover:bg-white transition-all group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Улучшенные миниатюры отзывов */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveIndex(index)
                  setIsAutoPlay(false)
                }}
                className={`relative p-5 rounded-2xl transition-all duration-500 text-left group h-36 flex flex-col justify-between overflow-hidden ${
                  index === activeIndex
                    ? 'bg-gradient-to-br from-primary via-primary to-primary-dark text-white shadow-2xl transform scale-105'
                    : 'bg-white/70 backdrop-blur-sm hover:bg-white text-muted shadow-lg border border-white/60 hover:shadow-xl hover:border-primary-20'
                }`}
              >
                {/* Декоративные элементы для активной карточки */}
                {index === activeIndex && (
                  <>
                    <motion.div
                      layoutId="activeCard"
                      className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/10 rounded-full blur-sm"></div>
                  </>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  {/* Верхняя часть */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl overflow-hidden border-2 flex-shrink-0 shadow-lg ${
                      index === activeIndex ? 'border-white/40' : 'border-white/60'
                    }`}>
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
                    <div className="flex-1 min-w-0">
                      <div className={`text-body-sm weight-semibold truncate mb-1 ${
                        index === activeIndex ? 'text-white' : 'text-primary-dark'
                      }`}>
                        {testimonial.name}
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 fill-current ${
                            index === activeIndex ? 'text-warning' : 'text-warning'
                          }`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Нижняя часть */}
                  <div className="mt-auto">
                    <div className={`text-caption weight-medium truncate mb-2 ${
                      index === activeIndex ? 'text-white/90' : 'text-muted'
                    }`}>
                      {testimonial.project}
                    </div>
                    <div className={`text-caption weight-bold ${
                      index === activeIndex ? 'text-warning' : 'text-success'
                    }`}>
                      {testimonial.result}
                    </div>
                  </div>
                </div>

                {/* Видео индикатор */}
                {testimonial.videoReview && (
                  <motion.div
                    animate={index === activeIndex ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center shadow-lg ${
                      index === activeIndex ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary-10'
                    }`}
                  >
                    <Play className={`w-3.5 h-3.5 fill-current ${
                      index === activeIndex ? 'text-white' : 'text-primary'
                    }`} />
                  </motion.div>
                )}

                {/* Pulse эффект для активной карточки */}
                {index === activeIndex && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-primary rounded-2xl"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Улучшенная статистика с читаемостью */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: Users, number: '500+', label: 'Довольных клиентов', color: 'text-primary', bgColor: 'bg-primary-10', borderColor: 'border-primary-20' },
            { icon: Award, number: '15', label: 'Лет на рынке', color: 'text-primary-dark', bgColor: 'bg-primary-dark-10', borderColor: 'border-primary-dark-20' },
            { icon: CheckCircle, number: '98%', label: 'Клиентов возвращаются', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' },
            { icon: Star, number: '4.9', label: 'Средний рейтинг', color: 'text-warning', bgColor: 'bg-warning/10', borderColor: 'border-warning/20' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group cursor-pointer"
            >
              <div className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-3xl p-6 text-center bg-white/80 backdrop-blur-sm shadow-lg group-hover:shadow-2xl group-hover:bg-white transition-all duration-300`}>
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all duration-300 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  className={`text-4xl md:text-5xl weight-black mb-2 ${stat.color}`}
                >
                  {stat.number}
                </motion.div>
                <div className="text-body weight-semibold text-primary-dark leading-tight">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}