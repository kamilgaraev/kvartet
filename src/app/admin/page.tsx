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
  AlertCircle,
  CheckCircle,
  Calendar,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

  // Данные для демонстрации (в будущем заменить на реальные API вызовы)
  useEffect(() => {
    const timer = setTimeout(() => {
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
    return () => clearTimeout(timer)
  }, [])

  const statsCards = [
    {
      title: 'Всего заявок',
      value: stats.totalLeads,
      change: '+12%',
      changeType: 'positive',
      icon: MessageSquare,
      description: 'за последний месяц'
    },
    {
      title: 'Новые заявки',
      value: stats.newLeads,
      change: '+3',
      changeType: 'positive',
      icon: AlertCircle,
      description: 'требуют внимания',
      highlight: true
    },
    {
      title: 'Конверсии',
      value: stats.convertedLeads,
      change: '+18%',
      changeType: 'positive',
      icon: CheckCircle,
      description: 'успешные сделки'
    },
    {
      title: 'Выручка',
      value: `${(stats.revenue / 1000).toFixed(0)}К ₽`,
      change: '+24%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'общий доход'
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
    },
    {
      id: '4',
      name: 'Иван Алексеев',
      email: 'ivan.a@gmail.com',
      phone: '+7 (999) 111-22-33',
      service: 'Интерьерная печать',
      status: 'converted',
      createdAt: '3 часа назад'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">Новая</Badge>
      case 'contacted': return <Badge variant="secondary" className="bg-yellow-500 text-white hover:bg-yellow-600">Связались</Badge>
      case 'in_progress': return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">В работе</Badge>
      case 'converted': return <Badge variant="outline" className="border-green-500 text-green-600">Завершен</Badge>
      default: return <Badge variant="outline">Неизвестно</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Обзор ключевых показателей эффективности
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium">
            {new Date().toLocaleDateString('ru-RU', { 
              day: 'numeric', 
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`hover:shadow-md transition-shadow duration-200 ${card.highlight ? 'border-primary/50 bg-primary/5' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.change} {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-7 gap-6">
        {/* Recent Leads */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Последние заявки</CardTitle>
                <CardDescription>Список недавних обращений клиентов</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                 <a href="/admin/leads" className="flex items-center gap-2">
                  Все заявки <ArrowRight className="w-4 h-4" />
                 </a>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Время</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLeads.map((lead) => (
                    <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">{lead.email}</div>
                      </TableCell>
                      <TableCell>{lead.service}</TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">{lead.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions / System Status */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button className="w-full justify-start" variant="default">
                <MessageSquare className="mr-2 h-4 w-4" />
                Новая заявка
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Добавить пользователя
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Создать отчет
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50/50 border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2 text-green-700">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Статус системы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-600 mb-2">
                Все системы работают в штатном режиме
              </div>
              <div className="text-xs text-muted-foreground">
                Последняя проверка: Только что
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
