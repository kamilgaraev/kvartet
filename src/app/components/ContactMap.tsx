'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Car,
  MessageCircle,
  ExternalLink
} from 'lucide-react'

export default function ContactMap() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-16 md:py-20 bg-gradient-bg" ref={ref}>
      <div className="container-adaptive">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-3 text-primary-dark mb-4 weight-bold">
            Как нас <span className="gradient-kvartett-text">найти</span>
          </h2>
          <p className="text-body-xl text-muted max-w-2xl mx-auto">
            Приезжайте к нам в офис или вызовите специалиста на объект
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Левая часть - контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Адрес */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-light">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-title weight-bold text-primary-dark mb-2">Наш офис</h3>
                  <p className="text-body text-muted mb-2">г. Уфа, ул. Ленская, 128</p>
                  <p className="text-caption text-muted">
                    Центральный район, рядом с остановкой "Ленская"
                  </p>
                  <button className="mt-3 text-primary hover:text-primary-dark transition-colors flex items-center space-x-1 text-body-sm weight-medium">
                    <ExternalLink className="w-4 h-4" />
                    <span>Построить маршрут</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Телефоны */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-light">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-dark-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="text-title weight-bold text-primary-dark mb-2">Телефоны</h3>
                  <div className="space-y-2">
                    <p className="text-body text-primary-dark weight-medium">+7 (347) 123-45-67</p>
                    <p className="text-body text-muted">+7 (347) 123-45-68</p>
                    <p className="text-caption text-muted">Звоните с 9:00 до 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email и мессенджеры */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-light">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-light-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-light" />
                </div>
                <div className="flex-1">
                  <h3 className="text-title weight-bold text-primary-dark mb-2">Онлайн связь</h3>
                  <div className="space-y-3">
                    <p className="text-body text-muted">info@kvartett-ufa.ru</p>
                    <div className="flex space-x-3">
                      <button className="bg-success text-white px-4 py-2 rounded-lg text-body-sm weight-medium hover:bg-success-dark transition-colors flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </button>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg text-body-sm weight-medium hover:bg-primary-dark transition-colors">
                        Telegram
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Время работы */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-light">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-title weight-bold text-primary-dark mb-3">Время работы</h3>
                  <div className="space-y-2 text-caption">
                    <div className="flex justify-between">
                      <span className="text-muted">Пн - Пт:</span>
                      <span className="text-primary-dark weight-medium">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Суббота:</span>
                      <span className="text-primary-dark weight-medium">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Воскресенье:</span>
                      <span className="text-muted opacity-70">Выходной</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Парковка */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-light">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-title weight-bold text-primary-dark mb-2">Парковка</h3>
                  <p className="text-body text-muted">
                    Бесплатная парковка рядом с офисом. 
                    Удобный подъезд для загрузки материалов.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Правая часть - карта */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Карта */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-light h-96">
              <div className="w-full h-full bg-gradient-to-br from-primary-10 via-primary-20 to-primary-30 flex items-center justify-center relative">
                {/* Здесь будет интеграция с картами */}
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-primary mx-auto" />
                  <div>
                    <h3 className="text-title weight-bold text-primary-dark mb-2">
                      Интерактивная карта
                    </h3>
                    <p className="text-body text-muted max-w-xs">
                      г. Уфа, ул. Ленская, 128<br />
                      Производственно-рекламная группа "Квартет"
                    </p>
                  </div>
                </div>
                
                {/* Маркер на карте */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-primary-dark rounded-full shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* CTA блоки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="bg-primary text-white p-6 rounded-xl hover:bg-primary-dark transition-colors text-left group">
                <Phone className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-title weight-bold mb-1">Заказать звонок</h3>
                <p className="text-caption text-white/90">Перезвоним за 5 минут</p>
              </button>

              <button className="bg-primary-dark text-white p-6 rounded-xl hover:bg-accent transition-colors text-left group">
                <Car className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-title weight-bold mb-1">Выезд на объект</h3>
                <p className="text-caption text-white/90">Бесплатный замер</p>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}