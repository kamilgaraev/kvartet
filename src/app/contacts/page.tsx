'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Star
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingAction from '../components/FloatingAction'
import ContactMap from '../components/ContactMap'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Адрес',
    content: 'г. Уфа, ул. Ленская, 128',
    description: 'Офис и производство',
    color: 'text-primary-dark'
  },
  {
    icon: Phone,
    title: 'Телефоны',
    content: '+7 (347) 123-45-67',
    description: 'Основной номер',
    color: 'text-primary'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@kvartett-ufa.ru',
    description: 'Для коммерческих предложений',
    color: 'text-warning-light'
  },
  {
    icon: Clock,
    title: 'Режим работы',
    content: 'Пн-Пт: 9:00-18:00',
    description: 'Сб: 10:00-16:00, Вс: выходной',
    color: 'text-success'
  }
]

export default function ContactsPage() {
  const [faqItems, setFaqItems] = useState<any[]>([])
  const [apiContacts, setApiContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    Promise.all([
      fetch('/api/faq').then(res => res.json()),
      fetch('/api/settings').then(res => res.json())
    ]).then(([faqData, settingsData]) => {
      if (Array.isArray(faqData)) setFaqItems(faqData)
      if (settingsData.contacts && Array.isArray(settingsData.contacts)) {
        setApiContacts(settingsData.contacts)
      }
      setLoading(false)
    }).catch((error) => {
      console.error('Failed to fetch data:', error)
      setLoading(false)
    })
  }, [])

  // Объединяем данные из API с дефолтными
  const finalContactInfo = apiContacts.length > 0 ? apiContacts.map(c => ({
    icon: c.icon === 'MapPin' ? MapPin : c.icon === 'Phone' ? Phone : c.icon === 'Mail' ? Mail : Clock,
    title: c.label,
    content: c.value,
    description: c.type,
    color: 'text-primary-dark'
  })) : contactInfo
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          serviceType: formData.service,
          type: 'CONTACT',
          source: 'contact_page'
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы')
      }

      const result = await response.json()
      console.log('Lead created:', result)
      
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-bg opacity-60"></div>

        <div className="relative hero-container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-full px-6 py-2 mb-8"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-caption weight-semibold text-primary-dark">Свяжитесь с нами</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-display-1 weight-bold text-primary-dark mb-8 leading-tight-kw"
            >
              Мы всегда{' '}
              <span className="relative inline-block">
                <span className="gradient-kvartett-text">на связи</span>
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
              Готовы обсудить ваш проект? Свяжитесь с нами любым удобным способом. Мы работаем в Уфе и по всей Республике Башкортостан
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section-padding-y bg-white">
        <div className="container-adaptive">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {finalContactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-gradient-bg rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg shadow-primary mx-auto mb-4`}
                >
                  <contact.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-title weight-bold text-primary-dark mb-2">{contact.title}</h3>
                <div className={`text-body-lg weight-semibold ${contact.color} mb-1`}>{contact.content}</div>
                <p className="text-body-sm text-primary-dark">{contact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formRef} className="section-padding-y bg-gradient-bg">
        <div className="container-adaptive">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-display-3 weight-bold text-primary-dark mb-3">Оставить заявку</h3>
                  <p className="text-body-lg text-primary-dark">Мы свяжемся с вами в течение часа</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-caption weight-medium text-primary-dark mb-2">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="Иван Петров"
                      />
                    </div>
                    <div>
                      <label className="block text-caption weight-medium text-primary-dark mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-caption weight-medium text-primary-dark mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder="ivan@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-caption weight-medium text-primary-dark mb-2">
                      Интересующая услуга
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    >
                      <option value="">Выберите услугу</option>
                      <option value="outdoor">Наружная реклама</option>
                      <option value="printing">Полиграфия</option>
                      <option value="interior">Интерьерная реклама</option>
                      <option value="branding">Брендинг</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-caption weight-medium text-primary-dark mb-2">
                      Сообщение
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                      placeholder="Опишите ваш проект..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl weight-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitted 
                        ? 'bg-success shadow-lg shadow-primary' 
                        : 'bg-gradient-primary hover:shadow-lg hover:shadow-primary'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Заявка отправлена!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Отправить заявку</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-sm text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="section-padding-y bg-white">
        <div className="container-adaptive">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Нужен быстрый ответ?
            </h2>
            <p className="text-body-xl text-primary-dark max-w-3xl mx-auto">
              Выберите наиболее удобный способ связи
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl border hover:shadow-lg transition-all duration-300"
              style={{ background: 'linear-gradient(to bottom right, var(--color-primary-10), var(--color-primary-05))', borderColor: 'var(--color-primary-10)' }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4"
                style={{ backgroundColor: 'var(--color-primary)', boxShadow: 'var(--shadow-primary)' }}
              >
                <Phone className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-title weight-bold text-primary-dark mb-3">Позвонить</h3>
              <p className="text-body text-primary-dark mb-4">Обсудим проект по телефону</p>
              <a
                href="tel:+73471234567"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark weight-medium transition-colors"
              >
                <span>+7 (347) 123-45-67</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl border hover:shadow-lg transition-all duration-300"
              style={{ background: 'linear-gradient(to bottom right, var(--color-primary-dark-10), var(--color-primary-dark-05))', borderColor: 'var(--color-primary-dark-10)' }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4"
                style={{ backgroundColor: 'var(--color-primary-dark)', boxShadow: 'var(--shadow-primary)' }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-title weight-bold text-primary-dark mb-3">WhatsApp</h3>
              <p className="text-body text-primary-dark mb-4">Быстрая переписка в мессенджере</p>
              <a
                href="https://wa.me/73471234567"
                className="inline-flex items-center space-x-2 text-primary-dark hover:text-primary weight-medium transition-colors"
              >
                <span>Написать в WhatsApp</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl border hover:shadow-lg transition-all duration-300"
              style={{ background: 'linear-gradient(to bottom right, var(--color-warning-light), var(--color-warning-light))', borderColor: 'var(--color-warning-light)' }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-2xl bg-warning-light flex items-center justify-center shadow-lg mx-auto mb-4"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-title weight-bold text-primary-dark mb-3">Email</h3>
              <p className="text-body text-primary-dark mb-4">Отправьте техническое задание</p>
              <a
                href="mailto:info@kvartett-ufa.ru"
                className="inline-flex items-center space-x-2 text-warning-light hover:text-warning weight-medium transition-colors"
              >
                <span>info@kvartett-ufa.ru</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-y bg-gradient-bg">
        <div className="container-adaptive">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6 leading-tight-kw">
              Частые вопросы
            </h2>
            <p className="text-body-xl text-primary-dark max-w-3xl mx-auto">
              Ответы на самые популярные вопросы наших клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Array.isArray(faqItems) && faqItems.length > 0 ? faqItems.map((faq, index) => (
              <motion.div
                key={faq.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-light"
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-xl gradient-kvartett flex items-center justify-center flex-shrink-0 shadow-lg"
                  >
                    <Star className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-title weight-bold text-primary-dark mb-4 leading-tight-kw group-hover:text-primary transition-colors">{faq.question}</h4>
                    <p className="text-body text-primary-dark leading-relaxed-kw">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-gray-600">FAQ скоро появится</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ContactMap />

      <Footer />
      <FloatingAction />
    </>
  )
}