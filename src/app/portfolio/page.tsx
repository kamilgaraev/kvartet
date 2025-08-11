'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Eye, 
  Star, 
  Building,
  FileText,
  Home,
  Palette,
  TrendingUp,
  CheckCircle,
  Calendar,
  ArrowRight,
  Filter,
  Search,
  Award
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingAction from '../components/FloatingAction'

const baseCategoriesConfig = [
  { id: 'all', name: 'Все проекты' },
  { id: 'advertising', name: 'Наружная реклама', icon: Building },
  { id: 'print', name: 'Полиграфия', icon: FileText },
  { id: 'web', name: 'Веб-дизайн', icon: Home },
  { id: 'branding', name: 'Брендинг', icon: Palette }
]

interface PortfolioItem {
  id: string
  title: string
  slug: string
  description: string
  category: string
  categoryName?: string
  categoryColor?: string
  image?: string
  gallery: string[]
  budget?: string
  duration?: string
  year?: number
  clientName?: string
  rating: number
  features: string[]
  result?: string
  popular: boolean
  tags: string[]
  clientWebsite?: string
}

export default function PortfolioPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [portfolioRef, portfolioInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  // Динамический подсчет категорий
  const categories = baseCategoriesConfig.map(config => {
    if (config.id === 'all') {
      return { ...config, count: portfolioItems.length }
    }
    const count = portfolioItems.filter(item => item.category === config.id).length
    return { ...config, count }
  }) as Array<{ id: string; name: string; icon?: any; count: number }>

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio')
      if (response.ok) {
        const data = await response.json()
        const transformedItems = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          category: item.category,
          categoryName: getCategoryName(item.category),
          categoryColor: getCategoryColor(item.category),
          image: item.image || item.gallery?.[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
          gallery: item.gallery || [],
          budget: item.budget,
          duration: item.duration,
          year: item.year,
          clientName: item.clientName,
          rating: item.rating || 5,
          features: item.features || [],
          result: item.result,
          popular: item.popular,
          tags: item.tags || [],
          clientWebsite: item.clientWebsite
        }))
        setPortfolioItems(transformedItems)
      }
    } catch (error) {
      console.error('Ошибка загрузки портфолио:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      advertising: 'Наружная реклама',
      branding: 'Брендинг',
      print: 'Полиграфия',
      web: 'Веб-дизайн'
    }
    return categoryMap[category] || 'Реклама'
  }

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      advertising: 'bg-primary',
      branding: 'bg-warning',
      print: 'bg-success',
      web: 'bg-purple-500'
    }
    return colorMap[category] || 'bg-gray-500'
  }

  const filteredItems = portfolioItems.filter((item: PortfolioItem) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-dark/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative hero-container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-full px-6 py-2 mb-8"
            >
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-gray-700">Наши работы</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8"
            >
              Портфолио{' '}
              <span className="relative inline-block">
                <span className="gradient-kvartett-text">проектов</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-primary-dark opacity-30 rounded-full"
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Более 500 успешных проектов для различных сфер бизнеса. Каждая работа — это уникальное решение, созданное с душой и профессионализмом
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto"
            >
              {[
                { label: 'Проектов', value: '500+' },
                { label: 'Клиентов', value: '200+' },
                { label: 'Лет опыта', value: '15+' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="hero-container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск проектов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.icon && <category.icon className="w-4 h-4" />}
                  <span>{category.name}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeCategory === category.id ? 'bg-white/20' : 'bg-white/80 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section ref={portfolioRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {filteredItems.length} проект{filteredItems.length === 1 ? '' : filteredItems.length < 5 ? 'а' : 'ов'} найдено
            </h2>
            <p className="text-gray-600">
              {activeCategory === 'all' ? 'Все наши работы' : categories.find(c => c.id === activeCategory)?.name}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20 col-span-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 col-span-full">
              <p className="text-gray-600 text-lg">Проекты не найдены</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item: PortfolioItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
                style={{ perspective: '1000px' }}
              >
                {/* Top Badge */}
                {item.popular && (
                  <div className="absolute -top-2 -right-2 z-50 bg-gradient-to-r from-primary-dark to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold border-2 border-white shadow-xl">
                    ТОП
                  </div>
                )}

                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-black/20 ${item.categoryColor}/20`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4">
                    <span className={`${item.categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {item.categoryName}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </motion.div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/portfolio/${item.slug}`}
                          className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Подробнее</span>
                        </Link>
                        <div className="flex space-x-2">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <span className="text-sm text-gray-500">{item.year}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed min-h-0">
                    {item.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <div className="text-xs text-gray-500 truncate">Бюджет</div>
                      <div className="text-sm font-semibold text-primary truncate">{item.budget}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <div className="text-xs text-gray-500 truncate">Срок</div>
                      <div className="text-sm font-semibold text-gray-900 truncate">{item.duration}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <div className="text-xs text-gray-500 truncate">Рейтинг</div>
                      <div className="text-sm font-semibold text-yellow-500 truncate">{item.rating}.0</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full truncate">
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{item.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Result */}
                  <div className="flex items-center space-x-2 mt-auto">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-success font-medium truncate">{item.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
            >
              <span>Посмотреть все проекты</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>



      <Footer />
      <FloatingAction />
    </>
  )
}