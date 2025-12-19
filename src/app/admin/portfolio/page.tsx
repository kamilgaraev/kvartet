'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  Eye,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Portfolio {
  id: string
  title: string
  slug: string
  description: string
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
  const [selectedIds, setSelectedIds] = useState<string[]>([])

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

  const filteredPortfolio = portfolio.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPortfolio.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredPortfolio.map(p => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleDelete = async (ids: string[]) => {
    if (!confirm('Вы уверены? Это действие нельзя отменить.')) return

    // В реальном приложении здесь был бы API запрос
    // await fetch('/api/admin/portfolio/delete', { body: JSON.stringify({ ids }) })
    
    // Эмуляция удаления
    setPortfolio(portfolio.filter(p => !ids.includes(p.id)))
    setSelectedIds([])
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Портфолио</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте проектами, кейсами и черновиками
          </p>
        </div>
        <Link href="/admin/portfolio/editor">
          <Button className="bg-primary text-white hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Добавить проект
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Проекты</CardTitle>
            <div className="flex items-center gap-2">
              {selectedIds.length > 0 && (
                 <div className="flex items-center gap-2 mr-4 bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm animate-in fade-in slide-in-from-right-5">
                   <span className="font-medium">{selectedIds.length} выбрано</span>
                   <Button 
                     variant="ghost" 
                     size="sm" 
                     onClick={() => handleDelete(selectedIds)}
                     className="h-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                   >
                     <Trash2 className="mr-2 h-3 w-3" /> Удалить
                   </Button>
                 </div>
              )}
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Поиск проектов..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedIds.length === filteredPortfolio.length && filteredPortfolio.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Проект</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Год</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Загрузка...
                    </TableCell>
                  </TableRow>
                ) : filteredPortfolio.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Проектов не найдено.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPortfolio.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedIds.includes(project.id)}
                          onCheckedChange={() => toggleSelect(project.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                           {project.image ? (
                             <img src={project.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                           ) : (
                             <div className="w-10 h-10 rounded-lg bg-gray-100" />
                           )}
                           <div>
                             <div className="font-medium text-gray-900">{project.title}</div>
                             <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                               {project.slug}
                             </div>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>{project.clientName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {project.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {project.active ? (
                            <Badge variant="default" className="bg-green-500 hover:bg-green-600">Опубликован</Badge>
                          ) : (
                            <Badge variant="secondary">Черновик</Badge>
                          )}
                          {project.popular && (
                             <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">HIT</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{project.year}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id)}>
                              Копировать ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/portfolio/editor?id=${project.id}`}>
                                <Edit className="mr-2 h-4 w-4" /> Редактировать
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`/portfolio/${project.slug}`, '_blank')}>
                              <ExternalLink className="mr-2 h-4 w-4" /> Просмотр
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleDelete([project.id])}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
