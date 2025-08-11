'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MessageSquare,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface Lead {
  id: string
  name: string
  email?: string
  phone?: string
  message?: string
  type: string
  status: string
  priority: string
  source?: string
  serviceType?: string
  budget?: string
  createdAt: string
  assignee?: {
    name: string
    email: string
  }
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Демонстрационные данные
  useEffect(() => {
    setTimeout(() => {
      setLeads([
        {
          id: '1',
          name: 'Андрей Петров',
          email: 'petrov@example.com',
          phone: '+7 (917) 123-45-67',
          message: 'Нужна наружная реклама для магазина',
          type: 'CONTACT',
          status: 'NEW',
          priority: 'HIGH',
          source: 'website',
          serviceType: 'Наружная реклама',
          budget: '50,000 ₽',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'ООО "Строй Инвест"',
          email: 'info@stroyinvest.ru',
          phone: '+7 (347) 555-77-88',
          message: 'Требуется печать каталогов',
          type: 'QUOTE',
          status: 'CONTACTED',
          priority: 'MEDIUM',
          source: 'phone',
          serviceType: 'Полиграфия',
          budget: '25,000 ₽',
          createdAt: '2024-01-15T09:15:00Z',
          assignee: { name: 'Иван Сидоров', email: 'ivan@kvartett.ru' }
        },
        {
          id: '3',
          name: 'Мария Сидорова',
          email: 'maria.s@mail.ru',
          phone: '+7 (987) 654-32-10',
          message: 'Разработка логотипа и фирменного стиля',
          type: 'CALCULATOR',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          source: 'calculator',
          serviceType: 'Брендинг',
          budget: '75,000 ₽',
          createdAt: '2024-01-14T16:45:00Z',
          assignee: { name: 'Анна Иванова', email: 'anna@kvartett.ru' }
        },
        {
          id: '4',
          name: 'ИП Васильев',
          email: 'vasiliev@business.ru',
          phone: '+7 (905) 111-22-33',
          message: 'Интерьерная навигация для офиса',
          type: 'CALLBACK',
          status: 'CONVERTED',
          priority: 'MEDIUM',
          source: 'social',
          serviceType: 'Интерьерная реклама',
          budget: '30,000 ₽',
          createdAt: '2024-01-13T14:20:00Z',
          assignee: { name: 'Петр Николаев', email: 'petr@kvartett.ru' }
        }
      ])
      setLoading(false)
      setTotalPages(1)
    }, 800)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW': return <AlertCircle className="w-4 h-4" />
      case 'CONTACTED': return <MessageSquare className="w-4 h-4" />
      case 'IN_PROGRESS': return <Clock className="w-4 h-4" />
      case 'CONVERTED': return <CheckCircle className="w-4 h-4" />
      case 'CLOSED': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-red-100 text-red-800 border-red-200'
      case 'CONTACTED': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'CONVERTED': return 'bg-green-100 text-green-800 border-green-200'
      case 'CLOSED': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'NEW': return 'Новая'
      case 'CONTACTED': return 'Связались'
      case 'IN_PROGRESS': return 'В работе'
      case 'CONVERTED': return 'Конверсия'
      case 'CLOSED': return 'Закрыта'
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'LOW': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'Высокий'
      case 'MEDIUM': return 'Средний'
      case 'LOW': return 'Низкий'
      default: return priority
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    )
  }

  const handleSelectAll = () => {
    setSelectedLeads(
      selectedLeads.length === leads.length ? [] : leads.map(lead => lead.id)
    )
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone?.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesType = typeFilter === 'all' || lead.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Заявки</h1>
          <p className="text-gray-600 mt-1">
            Управление заявками клиентов
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            <span>Экспорт</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity">
            <MessageSquare className="w-4 h-4" />
            <span>Новая заявка</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Поиск по имени, email, телефону..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="NEW">Новые</option>
            <option value="CONTACTED">Связались</option>
            <option value="IN_PROGRESS">В работе</option>
            <option value="CONVERTED">Конверсия</option>
            <option value="CLOSED">Закрыты</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Все типы</option>
            <option value="CONTACT">Контакт</option>
            <option value="QUOTE">Расчет</option>
            <option value="CALCULATOR">Калькулятор</option>
            <option value="CALLBACK">Обратный звонок</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Все приоритеты</option>
            <option value="HIGH">Высокий</option>
            <option value="MEDIUM">Средний</option>
            <option value="LOW">Низкий</option>
          </select>
        </div>
      </motion.div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Найдено {filteredLeads.length} из {leads.length} заявок
        </span>
        {selectedLeads.length > 0 && (
          <div className="flex items-center space-x-4">
            <span>Выбрано: {selectedLeads.length}</span>
            <button className="text-red-600 hover:text-red-800">
              Удалить выбранные
            </button>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Клиент
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Услуга
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Приоритет
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Исполнитель
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500 space-y-1">
                          {lead.email && (
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {lead.email}
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lead.serviceType}</div>
                    <div className="text-sm text-gray-500">{lead.budget}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                      {getStatusIcon(lead.status)}
                      <span className="ml-1">{getStatusText(lead.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getPriorityColor(lead.priority)}`}>
                      {getPriorityText(lead.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {lead.assignee ? (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{lead.assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Не назначен</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(lead.createdAt)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Страница {currentPage} из {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Назад
              </button>
              <button
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Вперед
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}