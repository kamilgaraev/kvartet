'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock,
  Eye,
  ArrowRight,
  Search,
  Tag,
  TrendingUp,
  Star,
  MessageCircle,
  Share2
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingAction from '../components/FloatingAction'

const categories = [
  { id: 'all', name: 'Все статьи', count: 24 },
  { id: 'outdoor', name: 'Наружная реклама', count: 8 },
  { id: 'design', name: 'Дизайн', count: 6 },
  { id: 'business', name: 'Бизнес', count: 5 },
  { id: 'trends', name: 'Тренды', count: 3 },
  { id: 'tips', name: 'Советы', count: 2 }
]

const blogPosts = [
  {
    id: 1,
    title: 'Как выбрать правильный размер для наружной рекламы',
    slug: 'how-to-choose-outdoor-advertising-size',
    excerpt: 'Подробное руководство по выбору оптимального размера рекламных конструкций для максимальной эффективности',
    content: 'Полный контент статьи...',
    category: 'outdoor',
    categoryName: 'Наружная реклама',
    author: 'Александр Петров',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-01-15',
    readTime: '5 мин',
    views: 1234,
    likes: 89,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    tags: ['размеры', 'эффективность', 'планирование'],
    featured: true
  },
  {
    id: 2,
    title: 'Тренды в дизайне логотипов 2024',
    slug: 'logo-design-trends-2024',
    excerpt: 'Разбираем главные тенденции в создании логотипов: от минимализма до экспериментальной типографики',
    content: 'Полный контент статьи...',
    category: 'design',
    categoryName: 'Дизайн',
    author: 'Мария Сидорова',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-01-12',
    readTime: '7 мин',
    views: 987,
    likes: 65,
    comments: 8,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    tags: ['логотип', 'тренды', 'брендинг'],
    featured: false
  },
  {
    id: 3,
    title: 'ROI рекламных кампаний: как измерить эффективность',
    slug: 'roi-advertising-campaigns-measurement',
    excerpt: 'Практические методы оценки возврата инвестиций в рекламу и инструменты для точного измерения',
    content: 'Полный контент статьи...',
    category: 'business',
    categoryName: 'Бизнес',
    author: 'Дмитрий Козлов',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-01-10',
    readTime: '10 мин',
    views: 756,
    likes: 45,
    comments: 15,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['ROI', 'аналитика', 'эффективность'],
    featured: true
  },
  {
    id: 4,
    title: 'LED-технологии в наружной рекламе',
    slug: 'led-technologies-outdoor-advertising',
    excerpt: 'Преимущества LED-экранов, особенности выбора и установки для максимального воздействия на аудиторию',
    content: 'Полный контент статьи...',
    category: 'outdoor',
    categoryName: 'Наружная реклама',
    author: 'Елена Волкова',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-01-08',
    readTime: '6 мин',
    views: 654,
    likes: 38,
    comments: 7,
    image: 'https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?w=800&h=600&fit=crop',
    tags: ['LED', 'технологии', 'инновации'],
    featured: false
  },
  {
    id: 5,
    title: 'Психология цвета в рекламе',
    slug: 'color-psychology-advertising',
    excerpt: 'Как правильно использовать цвета для воздействия на эмоции и поведение потребителей',
    content: 'Полный контент статьи...',
    category: 'design',
    categoryName: 'Дизайн',
    author: 'Мария Сидорова',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-01-05',
    readTime: '8 мин',
    views: 543,
    likes: 42,
    comments: 9,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
    tags: ['психология', 'цвет', 'дизайн'],
    featured: false
  },
  {
    id: 6,
    title: 'Бюджетирование рекламной кампании',
    slug: 'advertising-campaign-budgeting',
    excerpt: 'Пошаговый план составления бюджета рекламной кампании с учетом всех факторов и рисков',
    content: 'Полный контент статьи...',
    category: 'business',
    categoryName: 'Бизнес',
    author: 'Александр Петров',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-01-03',
    readTime: '12 мин',
    views: 432,
    likes: 29,
    comments: 6,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    tags: ['бюджет', 'планирование', 'финансы'],
    featured: false
  }
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

export default function BlogPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [postsRef, postsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 bg-gradient-to-br from-gray-50 via-white to-primary-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-primary-05)' }}></div>
          <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-primary-dark-05)' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-full px-6 py-2 mb-8"
            >
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-gray-700">Блог о рекламе</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-on-dark mb-8"
            >
              Знания о{' '}
              <span className="relative inline-block">
                <span className="gradient-kvartett-text">рекламе</span>
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
              className="text-xl text-on-dark-muted mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Экспертные статьи о тенденциях в рекламе, советы по маркетингу и практические кейсы от профессионалов индустрии
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative max-w-lg mx-auto"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#1FCAD4] text-white shadow-lg shadow-[#1FCAD4]/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
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
      </section>

      {/* Featured Posts */}
      {activeCategory === 'all' && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Рекомендуемые статьи
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Самые популярные и полезные материалы от наших экспертов
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                     <div className="absolute top-4 left-4">
                      <span className="bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium">
                        Рекомендуем
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-800 font-medium">{post.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                     <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {post.categoryName}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{post.author}</div>
                          <div className="text-sm text-gray-500">{post.readTime}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section ref={postsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {filteredPosts.length} статей найдено
            </h2>
            <p className="text-gray-600">
              {activeCategory === 'all' ? 'Все публикации' : categories.find(c => c.id === activeCategory)?.name}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.featured && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-[#E91E63] text-white px-2 py-1 rounded-md text-xs font-medium">
                        ТОП
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1">
                    <div className="flex items-center space-x-1 text-xs">
                      <Eye className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-800 font-medium">{post.views}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                     <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs font-medium">
                      {post.categoryName}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.readTime}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-gradient-to-r from-[#1FCAD4] to-[#0891A3] text-white px-8 py-4 rounded-2xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
            >
              <span>Загрузить еще статьи</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Подписка на новости
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Получайте свежие статьи о рекламе и маркетинге прямо на почту
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#1FCAD4] focus:ring-2 focus:ring-[#1FCAD4]/20 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                 className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Подписаться
              </motion.button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Никакого спама, только полезный контент
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingAction />
    </>
  )
} 