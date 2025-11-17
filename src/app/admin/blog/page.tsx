'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  Calendar,
  User,
  MessageCircle,
  TrendingUp,
  BookOpen
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  tags: string[]
  featuredImage?: string
  isPublished: boolean
  isFeatured: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
  views: number
  comments: number
  readTime: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [authorFilter, setAuthorFilter] = useState('all')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: '1',
          title: 'Тренды наружной рекламы в 2024 году',
          slug: 'outdoor-advertising-trends-2024',
          excerpt: 'Рассматриваем основные тенденции в сфере наружной рекламы и как они влияют на эффективность кампаний',
          content: 'Подробный контент статьи...',
          author: { name: 'Иван Петров', avatar: '/avatars/ivan.jpg' },
          category: 'trends',
          tags: ['наружная реклама', 'тренды', 'маркетинг', '2024'],
          featuredImage: '/blog/outdoor-trends.jpg',
          isPublished: true,
          isFeatured: true,
          publishedAt: '2024-01-15T10:00:00Z',
          createdAt: '2024-01-14T15:30:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          views: 1250,
          comments: 8,
          readTime: 5
        },
        {
          id: '2',
          title: 'Как выбрать правильный шрифт для логотипа',
          slug: 'how-to-choose-font-for-logo',
          excerpt: 'Практические советы по выбору типографики для создания эффективного фирменного стиля',
          content: 'Подробный контент статьи...',
          author: { name: 'Анна Сидорова', avatar: '/avatars/anna.jpg' },
          category: 'design',
          tags: ['логотип', 'шрифты', 'дизайн', 'брендинг'],
          featuredImage: '/blog/fonts-guide.jpg',
          isPublished: true,
          isFeatured: false,
          publishedAt: '2024-01-12T14:20:00Z',
          createdAt: '2024-01-10T11:15:00Z',
          updatedAt: '2024-01-12T14:20:00Z',
          views: 890,
          comments: 12,
          readTime: 7
        },
        {
          id: '3',
          title: 'Новые технологии цифровой печати',
          slug: 'digital-printing-technologies',
          excerpt: 'Обзор современных технологий печати и их применение в рекламной индустрии',
          content: 'Подробный контент статьи...',
          author: { name: 'Михаил Кузнецов', avatar: '/avatars/mikhail.jpg' },
          category: 'technology',
          tags: ['печать', 'технологии', 'полиграфия'],
          featuredImage: '/blog/printing-tech.jpg',
          isPublished: false,
          isFeatured: false,
          createdAt: '2024-01-08T16:45:00Z',
          updatedAt: '2024-01-10T09:30:00Z',
          views: 0,
          comments: 0,
          readTime: 6
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && post.isPublished) ||
                         (statusFilter === 'draft' && !post.isPublished) ||
                         (statusFilter === 'featured' && post.isFeatured)
    const matchesAuthor = authorFilter === 'all' || post.author.name === authorFilter
    
    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor
  })

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'trends', label: 'Тренды' },
    { value: 'design', label: 'Дизайн' },
    { value: 'technology', label: 'Технологии' },
    { value: 'tips', label: 'Советы' },
    { value: 'case-study', label: 'Кейсы' }
  ]

  const authors = [
    { value: 'all', label: 'Все авторы' },
    { value: 'Иван Петров', label: 'Иван Петров' },
    { value: 'Анна Сидорова', label: 'Анна Сидорова' },
    { value: 'Михаил Кузнецов', label: 'Михаил Кузнецов' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Блог</h1>
          <p className="text-gray-600 mt-1">
            Управление статьями и публикациями
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span>Аналитика</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-primary text-white rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span>Новая статья</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Всего статей</p>
              <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Опубликовано</p>
              <p className="text-3xl font-bold text-green-600">
                {posts.filter(p => p.isPublished).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Просмотры</p>
              <p className="text-3xl font-bold text-purple-600">
                {posts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Комментарии</p>
              <p className="text-3xl font-bold text-orange-600">
                {posts.reduce((sum, post) => sum + post.comments, 0)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm w-64"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              >
                {authors.map(author => (
                  <option key={author.value} value={author.value}>
                    {author.label}
                  </option>
                ))}
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              >
                <option value="all">Все статусы</option>
                <option value="published">Опубликованные</option>
                <option value="draft">Черновики</option>
                <option value="featured">Рекомендуемые</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Статьи не найдены</h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или создайте новую статью
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {post.featuredImage ? (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                          <FileText className="w-8 h-8 text-gray-500" />
                        </div>
                      ) : (
                        <FileText className="w-8 h-8 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {post.isFeatured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                              Рекомендуемая
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            post.isPublished 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {post.isPublished ? 'Опубликована' : 'Черновик'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 4).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 4 && (
                          <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-md">
                            +{post.tags.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {post.isPublished && post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString('ru-RU')
                                : 'Не опубликована'
                              }
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <span>{post.readTime} мин. чтения</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {post.isPublished && (
                            <button 
                              onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Просмотр на сайте"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => setSelectedPost(post)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Редактировать"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm('Удалить статью?')) {
                                setPosts(posts.filter(p => p.id !== post.id))
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 