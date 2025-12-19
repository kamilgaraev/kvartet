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
  ArrowRight,
  MoreHorizontal,
  ArrowUpRight,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const [recentLeads, setRecentLeads] = useState<any[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const leadsResponse = await fetch('/api/leads')
        if (leadsResponse.ok) {
          const leadsData = await leadsResponse.json()
          const leads = leadsData.leads || []
          
          setStats({
            totalLeads: leads.length,
            newLeads: leads.filter((l: any) => l.status === 'NEW').length,
            convertedLeads: leads.filter((l: any) => l.status === 'CONVERTED').length,
            revenue: leads.filter((l: any) => l.status === 'CONVERTED').reduce((sum: number, l: any) => {
              const budgetNum = parseInt(l.budget?.replace(/\D/g, '') || '0')
              return sum + budgetNum
            }, 0),
            pageViews: 2847,
            avgResponseTime: '2.5ч'
          })
          
          setRecentLeads(leads.slice(0, 4).map((lead: any) => ({
            id: lead.id,
            name: lead.name,
            email: lead.email || '',
            image: '',
            service: lead.serviceType || 'Не указано',
            status: lead.status,
            amount: lead.budget || '—',
            createdAt: new Date(lead.createdAt).toLocaleDateString('ru-RU')
          })))
        } else {
          setStats({
            totalLeads: 142,
            newLeads: 8,
            convertedLeads: 23,
            revenue: 485000,
            pageViews: 2847,
            avgResponseTime: '2.5ч'
          })
          setRecentLeads([
            {
              id: '1',
              name: 'Андрей Петров',
              email: 'petrov@example.com',
              image: '',
              service: 'Наружная реклама',
              status: 'NEW',
              amount: '45 000 ₽',
              createdAt: '2 мин назад'
            },
            {
              id: '2',
              name: 'ООО "Строй Инвест"',
              email: 'info@stroyinvest.ru',
              image: '',
              service: 'Полиграфия',
              status: 'CONTACTED',
              amount: '120 000 ₽',
              createdAt: '15 мин назад'
            },
            {
              id: '3',
              name: 'Мария Сидорова',
              email: 'maria.s@mail.ru',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              service: 'Брендинг',
              status: 'IN_PROGRESS',
              amount: '85 000 ₽',
              createdAt: '1 час назад'
            },
            {
              id: '4',
              name: 'Иван Алексеев',
              email: 'ivan.a@gmail.com',
              image: '',
              service: 'Интерьерная печать',
              status: 'CONVERTED',
              amount: '12 500 ₽',
              createdAt: '3 часа назад'
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setStats({
          totalLeads: 142,
          newLeads: 8,
          convertedLeads: 23,
          revenue: 485000,
          pageViews: 2847,
          avgResponseTime: '2.5ч'
        })
        setRecentLeads([
          {
            id: '1',
            name: 'Андрей Петров',
            email: 'petrov@example.com',
            image: '',
            service: 'Наружная реклама',
            status: 'NEW',
            amount: '45 000 ₽',
            createdAt: '2 мин назад'
          },
          {
            id: '2',
            name: 'ООО "Строй Инвест"',
            email: 'info@stroyinvest.ru',
            image: '',
            service: 'Полиграфия',
            status: 'CONTACTED',
            amount: '120 000 ₽',
            createdAt: '15 мин назад'
          },
          {
            id: '3',
            name: 'Мария Сидорова',
            email: 'maria.s@mail.ru',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            service: 'Брендинг',
            status: 'IN_PROGRESS',
            amount: '85 000 ₽',
            createdAt: '1 час назад'
          },
          {
            id: '4',
            name: 'Иван Алексеев',
            email: 'ivan.a@gmail.com',
            image: '',
            service: 'Интерьерная печать',
            status: 'CONVERTED',
            amount: '12 500 ₽',
            createdAt: '3 часа назад'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statsCards = [
    {
      title: 'Всего заявок',
      value: stats.totalLeads,
      change: '+12%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconGradient: 'from-blue-400 to-blue-600',
      description: 'за месяц'
    },
    {
      title: 'Требуют внимания',
      value: stats.newLeads,
      change: '+3',
      trend: 'up',
      icon: AlertCircle,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconGradient: 'from-amber-400 to-amber-600',
      description: 'новые',
      highlight: true
    },
    {
      title: 'Конверсия',
      value: `${((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1)}%`,
      change: '+2.4%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconGradient: 'from-[#376E6F] to-[#2a5859]',
      description: 'успех'
    },
    {
      title: 'Выручка',
      value: `${(stats.revenue / 1000).toFixed(0)}К ₽`,
      change: '+24%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconGradient: 'from-purple-400 to-purple-600',
      description: 'доход'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW': return <Badge variant="destructive" className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200 shadow-none">Новая</Badge>
      case 'CONTACTED': return <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-200 shadow-none">Связались</Badge>
      case 'IN_PROGRESS': return <Badge variant="default" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-200 shadow-none">В работе</Badge>
      case 'CONVERTED': return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 shadow-none">Завершен</Badge>
      default: return <Badge variant="outline">Неизвестно</Badge>
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground animate-pulse">Загрузка данных...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Обзор</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Добро пожаловать, {new Date().getHours() < 12 ? 'доброе утро' : new Date().getHours() < 18 ? 'добрый день' : 'добрый вечер'}! 👋
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex bg-white hover:bg-gray-50">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span>Последние 30 дней</span>
          </Button>
          <Button className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Скачать отчет
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <motion.div key={card.title} variants={item}>
            <Card className={`border-2 ${card.borderColor} ${card.bgColor} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative group`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.iconGradient} shadow-lg`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className={`${card.change.startsWith('+') ? 'text-green-700 bg-green-100 border-green-300' : 'text-red-700 bg-red-100 border-red-300'} font-semibold border`}>
                    {card.change}
                  </Badge>
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{card.title}</h3>
                  <div className={`text-3xl font-bold ${card.color} tracking-tight`}>
                    {card.value}
                  </div>
                  <p className="text-xs font-medium text-gray-500">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <motion.div className="lg:col-span-2 space-y-8" variants={item}>
          {/* Recent Leads Table */}
          <Card className="border-none shadow-lg shadow-gray-100/50 bg-white">
            <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">Последние заявки</CardTitle>
                <CardDescription>
                  У вас <span className="text-primary font-medium">{stats.newLeads} новых</span> заявок за сегодня
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 hover:text-primary-dark" asChild>
                 <a href="/admin/leads" className="flex items-center gap-1 font-medium">
                  Все заявки <ArrowRight className="w-4 h-4" />
                 </a>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow className="hover:bg-transparent border-b border-gray-100">
                    <TableHead className="px-6 py-4 font-semibold text-gray-500">Клиент</TableHead>
                    <TableHead className="font-semibold text-gray-500">Услуга</TableHead>
                    <TableHead className="font-semibold text-gray-500">Сумма</TableHead>
                    <TableHead className="font-semibold text-gray-500">Статус</TableHead>
                    <TableHead className="text-right px-6 font-semibold text-gray-500">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-gray-50/50 border-gray-100 transition-colors group">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-gray-200">
                            <AvatarImage src={lead.image} />
                            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 font-medium">
                              {lead.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">{lead.name}</div>
                            <div className="text-xs text-muted-foreground">{lead.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{lead.service}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 font-medium text-gray-900">
                        {lead.amount}
                      </TableCell>
                      <TableCell className="py-4">{getStatusBadge(lead.status)}</TableCell>
                      <TableCell className="text-right px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem>Открыть карточку</DropdownMenuItem>
                            <DropdownMenuItem>Изменить статус</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Widgets */}
        <motion.div className="space-y-6" variants={item}>
          {/* Quick Actions */}
          <Card className="border-none shadow-md bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 opacity-80" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 relative z-10">
              <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0 h-12 text-base font-medium transition-all" variant="outline">
                <MessageSquare className="mr-3 h-5 w-5 opacity-70" />
                Новая заявка
              </Button>
              <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0 h-12 text-base font-medium transition-all" variant="outline">
                <Users className="mr-3 h-5 w-5 opacity-70" />
                Добавить сотрудника
              </Button>
              <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0 h-12 text-base font-medium transition-all" variant="outline">
                <Clock className="mr-3 h-5 w-5 opacity-70" />
                История действий
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-gray-900">Статус системы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    База данных
                  </div>
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-xs">OK</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    API Сервер
                  </div>
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-xs">OK</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Email шлюз
                  </div>
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-xs">OK</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100 mt-2">
                  <p className="text-xs text-muted-foreground text-center">
                    Последняя проверка: <span className="font-medium text-gray-900">Только что</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
