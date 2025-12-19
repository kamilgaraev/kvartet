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
                  <p className="text-body text-muted mb-2">г. Уфа, ул. Ленская, 128/1</p>
                  <p className="text-caption text-muted">
                    ООО Производственно-рекламная группа "Карандаш"
                  </p>
                  <a 
                    href="https://yandex.ru/maps/?pt=55.911,54.728&z=17&l=map" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-primary hover:text-primary-dark transition-colors flex items-center space-x-1 text-body-sm weight-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Построить маршрут</span>
                  </a>
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
                    <a href="tel:+73472855596" className="text-body text-primary-dark weight-medium hover:text-primary transition-colors block">
                      +7 (347) 285-55-96
                    </a>
                    <a href="tel:+79173739307" className="text-body text-muted hover:text-primary-dark transition-colors block">
                      +7 (917) 373-93-07
                    </a>
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
                    <a href="mailto:kvartet-reklama@mail.ru" className="text-body text-muted hover:text-primary transition-colors block">
                      kvartet-reklama@mail.ru
                    </a>
                    <div className="flex space-x-3">
                      <a 
                        href="https://wa.me/79173739307" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-success text-white px-4 py-2 rounded-lg text-body-sm weight-medium hover:bg-success-dark transition-colors flex items-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                      <a 
                        href="https://t.me/reklama_kvartet" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white px-4 py-2 rounded-lg text-body-sm weight-medium hover:bg-primary-dark transition-colors"
                      >
                        Telegram
                      </a>
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
            {/* Яндекс.Карта */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-light h-[500px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=55.979954%2C54.725098&z=17&l=map&pt=55.979954,54.725098,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта офиса РА Квартет - г. Уфа, ул. Ленская, 128/1"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
              />
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