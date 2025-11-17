'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  ExternalLink,
  Grid,
  List,
  X,
  ImageIcon
} from 'lucide-react'

interface Portfolio {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  clientName: string
  clientWebsite: string
  category: string
  tags: string[]
  image: string
  year: number
  budget: string
  rating: number
  popular: boolean
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    client: '',
    category: '',
    tags: '',
    budget: '',
    year: new Date().getFullYear().toString(),
    image: '',
    gallery: '',
    isPublished: true,
    featured: false,
  })

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/admin/portfolio')
      if (response.ok) {
        const data = await response.json()
        setPortfolio(data)
      }
    } catch (error) {
      console.error('Ошибка загрузки портфолио:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^а-яёa-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5МБ')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const dataURL = event.target?.result as string
        setFormData(prev => ({ ...prev, image: dataURL }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Файл ${file.name} слишком большой. Максимальный размер: 5МБ`)
          return false
        }
        return true
      })

      if (validFiles.length === 0) return

      let processedCount = 0
      const galleryUrls: string[] = []

      validFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const dataURL = event.target?.result as string
          galleryUrls.push(dataURL)
          processedCount++

          if (processedCount === validFiles.length) {
            const existingGallery = formData.gallery ? formData.gallery.split(',').map(url => url.trim()).filter(Boolean) : []
            const newGallery = [...existingGallery, ...galleryUrls].join(', ')
            setFormData(prev => ({ ...prev, gallery: newGallery }))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleSaveProject = async () => {
    try {
      setSaving(true)
      
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          shortDesc: formData.description.substring(0, 150),
          clientName: formData.client,
          clientWebsite: '',
          category: formData.category,
          tags: tagsArray,
          image: formData.image,
          gallery: formData.gallery.split(',').map(url => url.trim()).filter(Boolean),
          year: parseInt(formData.year),
          budget: formData.budget,
          rating: 5,
          popular: formData.featured,
          active: formData.isPublished,
        }),
      })

      if (response.ok) {
        setShowModal(false)
        setFormData({
          title: '',
          slug: '',
          description: '',
          client: '',
          category: '',
          tags: '',
          budget: '',
          year: new Date().getFullYear().toString(),
          image: '',
          gallery: '',
          isPublished: true,
          featured: false,
        })
        fetchPortfolio()
      } else {
        console.error('Ошибка сохранения проекта')
      }
    } catch (error) {
      console.error('Ошибка сохранения проекта:', error)
    } finally {
      setSaving(false)
    }
  }

  const filteredPortfolio = portfolio.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && project.active) ||
                         (statusFilter === 'draft' && !project.active) ||
                         (statusFilter === 'featured' && project.popular)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'advertising', label: 'Реклама' },
    { value: 'branding', label: 'Брендинг' },
    { value: 'web', label: 'Веб-дизайн' },
    { value: 'print', label: 'Полиграфия' },
  ]

  const statuses = [
    { value: 'all', label: 'Все статусы' },
    { value: 'published', label: 'Опубликованные' },
    { value: 'draft', label: 'Черновики' },
    { value: 'featured', label: 'Рекомендуемые' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка портфолио...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Портфолио</h1>
              <p className="text-gray-600 mt-2">Управление проектами и кейсами</p>
            </div>
            <Link
              href="/admin/portfolio/editor"
              className="flex items-center px-4 py-2 bg-accent hover:bg-primary text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить проект
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Поиск по названию, клиенту или описанию..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>

              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Найдено проектов: {filteredPortfolio.length} из {portfolio.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {filteredPortfolio.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет проектов для отображения
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или добавьте новый проект
              </p>
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {filteredPortfolio.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow ${
                    viewMode === 'list' ? 'flex items-center p-4' : 'overflow-hidden'
                  }`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-gray-500" />
                          </div>
                        )}
                        {project.popular && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-medium">
                              Рекомендуемый
                            </span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            project.active 
                              ? 'bg-green-500 text-white' 
                              : 'bg-orange-500 text-white'
                          }`}>
                            {project.active ? 'Опубликован' : 'Черновик'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {project.description}
                          </p>
                          <p className="text-sm text-blue-600 font-medium">
                            {project.clientName}
                          </p>
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-md">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="text-xs text-gray-500">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {project.year}
                          </div>
                          <div className="flex items-center space-x-2">
                            {project.clientWebsite && (
                              <button 
                                onClick={() => window.open(project.clientWebsite, '_blank')}
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Открыть сайт клиента"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => window.open(`/portfolio/${project.slug}`, '_blank')}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Просмотр на сайте"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <Link 
                              href={`/admin/portfolio/editor?id=${project.id}`}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Редактировать"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button 
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Удалить"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center w-full space-x-4">
                      <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {project.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            project.active 
                              ? 'bg-green-500 text-white' 
                              : 'bg-orange-500 text-white'
                          }`}>
                            {project.active ? 'Опубликован' : 'Черновик'}
                          </span>
                          {project.popular && (
                            <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-medium">
                              Рекомендуемый
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-blue-600 font-medium mb-1">
                          {project.clientName}
                        </p>
                        <p className="text-gray-600 text-sm truncate">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-gray-500">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {project.year}
                        </div>
                        {project.clientWebsite && (
                          <button 
                            onClick={() => window.open(project.clientWebsite, '_blank')}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Открыть сайт клиента"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => window.open(`/portfolio/${project.slug}`, '_blank')}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Просмотр на сайте"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link 
                          href={`/admin/portfolio/editor?id=${project.id}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Редактировать"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Добавить проект
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название проекта *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                    placeholder="Введите название проекта"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                    placeholder="project-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                  placeholder="Описание проекта, его особенности и результаты..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL изображения
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Ссылка на главное изображение проекта</p>
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Предпросмотр" 
                      className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Или загрузить файл
                 </label>
                 <input
                   type="file"
                   accept="image/*"
                   onChange={handleImageUpload}
                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent file:text-white hover:file:bg-primary"
                 />
                 <p className="text-xs text-gray-500 mt-1">Поддерживаются форматы: JPG, PNG, GIF (макс. 5МБ)</p>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Галерея проекта
                 </label>
                 <input
                   type="text"
                   value={formData.gallery}
                   onChange={(e) => setFormData(prev => ({ ...prev, gallery: e.target.value }))}
                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                   placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                 />
                 <p className="text-xs text-gray-500 mt-1">Введите URL изображений через запятую для галереи</p>
                 <input
                   type="file"
                   accept="image/*"
                   multiple
                   onChange={handleGalleryUpload}
                   className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent file:text-white hover:file:bg-primary"
                 />
                 <p className="text-xs text-gray-500 mt-1">Или выберите несколько файлов для галереи</p>
               </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Клиент *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                    placeholder="Название компании или имя клиента"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="">Выберите категорию</option>
                    <option value="advertising">Реклама</option>
                    <option value="branding">Брендинг</option>
                    <option value="web">Веб-дизайн</option>
                    <option value="print">Полиграфия</option>
                  </select>
                </div>
              </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Теги
                 </label>
                 <input
                   type="text"
                   value={formData.tags}
                   onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                   placeholder="брендинг, логотип, дизайн"
                 />
                 <p className="text-xs text-gray-500 mt-1">Разделите теги запятыми</p>
               </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Бюджет
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                    placeholder="50 000 ₽"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Год завершения
                  </label>
                  <input
                    type="number"
                    min="2020"
                    max="2030"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="ml-2 text-sm text-gray-700">Опубликовать проект</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="ml-2 text-sm text-gray-700">Рекомендуемый проект</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Отменить
              </button>
              <button
                onClick={handleSaveProject}
                disabled={saving || !formData.title || !formData.description || !formData.client || !formData.category}
                className="px-4 py-2 bg-accent hover:bg-primary text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Сохранение...' : 'Сохранить проект'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 