'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Globe,
  Bookmark,
  CheckCircle,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Service {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: string
  features: string[]
  price: {
    min: number
    max: number
  }
  images: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services')
      if (response.ok) {
        const data = await response.json()
        const transformedServices = data.map((service: any) => ({
          id: service.id,
          title: service.name,
          slug: service.slug,
          description: service.description,
          content: service.description,
          category: 'service',
          features: service.features || [],
          price: { 
            min: service.priceFrom || 0, 
            max: service.priceTo || 0 
          },
          images: service.gallery || [],
          isActive: service.active,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt
        }))
        setServices(transformedServices)
      }
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && service.isActive) ||
                         (statusFilter === 'inactive' && !service.isActive)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'advertising', label: 'Реклама' },
    { value: 'branding', label: 'Брендинг' },
    { value: 'printing', label: 'Полиграфия' },
    { value: 'web', label: 'Веб-услуги' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  const activeServices = services.filter(s => s.isActive).length
  const totalFeatures = services.reduce((sum, s) => sum + s.features.length, 0)
  const avgPrice = services.length > 0 
    ? services.reduce((sum, s) => sum + (s.price.min + s.price.max) / 2, 0) / services.length
    : 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Услуги</h1>
          <p className="text-muted-foreground mt-2">
            Управление каталогом услуг
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить услугу</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Всего услуг</CardTitle>
            <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{services.length}</div>
            <p className="text-xs text-blue-600 mt-1 font-medium">
              В каталоге
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Активных</CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{activeServices}</div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              Доступно на сайте
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Особенностей</CardTitle>
            <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg">
              <Bookmark className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{totalFeatures}</div>
            <p className="text-xs text-purple-600 mt-1 font-medium">
              Всего характеристик
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-amber-200 bg-amber-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Средняя цена</CardTitle>
            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">{avgPrice.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</div>
            <p className="text-xs text-amber-600 mt-1 font-medium">
              По каталогу
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Поиск услуг..."
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              >
                <option value="all">Все статусы</option>
                <option value="active">Активные</option>
                <option value="inactive">Неактивные</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Услуги не найдены</h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или добавьте новую услугу
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          service.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {service.isActive ? 'Активна' : 'Неактивна'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Цена:</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {service.price.min.toLocaleString()} - {service.price.max.toLocaleString()} ₽
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Особенности:</div>
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-md">
                          +{service.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Обновлено: {new Date(service.updatedAt).toLocaleDateString('ru-RU')}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => window.open(`/services/${service.slug}`, '_blank')}
                        className="p-2 text-gray-600 hover:bg-accent hover:text-white rounded-lg transition-all"
                        title="Просмотр на сайте"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedService(service)
                          setShowModal(true)
                        }}
                        className="p-2 text-gray-600 hover:bg-accent hover:text-white rounded-lg transition-all"
                        title="Редактировать"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Удалить услугу?')) {
                            setServices(services.filter(s => s.id !== service.id))
                          }
                        }}
                        className="p-2 text-gray-600 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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