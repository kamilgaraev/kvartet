'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Eye, 
  Filter, 
  Star,
  Zap,
  Award,
  TrendingUp,
  Play,
  Heart,
  Share2
} from 'lucide-react'

const portfolioItems = [
  {
    id: 1,
    title: 'Сеть магазинов "Продукты 24"',
    category: 'Наружная реклама',
    categoryColor: 'var(--color-primary)',
    image: '/api/placeholder/600/400',
    description: 'Комплексное оформление сети магазинов: световые короба, вывески, витринная реклама с использованием современных LED технологий',
    result: '+250% узнаваемости',
    budget: '450 000 ₽',
    duration: '3 дня',
    rating: 5,
    tags: ['Световые короба', 'Вывески', 'Витрины'],
    features: ['LED подсветка', '24/7 работа', 'Гарантия 3 года'],
    year: '2024'
  },
  {
    id: 2,
    title: 'Ресторан "Башкирская кухня"',
    category: 'Брендинг',
    categoryColor: 'var(--color-primary-dark)',
    image: '/api/placeholder/600/400',
    description: 'Разработка уникального фирменного стиля, отражающего национальные традиции с современным подходом',
    result: '+180% посещаемости',
    budget: '280 000 ₽',
    duration: '5 дней',
    rating: 5,
    tags: ['Логотип', 'Фирмстиль', 'Меню'],
    features: ['Уникальный дизайн', 'Национальные мотивы', 'Полиграфия'],
    year: '2024'
  },
  {
    id: 3,
    title: 'Строительная компания "СтройДом"',
    category: 'Полиграфия',
    categoryColor: 'var(--color-primary-light)',
    image: '/api/placeholder/600/400',
    description: 'Производство презентационных материалов премиум-класса для участия в крупнейшей строительной выставке',
    result: '+320% лидов',
    budget: '95 000 ₽',
    duration: '2 дня',
    rating: 5,
    tags: ['Каталоги', 'Листовки', 'Презентации'],
    features: ['Премиум качество', 'Срочное производство', 'Дизайн в подарок'],
    year: '2023'
  },
  {
    id: 4,
    title: 'Автосалон "Драйв"',
    category: 'Интерьерная реклама',
    categoryColor: 'var(--color-primary)',
    image: '/api/placeholder/600/400',
    description: 'Создание современного торгового пространства с навигационной системой и POS-материалами',
    result: '+200% продаж',
    budget: '320 000 ₽',
    duration: '4 дня',
    rating: 5,
    tags: ['Стенды', 'Навигация', 'POS-материалы'],
    features: ['Интерактивные элементы', 'Модульная система', 'Легкий монтаж'],
    year: '2024'
  },
  {
    id: 5,
    title: 'Медицинский центр "Здоровье+"',
    category: 'Комплексное решение',
    categoryColor: 'var(--color-primary-dark)',
    image: '/api/placeholder/600/400',
    description: 'Полное рекламное сопровождение медицинского центра от концепции до финальной реализации',
    result: '+400% клиентов',
    budget: '850 000 ₽',
    duration: '7 дней',
    rating: 5,
    tags: ['Вывеска', 'Интерьер', 'Навигация'],
    features: ['Медицинские стандарты', 'Полный цикл', 'Гарантийное обслуживание'],
    year: '2024'
  },
  {
    id: 6,
    title: 'ТЦ "Мегаполис"',
    category: 'Наружная реклама',
    categoryColor: 'var(--color-primary)',
    image: '/api/placeholder/600/400',
    description: 'Комплексное оформление фасада торгового центра с интерактивными LED-экранами',
    result: '+300% трафика',
    budget: '1 200 000 ₽',
    duration: '10 дней',
    rating: 5,
    tags: ['LED-экраны', 'Фасадное оформление', 'Интерактив'],
    features: ['Smart управление', 'Энергоэффективность', 'Удаленный мониторинг'],
    year: '2024'
  }
]

