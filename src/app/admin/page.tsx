'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Eye,
  Clock,
  DollarSign,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Calendar,
  BarChart3
} from 'lucide-react'

interface DashboardStats {
  totalLeads: number
  newLeads: number
  convertedLeads: number
  revenue: number
  pageViews: number
  avgResponseTime: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    revenue: 0,
    pageViews: 0,
    avgResponseTime: '2.5ч'
  })
  const [loading, setLoading] = useState(true)

  // Данные для демонстрации
  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setStats({
        totalLeads: 142,
        newLeads: 8,
        convertedLeads: 23,
        revenue: 485000,
        pageViews: 2847,
        avgResponseTime: '2.5ч'
      })
      setLoading(false)
    }, 1000)
  }, [])

  const statsCards = [
    {
      title: 'Всего заявок',
      value: stats.totalLeads,
      change: '+12%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Новые заявки',
      value: stats.newLeads,
      change: '+3',
      changeType: 'positive',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Конверсии',
      value: stats.convertedLeads,
      change: '+18%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Выручка',
      value: `${(stats.revenue / 1000).toFixed(0)}К ₽`,
      change: '+24%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Просмотры',
      value: stats.pageViews,
      change: '+8%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Время ответа',
      value: stats.avgResponseTime,
      change: '-15мин',
      changeType: 'positive',
      icon: Clock,
      color: 'from-teal-500 to-teal-600'
    }
  ]

  const recentLeads = [
    {
      id: '1',
      name: 'Андрей Петров',
      email: 'petrov@example.com',
      phone: '+7 (917) 123-45-67',
      service: 'Наружная реклама',
      status: 'new',
      createdAt: '2 мин назад'
    },
    {
      id: '2',
      name: 'ООО "Строй Инвест"',
      email: 'info@stroyinvest.ru',
      phone: '+7 (347) 555-77-88',
      service: 'Полиграфия',
      status: 'contacted',
      createdAt: '15 мин назад'
    },
    {
      id: '3',
      name: 'Мария Сидорова',
      email: 'maria.s@mail.ru',
      phone: '+7 (987) 654-32-10',
      service: 'Брендинг',
      status: 'in_progress',
      createdAt: '1 час назад'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'converted': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая'
      case 'contacted': return 'Связались'
      case 'in_progress': return 'В работе'
      case 'converted': return 'Конверсия'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FCAD4]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Добро пожаловать в админ-панель рекламного агентства "Квартет"
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm text-gray-600">Сегодня</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'long' 
              })}
            </p>
          </div>
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                card.changeType === 'positive' 
                  ? 'text-green-700 bg-green-100' 
                  : 'text-red-700 bg-red-100'
              }`}>
                {card.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
            </h3>
            <p className="text-gray-600 text-sm">{card.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Последние заявки</h2>
            <button className="text-[#1FCAD4] hover:text-[#1FCAD4]/80 text-sm font-medium">
              Посмотреть все
            </button>
          </div>
          
          <div className="space-y-4">
            {recentLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1FCAD4] to-[#E91E63] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {lead.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {lead.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {lead.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {getStatusText(lead.status)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{lead.createdAt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Быстрые действия</h2>
          
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-[#1FCAD4] to-[#E91E63] text-white rounded-xl hover:opacity-90 transition-opacity">
              <MessageSquare className="w-5 h-5" />
              <span>Новая заявка</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <Users className="w-5 h-5" />
              <span>Добавить пользователя</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span>Отчеты</span>
            </button>
          </div>

          {/* System Status */}
          <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Система работает нормально</span>
            </div>
            <p className="text-xs text-green-600">
              Последнее обновление: 5 минут назад
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 