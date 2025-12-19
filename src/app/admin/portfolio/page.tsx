'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  LayoutGrid,
  List as ListIcon,
  CheckSquare,
  X
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

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
    if (!confirm(`Вы уверены, что хотите удалить ${ids.length} проект(ов)?`)) return
    
    // Эмуляция удаления
    setPortfolio(portfolio.filter(p => !ids.includes(p.id)))
    setSelectedIds([])
  }

  const categories = Array.from(new Set(portfolio.map(p => p.category))).filter(Boolean)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Портфолио</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте проектами, кейсами и черновиками
          </p>
        </div>
        <Link href="/admin/portfolio/editor">
          <Button className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
            <Plus className="mr-2 h-4 w-4" /> Добавить проект
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Поиск проектов..." 
                  className="pl-9 bg-white border-gray-200 focus:border-primary/20 transition-all" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    <Filter className="h-4 w-4 mr-2" />
                    Фильтр
                    {categoryFilter !== 'all' && (
                      <span className="ml-2 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">1</span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Категории</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                    Все категории
                    {categoryFilter === 'all' && <CheckSquare className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  {categories.map(cat => (
                    <DropdownMenuItem key={cat} onClick={() => setCategoryFilter(cat)}>
                      {cat}
                      {categoryFilter === cat && <CheckSquare className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 p-1 rounded-lg flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 px-2 ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                  onClick={() => setViewMode('list')}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 px-2 ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters & Selection */}
          <AnimatePresence>
            {(selectedIds.length > 0 || categoryFilter !== 'all') && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-4 pt-4 mt-2">
                  {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2 bg-primary/5 text-primary px-3 py-1.5 rounded-md text-sm font-medium border border-primary/10">
                      <span className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4" />
                        {selectedIds.length} выбрано
                      </span>
                      <div className="h-4 w-px bg-primary/20 mx-1" />
                      <button 
                        onClick={() => handleDelete(selectedIds)}
                        className="text-red-600 hover:text-red-700 hover:underline text-xs font-semibold uppercase tracking-wide flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Удалить
                      </button>
                    </div>
                  )}
                  
                  {categoryFilter !== 'all' && (
                    <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm border border-gray-200">
                      <span>Категория: <strong>{categoryFilter}</strong></span>
                      <button onClick={() => setCategoryFilter('all')} className="ml-1 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  {(selectedIds.length > 0 || categoryFilter !== 'all') && (
                    <Button variant="ghost" size="sm" onClick={() => {setSelectedIds([]); setCategoryFilter('all')}} className="text-xs text-muted-foreground hover:text-gray-900 h-8">
                      Сбросить все
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CardContent className="p-0">
          {viewMode === 'list' ? (
            <div className="rounded-md border-2 border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow className="border-b-2 border-gray-200 hover:bg-gray-100">
                  <TableHead className="w-[50px] pl-6 border-r border-gray-200">
                    <Checkbox 
                      checked={selectedIds.length === filteredPortfolio.length && filteredPortfolio.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="py-4 font-semibold text-gray-600 border-r border-gray-200">Проект</TableHead>
                  <TableHead className="py-4 font-semibold text-gray-600 border-r border-gray-200">Клиент</TableHead>
                  <TableHead className="py-4 font-semibold text-gray-600 border-r border-gray-200">Категория</TableHead>
                  <TableHead className="py-4 font-semibold text-gray-600 border-r border-gray-200">Статус</TableHead>
                  <TableHead className="py-4 font-semibold text-gray-600 text-right pr-6">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPortfolio.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium text-gray-900">Проектов не найдено</p>
                        <p className="text-sm max-w-sm mt-1">
                          Попробуйте изменить параметры поиска или фильтры
                        </p>
                        <Button variant="outline" className="mt-4" onClick={() => {setSearchTerm(''); setCategoryFilter('all')}}>
                          Очистить фильтры
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPortfolio.map((project) => (
                    <TableRow key={project.id} className="hover:bg-gray-50/50 border-b border-gray-200 transition-colors group">
                      <TableCell className="pl-6 border-r border-gray-100">
                        <Checkbox 
                          checked={selectedIds.includes(project.id)}
                          onCheckedChange={() => toggleSelect(project.id)}
                        />
                      </TableCell>
                      <TableCell className="py-4 border-r border-gray-100">
                        <div className="flex items-center gap-4">
                           <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                             {project.image ? (
                               <img src={project.image} alt="" className="w-full h-full object-cover" />
                             ) : (
                               <div className="flex items-center justify-center w-full h-full text-gray-300">
                                 <ImageIcon className="w-6 h-6" />
                               </div>
                             )}
                           </div>
                           <div>
                             <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{project.title}</div>
                             <div className="text-xs text-muted-foreground truncate max-w-[200px] flex items-center gap-2 mt-0.5">
                               <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono text-[10px]">/{project.slug}</span>
                               {project.popular && <span className="text-amber-500 font-medium flex items-center text-[10px]">★ HIT</span>}
                             </div>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 font-medium text-gray-700 border-r border-gray-100">{project.clientName}</TableCell>
                      <TableCell className="py-4 border-r border-gray-100">
                        <Badge variant="outline" className="bg-gray-50 font-normal text-gray-600 border-gray-200">
                          {project.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 border-r border-gray-100">
                        {project.active ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-sm text-green-700 font-medium">Опубликован</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-gray-300" />
                            <span className="text-sm text-gray-500 font-medium">Черновик</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/portfolio/editor?id=${project.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/10">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete([project.id])}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Действия</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id)}>
                                Копировать ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => window.open(`/portfolio/${project.slug}`, '_blank')}>
                                <ExternalLink className="mr-2 h-4 w-4" /> Просмотр на сайте
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPortfolio.map((project) => (
                <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden border-gray-200">
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {project.active ? (
                        <Badge className="bg-green-500 hover:bg-green-600 shadow-sm">Pub</Badge>
                      ) : (
                        <Badge variant="secondary" className="shadow-sm">Draft</Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description || 'Нет описания'}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="text-xs text-muted-foreground">
                        {project.clientName}
                      </div>
                      <div className="flex gap-1">
                        <Link href={`/admin/portfolio/editor?id=${project.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50" onClick={() => handleDelete([project.id])}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