const categories = [
  { name: 'Все проекты', value: 'all', color: 'var(--color-muted)' },
  { name: 'Наружная реклама', value: 'Наружная реклама', color: 'var(--color-primary)' },
  { name: 'Брендинг', value: 'Брендинг', color: 'var(--color-primary-dark)' },
  { name: 'Полиграфия', value: 'Полиграфия', color: 'var(--color-primary-light)' },
  { name: 'Интерьерная реклама', value: 'Интерьерная реклама', color: 'var(--color-primary)' },
  { name: 'Комплексное решение', value: 'Комплексное решение', color: 'var(--color-primary-dark)' }
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid')
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 0.6
      }
    }
  }

  return (
    <section className="section-padding-y bg-gradient-bg relative overflow-hidden" ref={ref}>
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-05 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-dark-05 rounded-full blur-3xl"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[70rem] border border-gray-200/20 rounded-full"
        />
      </div>

      <div className="relative container-adaptive">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-10 to-primary-dark-10 rounded-full px-6 py-2 mb-6"
          >
            <Award className="w-5 h-5 text-primary-dark" />
            <span className="text-body-sm weight-semibold text-gray-700">Наши работы</span>
          </motion.div>

          <h2 className="text-display-2 text-gray-900 mb-6 leading-tight-kw weight-bold">
            Портфолио{' '}
            <span className="relative inline-block">
              <span className="gradient-kvartett-text">проектов</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary opacity-30 rounded-full"
              />
            </span>
          </h2>
          <p className="text-body-xl text-gray-600 max-w-3xl mx-auto leading-relaxed-kw">
            500+ успешных проектов в Уфе и Республике Башкортостан. От идеи до воплощения.
          </p>
        </motion.div>

        {/* Фильтры и управление */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-6 lg:space-y-0"
        >
          {/* Фильтры категорий */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.value)}
                className={`relative px-6 py-3 rounded-2xl weight-semibold text-body-sm transition-all duration-300 overflow-hidden ${
                  activeCategory === category.value
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:text-gray-800'
                }`}
                style={{
                  backgroundColor: activeCategory === category.value ? category.color : undefined
                }}
              >
                {activeCategory === category.value && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-2xl"
                    style={{ backgroundColor: category.color }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>{category.name}</span>
                </span>
              </motion.button>
            ))}
          </div>

          {/* Переключатель вида */}
          <div className="flex items-center space-x-3">
            <span className="text-body-sm text-gray-600">Показано проектов:</span>
            <motion.div
              key={activeCategory}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-full weight-bold text-body-sm"
            >
              {filteredItems.length}
            </motion.div>
          </div>
        </motion.div>

        {/* Сетка проектов */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
                             <motion.div
                 key={item.id}
                 layout
                 variants={cardVariants}
                 initial="hidden"
                 animate="visible"
                 exit="hidden"
                 whileHover={{ 
                   y: -10, 
                   scale: 1.02,
                   rotateY: 5,
                   rotateX: 5
                 }}
                 onMouseEnter={() => setHoveredCard(item.id)}
                 onMouseLeave={() => setHoveredCard(null)}
                 className="group perspective-1000 cursor-pointer relative"
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 {/* Популярный бейдж - поверх всего */}
                 {item.rating === 5 && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0, rotate: -12 }}
                     animate={{ opacity: 1, scale: 1, rotate: -12 }}
                     className="absolute -top-2 -right-2 z-50 bg-gradient-to-r from-warning to-warning-dark text-white px-3 py-1 rounded-full text-caption weight-bold flex items-center space-x-1 shadow-xl border-2 border-white"
                   >
                     <Star className="w-3 h-3 fill-current" />
                     <span>ТОП</span>
                   </motion.div>
                 )}

                 <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-500 preserve-3d h-full flex flex-col">

                  {/* Изображение проекта */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Градиентный фон */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${item.categoryColor}20, ${item.categoryColor}40)`
                      }}
                    />
                    
                    {/* Декоративные элементы */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          scale: hoveredCard === item.id ? [1, 1.2, 1] : 1,
                          rotate: hoveredCard === item.id ? [0, 180, 360] : 0
                        }}
                        transition={{ duration: 1, repeat: hoveredCard === item.id ? Infinity : 0 }}
                        className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <Eye className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>

                    {/* Плавающие иконки */}
                    <motion.div
                      animate={{ 
                        y: hoveredCard === item.id ? [0, -10, 0] : 0,
                        opacity: hoveredCard === item.id ? 1 : 0.7
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <Zap className="w-4 h-4 text-white" />
                    </motion.div>

                    <motion.div
                      animate={{ 
                        y: hoveredCard === item.id ? [0, 10, 0] : 0,
                        opacity: hoveredCard === item.id ? 1 : 0.7
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <TrendingUp className="w-4 h-4 text-white" />
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === item.id ? 1 : 0 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                    >
                      <div className="text-center space-y-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white text-gray-900 px-6 py-3 rounded-2xl weight-semibold flex items-center space-x-2 mx-auto shadow-xl"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Смотреть проект</span>
                        </motion.button>
                        <div className="flex items-center space-x-4 text-white">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                          >
                            <Heart className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                          >
                            <Share2 className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                          >
                            <Play className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                                     {/* Контент карточки */}
                   <div className="p-6 space-y-4 flex-1 flex flex-col">
                    {/* Заголовок и категория */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-body-sm weight-semibold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${item.categoryColor}15`,
                            color: item.categoryColor
                          }}
                        >
                          {item.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.8 + i * 0.1 }}
                            >
                              <Star className="w-4 h-4 text-warning fill-current" />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                                             <h3 className="text-title weight-bold text-gray-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                         {item.title}
                       </h3>
                    </div>

                                         {/* Описание */}
                     <div className="flex-1 min-h-0">
                       <p className="text-gray-600 text-body-sm leading-relaxed-kw line-clamp-2 overflow-hidden">
                         {item.description}
                       </p>
                     </div>

                                         {/* Метрики проекта */}
                     <div className="grid grid-cols-3 gap-2">
                       <div className="text-center p-2 bg-success/10 rounded-lg">
                <div className="text-body-sm weight-bold text-success truncate">{item.result}</div>
                         <div className="text-caption text-gray-600">Результат</div>
                       </div>
                       <div className="text-center p-2 bg-primary/10 rounded-lg">
                <div className="text-body-sm weight-bold text-primary truncate">{item.duration}</div>
                         <div className="text-caption text-gray-600">Срок</div>
                       </div>
                       <div className="text-center p-2 bg-primary-dark/10 rounded-lg">
                <div className="text-body-sm weight-bold text-primary-dark truncate">{item.year}</div>
                         <div className="text-caption text-gray-600">Год</div>
                       </div>
                     </div>

                                         {/* Фичи проекта */}
                     <div className="space-y-2">
                       <h4 className="text-body-sm weight-semibold text-gray-800">Особенности:</h4>
                       <div className="flex flex-wrap gap-1">
                         {item.features.slice(0, 3).map((feature) => (
                           <span 
                             key={feature}
                             className="text-caption bg-gray-100 text-gray-600 px-2 py-1 rounded-lg truncate"
                           >
                             {feature}
                           </span>
                         ))}
                         {item.features.length > 3 && (
                           <span className="text-caption text-gray-500">+{item.features.length - 3}</span>
                         )}
                       </div>
                     </div>

                                         {/* Бюджет */}
                     <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                       <span className="text-body-sm text-gray-600">Бюджет проекта:</span>
                       <span className="text-title weight-bold text-gray-900">{item.budget}</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-primary/10 via-primary-dark/10 to-warning/10 rounded-3xl p-12 border border-white/20 backdrop-blur-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>
          
          <h3 className="text-display-3 weight-bold text-gray-900 mb-4">
            Готовы создать <span className="gradient-kvartett-text">ваш проект?</span>
          </h3>
          <p className="text-body-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к 500+ довольным клиентам. Получите бесплатную консультацию и расчет стоимости.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl weight-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              <span>Смотреть всё портфолио</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl border border-gray-200 hover:border-primary hover:text-primary transition-all duration-300 weight-semibold flex items-center justify-center space-x-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Рассчитать проект</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}