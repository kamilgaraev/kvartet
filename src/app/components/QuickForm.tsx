'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Phone, User, MessageCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Укажите корректный номер телефона'),
  service: z.string().min(1, 'Выберите услугу'),
  message: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

const services = [
  'Наружная реклама',
  'Полиграфия', 
  'Интерьерная реклама',
  'Брендинг',
  'Консультация'
]

export default function QuickForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form data:', data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      reset()
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <section className="section-padding-y bg-gradient-bg relative overflow-hidden" ref={ref}>
      {/* Фоновые элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-dark-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container-adaptive">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая часть - информация */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-primary-dark space-y-8"
          >
            <div>
              <h2 className="text-display-3 weight-bold mb-4">
                Готовы начать <span className="gradient-kvartett-text">проект?</span>
              </h2>
              <p className="text-body-xl text-muted leading-relaxed-kw">
                Оставьте заявку и получите персональное предложение в течение 30 минут
              </p>
            </div>

            {/* Преимущества */}
            <div className="space-y-4">
              {[
                'Бесплатная консультация и расчет',
                'Выезд дизайнера на объект',
                'Гарантия на все виды работ',
                'Собственное производство'
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Контакты */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted">
                <Phone className="w-5 h-5 text-primary" />
                <span>+7 (347) 123-45-67</span>
              </div>
              <div className="text-caption text-muted">
                г. Уфа, ул. Ленская, 128
              </div>
            </div>
          </motion.div>

          {/* Правая часть - форма */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-title-lg weight-bold text-gray-900 mb-2">
                  Спасибо за заявку!
                </h3>
                  <p className="text-body text-gray-600">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <h3 className="text-title-lg weight-bold text-gray-900 mb-2">
                    Быстрая заявка
                  </h3>
                  <p className="text-body text-gray-600">
                    Заполните форму и мы рассчитаем стоимость
                  </p>
                </div>

                {/* Имя */}
                <div>
                  <label className="block text-body-sm weight-medium text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Введите ваше имя"
                      className="w-full pl-10 pr-4 py-3 border border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-caption text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Телефон */}
                <div>
                  <label className="block text-body-sm weight-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full pl-10 pr-4 py-3 border border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-caption text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Услуга */}
                <div>
                  <label className="block text-body-sm weight-medium text-gray-700 mb-2">
                    Интересующая услуга *
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Выберите услугу</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-caption text-red-600">{errors.service.message}</p>
                  )}
                </div>

                {/* Сообщение */}
                <div>
                  <label className="block text-body-sm weight-medium text-gray-700 mb-2">
                    Дополнительная информация
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      {...register('message')}
                      rows={3}
                      placeholder="Опишите ваш проект..."
                      className="w-full pl-10 pr-4 py-3 border border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Кнопка отправки */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary-dark transition-colors weight-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Отправить заявку</span>
                    </>
                  )}
                </button>

                <p className="text-caption text-gray-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}