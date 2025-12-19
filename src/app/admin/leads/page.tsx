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
  const [viewingLead, setViewingLead] = useState<Lead | null>(null)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      })

      if (searchTerm) params.append('search', searchTerm)
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (typeFilter !== 'all') params.append('type', typeFilter)
      if (priorityFilter !== 'all') params.append('priority', priorityFilter)

      const response = await fetch(`/api/leads?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Ошибка при загрузке заявок')
      }

      const data = await response.json()
      setLeads(data.leads || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [currentPage, searchTerm, statusFilter, typeFilter, priorityFilter])

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

  const handleDeleteSelected = async () => {
    if (!confirm(`Удалить выбранные заявки (${selectedLeads.length})?`)) return

    try {
      await Promise.all(
        selectedLeads.map(id => 
          fetch(`/api/leads/${id}`, { method: 'DELETE' })
        )
      )
      setSelectedLeads([])
      await fetchLeads()
    } catch (error) {
      console.error('Error deleting leads:', error)
      alert('Ошибка при удалении заявок')
    }
  }

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Удалить эту заявку?')) return

    try {
      const response = await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchLeads()
      }
    } catch (error) {
      console.error('Error deleting lead:', error)
      alert('Ошибка при удалении заявки')
    }
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
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
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
            <button 
              onClick={handleDeleteSelected}
              className="text-red-600 hover:text-red-800 font-medium"
            >
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
        <div className="overflow-x-auto rounded-md border-2 border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="border-b-2 border-gray-200">
                <th className="px-6 py-4 text-left border-r border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Клиент
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Услуга
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Статус
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Приоритет
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Исполнитель
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Дата
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                  className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                >
                  <td className="px-6 py-4 border-r border-gray-100">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                  </td>
                  <td className="px-6 py-4 border-r border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
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
                  <td className="px-6 py-4 border-r border-gray-100">
                    <div className="text-sm text-gray-900">{lead.serviceType}</div>
                    <div className="text-sm text-gray-500">{lead.budget}</div>
                  </td>
                  <td className="px-6 py-4 border-r border-gray-100">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                      {getStatusIcon(lead.status)}
                      <span className="ml-1">{getStatusText(lead.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-gray-100">
                    <span className={`text-sm font-medium ${getPriorityColor(lead.priority)}`}>
                      {getPriorityText(lead.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-gray-100">
                    {lead.assignee ? (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{lead.assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Не назначен</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-100">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(lead.createdAt)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setViewingLead(lead)}
                        title="Просмотр"
                        className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingLead(lead)}
                        title="Редактировать"
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        title="Удалить"
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
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
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Назад
              </button>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Вперед
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {viewingLead && (
        <LeadViewModal
          lead={viewingLead}
          onClose={() => setViewingLead(null)}
        />
      )}

      {editingLead && (
        <LeadEditModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={async (updatedLead) => {
            try {
              const response = await fetch(`/api/leads/${editingLead.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedLead),
              })
              if (response.ok) {
                await fetchLeads()
                setEditingLead(null)
              }
            } catch (error) {
              console.error('Error updating lead:', error)
              alert('Ошибка при обновлении заявки')
            }
          }}
        />
      )}
    </div>
  )
}

function LeadViewModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Просмотр заявки</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Имя клиента</label>
              <p className="text-gray-900 font-medium">{lead.name}</p>
            </div>
            {lead.email && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <p className="text-gray-900">{lead.email}</p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {lead.phone && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Телефон</label>
                <p className="text-gray-900">{lead.phone}</p>
              </div>
            )}
            {lead.serviceType && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Услуга</label>
                <p className="text-gray-900">{lead.serviceType}</p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Статус</label>
              <p className="text-gray-900">{lead.status}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Приоритет</label>
              <p className="text-gray-900">{lead.priority}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Тип</label>
              <p className="text-gray-900">{lead.type}</p>
            </div>
          </div>

          {lead.budget && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Бюджет</label>
              <p className="text-gray-900">{lead.budget}</p>
            </div>
          )}

          {lead.message && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Сообщение</label>
              <p className="text-gray-900 whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}

          {lead.source && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Источник</label>
              <p className="text-gray-900">{lead.source}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-600">Дата создания</label>
            <p className="text-gray-900">
              {new Date(lead.createdAt).toLocaleString('ru-RU')}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function LeadEditModal({ 
  lead, 
  onClose, 
  onSave 
}: { 
  lead: Lead; 
  onClose: () => void;
  onSave: (data: Partial<Lead>) => void;
}) {
  const [formData, setFormData] = useState({
    status: lead.status,
    priority: lead.priority,
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Редактировать заявку</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Клиент
            </label>
            <p className="text-gray-900 font-medium">{lead.name}</p>
            {lead.email && <p className="text-sm text-gray-600">{lead.email}</p>}
            {lead.phone && <p className="text-sm text-gray-600">{lead.phone}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Статус
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="NEW">Новая</option>
                <option value="CONTACTED">Связались</option>
                <option value="IN_PROGRESS">В работе</option>
                <option value="CONVERTED">Конверсия</option>
                <option value="CLOSED">Закрыта</option>
                <option value="SPAM">Спам</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Приоритет
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="LOW">Низкий</option>
                <option value="MEDIUM">Средний</option>
                <option value="HIGH">Высокий</option>
                <option value="URGENT">Срочный</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Заметки
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Добавьте заметки к заявке..."
            />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Сохранить
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}