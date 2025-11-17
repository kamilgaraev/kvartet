'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Building,
  FileText,
  Home,
  Palette,
  Send,
  Phone,
  Mail,
  Zap,
  Star,
  Eye
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingAction from '../components/FloatingAction'

const services = [
  {
    id: 'outdoor',
    name: 'Наружная реклама',
    icon: Building,
    options: [
      { id: 'lightbox', name: 'Световые короба', basePrice: 25000, unit: 'шт' },
      { id: 'letters', name: 'Объемные буквы', basePrice: 2500, unit: 'буква' },
      { id: 'banner', name: 'Баннеры', basePrice: 350, unit: 'м²' },
      { id: 'billboard', name: 'Билборды', basePrice: 150000, unit: 'шт' }
    ]
  },
  {
    id: 'printing',
    name: 'Полиграфия',
    icon: FileText,
    options: [
      { id: 'business-cards', name: 'Визитки', basePrice: 500, unit: '1000 шт' },
      { id: 'leaflets', name: 'Листовки A4', basePrice: 800, unit: '1000 шт' },
      { id: 'catalogs', name: 'Каталоги', basePrice: 2500, unit: '100 шт' },
      { id: 'wide-format', name: 'Широкоформатная печать', basePrice: 400, unit: 'м²' }
    ]
  },
  {
    id: 'interior',
    name: 'Интерьерная реклама',
    icon: Home,
    options: [
      { id: 'navigation', name: 'Навигация', basePrice: 8000, unit: 'шт' },
      { id: 'stands', name: 'Стенды', basePrice: 12000, unit: 'шт' },
      { id: 'light-panels', name: 'Световые панели', basePrice: 18000, unit: 'шт' },
      { id: 'pos', name: 'POS-материалы', basePrice: 3000, unit: 'комплект' }
    ]
  },
  {
    id: 'branding',
    name: 'Брендинг',
    icon: Palette,
    options: [
      { id: 'logo', name: 'Логотип', basePrice: 25000, unit: 'проект' },
      { id: 'brandbook', name: 'Брендбук', basePrice: 75000, unit: 'проект' },
      { id: 'corporate', name: 'Корпоративная полиграфия', basePrice: 35000, unit: 'комплект' },
      { id: 'packaging', name: 'Дизайн упаковки', basePrice: 45000, unit: 'проект' }
    ]
  }
]

const additionalOptions = [
  { id: 'design', name: 'Дизайн-проект', price: 15000 },
  { id: 'installation', name: 'Монтаж', price: 5000 },
  { id: 'delivery', name: 'Доставка по городу', price: 2000 },
  { id: 'urgent', name: 'Срочное изготовление', multiplier: 1.5 }
]

interface CalculatorState {
  step: number
  selectedService: string
  selectedOption: string
  quantity: number
  additionalServices: string[]
  contactInfo: {
    name: string
    phone: string
    email: string
    message: string
  }
  totalPrice: number
}

export default function CalculatorPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [calculator, setCalculator] = useState<CalculatorState>({
    step: 1,
    selectedService: '',
    selectedOption: '',
    quantity: 1,
    additionalServices: [],
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      message: ''
    },
    totalPrice: 0
  })

  const calculatePrice = () => {
    if (!calculator.selectedService || !calculator.selectedOption) return 0
    
    const service = services.find(s => s.id === calculator.selectedService)
    const option = service?.options.find(o => o.id === calculator.selectedOption)
    
    if (!option) return 0
    
    let basePrice = option.basePrice * calculator.quantity
    
    // Добавляем дополнительные услуги
    calculator.additionalServices.forEach(serviceId => {
      const additionalService = additionalOptions.find(s => s.id === serviceId)
      if (additionalService) {
        if (additionalService.multiplier) {
          basePrice *= additionalService.multiplier
        } else if (additionalService.price) {
          basePrice += additionalService.price
        }
      }
    })
    
    return Math.round(basePrice)
  }

  const nextStep = () => {
    const newPrice = calculatePrice()
    setCalculator(prev => ({
      ...prev,
      step: prev.step + 1,
      totalPrice: newPrice
    }))
  }

  const prevStep = () => {
    setCalculator(prev => ({
      ...prev,
      step: prev.step - 1
    }))
  }

  const selectService = (serviceId: string) => {
    setCalculator(prev => ({
      ...prev,
      selectedService: serviceId,
      selectedOption: '',
      quantity: 1
    }))
  }

  const selectOption = (optionId: string) => {
    setCalculator(prev => ({
      ...prev,
      selectedOption: optionId
    }))
  }

  const updateQuantity = (quantity: number) => {
    setCalculator(prev => ({
      ...prev,
      quantity: Math.max(1, quantity)
    }))
  }

  const toggleAdditionalService = (serviceId: string) => {
    setCalculator(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }))
  }

  const updateContactInfo = (field: string, value: string) => {
    setCalculator(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }))
  }

  const submitCalculation = () => {
    setIsSubmitted(true)
    // Здесь отправка данных на сервер
    console.log('Calculation submitted:', calculator)
  }

  const renderStep = () => {
    switch (calculator.step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
          >
            <h3 className="text-title weight-bold text-primary-dark mb-6">Выберите тип услуги</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectService(service.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    calculator.selectedService === service.id
                      ? 'border-primary bg-primary/5'
                      : 'border-light hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      calculator.selectedService === service.id
                        ? 'bg-primary text-white'
                        : 'bg-primary-10 text-muted'
                    }`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-body-lg weight-semibold text-primary-dark">{service.name}</h4>
                      <p className="text-caption text-muted">{service.options.length} услуг</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 2:
        const selectedService = services.find(s => s.id === calculator.selectedService)
        return (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
          >
            <h3 className="text-title weight-bold text-primary-dark mb-6">
              Выберите конкретную услугу
            </h3>
            <div className="grid gap-4">
              {selectedService?.options.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => selectOption(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    calculator.selectedOption === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-light hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-body-lg weight-semibold text-primary-dark">{option.name}</h4>
                      <p className="text-caption text-muted">от {option.basePrice.toLocaleString()} ₽ за {option.unit}</p>
                    </div>
                    {calculator.selectedOption === option.id && (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 3:
        const selectedOption = services
          .find(s => s.id === calculator.selectedService)
          ?.options.find(o => o.id === calculator.selectedOption)
        
        return (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
          >
            <h3 className="text-title weight-bold text-primary-dark mb-6">Укажите количество</h3>
            
            <div className="bg-primary-bg p-6 rounded-2xl">
              <div className="text-body-lg weight-semibold text-primary-dark mb-4">
                {selectedOption?.name}
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-muted">Количество:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(calculator.quantity - 1)}
                    className="w-10 h-10 rounded-lg bg-card border border-light hover:border-primary flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={calculator.quantity}
                    onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 h-10 text-center border border-light rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={() => updateQuantity(calculator.quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-card border border-light hover:border-primary flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="text-muted">{selectedOption?.unit}</span>
                </div>
              </div>
              
              <div className="text-body-lg weight-bold text-primary">
                Базовая стоимость: {((selectedOption?.basePrice || 0) * calculator.quantity).toLocaleString()} ₽
              </div>
            </div>

            <div>
              <h4 className="text-body-lg weight-semibold text-primary-dark mb-4">Дополнительные услуги</h4>
              <div className="space-y-3">
                {additionalOptions.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-light hover:border-primary/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={calculator.additionalServices.includes(service.id)}
                      onChange={() => toggleAdditionalService(service.id)}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="weight-medium text-primary-dark">{service.name}</div>
                      <div className="text-caption text-muted">
                        {service.price ? `+${service.price.toLocaleString()} ₽` : 
                         service.multiplier ? `×${service.multiplier}` : ''}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
          >
            <h3 className="text-title weight-bold text-primary-dark mb-6">Ваши контактные данные</h3>
            
            {/* Расчет */}
            <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(to right, var(--color-primary-10), var(--color-primary-dark-10))', border: '1px solid var(--color-primary-20)' }}>
              <h4 className="text-body-lg weight-semibold text-primary-dark mb-4">Итоговый расчет</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted">Услуга:</span>
                  <span className="weight-medium">
                    {services.find(s => s.id === calculator.selectedService)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Тип:</span>
                  <span className="weight-medium">
                    {services.find(s => s.id === calculator.selectedService)
                      ?.options.find(o => o.id === calculator.selectedOption)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Количество:</span>
                  <span className="weight-medium">{calculator.quantity}</span>
                </div>
                {calculator.additionalServices.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Доп. услуги:</span>
                    <span className="weight-medium">{calculator.additionalServices.length}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-light pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-body-lg weight-bold text-primary-dark">Итого:</span>
                  <span className="text-title weight-bold text-primary">
                    {calculatePrice().toLocaleString()} ₽
                  </span>
                </div>
                <p className="text-caption text-muted mt-2">
                  * Точная стоимость будет рассчитана после консультации
                </p>
              </div>
            </div>

            {/* Форма контактов */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-caption weight-medium text-muted mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={calculator.contactInfo.name}
                    onChange={(e) => updateContactInfo('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-light focus:border-primary focus:ring-2 focus:ring-primary-20 transition-all duration-300"
                    placeholder="Иван Петров"
                  />
                </div>
                <div>
                  <label className="block text-caption weight-medium text-muted mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={calculator.contactInfo.phone}
                    onChange={(e) => updateContactInfo('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-light focus:border-primary focus:ring-2 focus:ring-primary-20 transition-all duration-300"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-caption weight-medium text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={calculator.contactInfo.email}
                  onChange={(e) => updateContactInfo('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-light focus:border-primary focus:ring-2 focus:ring-primary-20 transition-all duration-300"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block text-caption weight-medium text-muted mb-2">
                  Дополнительные пожелания
                </label>
                <textarea
                  rows={3}
                  value={calculator.contactInfo.message}
                  onChange={(e) => updateContactInfo('message', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-light focus:border-primary focus:ring-2 focus:ring-primary-20 transition-all duration-300 resize-none"
                  placeholder="Расскажите о ваших требованиях..."
                />
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (calculator.step) {
      case 1:
        return calculator.selectedService !== ''
      case 2:
        return calculator.selectedOption !== ''
      case 3:
        return calculator.quantity > 0
      case 4:
        return calculator.contactInfo.name && calculator.contactInfo.phone
      default:
        return false
    }
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-primary-05)' }}></div>
          <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-primary-dark-05)' }}></div>
        </div>

        <div className="relative container-adaptive">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-full px-6 py-2 mb-8"
            >
              <Calculator className="w-5 h-5 text-primary" />
              <span className="text-caption weight-semibold text-muted">Калькулятор стоимости</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-display-1 weight-bold text-on-dark mb-8"
            >
              Рассчитайте{' '}
              <span className="relative inline-block">
                <span className="gradient-kvartett-text">стоимость</span>
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
              className="text-body-xl text-on-dark-muted mb-12 max-w-3xl mx-auto leading-relaxed-kw"
            >
              Узнайте примерную стоимость рекламных услуг за 2 минуты. Пошаговый расчет с учетом всех ваших требований
            </motion.p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding-y bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isSubmitted ? (
            <>
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-caption weight-medium text-gray-500">
                    Шаг {calculator.step} из 4
                  </span>
                  <span className="text-caption weight-medium text-primary">
                    {Math.round((calculator.step / 4) * 100)}% завершено
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(calculator.step / 4) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-primary h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Calculator Steps */}
              <div className="bg-card rounded-2xl border border-light p-8 shadow-lg">
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-light">
                  <motion.button
                    onClick={prevStep}
                    disabled={calculator.step === 1}
                    whileHover={{ scale: calculator.step === 1 ? 1 : 1.02 }}
                    whileTap={{ scale: calculator.step === 1 ? 1 : 0.98 }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl weight-medium transition-all duration-300 ${
                      calculator.step === 1
                        ? 'bg-primary-10 text-gray-400 cursor-not-allowed'
                        : 'bg-primary-10 text-muted hover:bg-gray-200'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Назад</span>
                  </motion.button>

                  {calculator.step < 4 ? (
                    <motion.button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                      whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl weight-medium transition-all duration-300 ${
                        canProceed()
                          ? 'bg-gradient-primary text-white hover:shadow-lg'
                          : 'bg-primary-10 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Далее</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={submitCalculation}
                      disabled={!canProceed()}
                      whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                      whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl weight-medium transition-all duration-300 ${
                        canProceed()
                          ? 'bg-gradient-primary text-white hover:shadow-lg'
                          : 'bg-primary-10 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                      <span>Получить расчет</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-success flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-title-lg weight-bold text-primary-dark mb-4">
                Расчет отправлен!
              </h2>
              <p className="text-body-xl text-muted mb-8 max-w-2xl mx-auto leading-relaxed-kw">
                Наш менеджер свяжется с вами в течение часа для уточнения деталей и предоставления точного коммерческого предложения
              </p>
              
              <div className="p-6 rounded-2xl mb-8" style={{ background: 'linear-gradient(to right, var(--color-primary-10), var(--color-primary-dark-10))' }}>
                <div className="text-title weight-bold text-primary mb-2">
                  Примерная стоимость: {calculator.totalPrice.toLocaleString()} ₽
                </div>
                <p className="text-muted">
                  Окончательная цена может отличаться после консультации
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+73471234567"
                className="group bg-gradient-primary text-white px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>Позвонить сейчас</span>
                </a>
                
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setCalculator({
                      step: 1,
                      selectedService: '',
                      selectedOption: '',
                      quantity: 1,
                      additionalServices: [],
                      contactInfo: { name: '', phone: '', email: '', message: '' },
                      totalPrice: 0
                    })
                  }}
                className="group bg-card/80 backdrop-blur-sm text-muted px-8 py-4 rounded-2xl border border-light/50 hover:border-primary/50 hover:text-primary transition-all duration-300 weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Новый расчет</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="section-padding-y bg-gradient-bg">
        <div className="container-adaptive">
          <div className="text-center mb-16">
            <h2 className="text-display-2 weight-bold text-primary-dark mb-6">
              Преимущества нашего калькулятора
            </h2>
            <p className="text-body-xl text-muted max-w-3xl mx-auto leading-relaxed-kw">
              Быстро, удобно и точно
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Быстрый расчет',
                description: 'Узнайте примерную стоимость за 2 минуты'
              },
              {
                icon: Star,
                title: 'Точные цены',
                description: 'Актуальные цены с учетом всех опций'
              },
              {
                icon: Eye,
                title: 'Прозрачность',
                description: 'Видите из чего складывается итоговая стоимость'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl gradient-kvartett flex items-center justify-center shadow-lg shadow-primary-25 mx-auto mb-4"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-body-lg weight-bold text-primary-dark mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingAction />
    </>
  )
} 