'use client'

import { useState, useEffect } from 'react'
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
  Calendar,
  User,
  MessageCircle,
  FileText
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

interface BlogPost {
  id: string
  title: string
  slug: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  isPublished: boolean
  publishedAt?: string
  views: number
  comments: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setPosts([
        {
          id: '1',
          title: 'Тренды наружной рекламы в 2024 году',
          slug: 'outdoor-trends-2024',
          author: { name: 'Иван Петров' },
          category: 'trends',
          isPublished: true,
          publishedAt: '2024-01-15',
          views: 1250,
          comments: 8
        },
        {
          id: '2',
          title: 'Как выбрать правильный шрифт',
          slug: 'choose-font',
          author: { name: 'Анна Сидорова' },
          category: 'design',
          isPublished: true,
          publishedAt: '2024-01-12',
          views: 890,
          comments: 12
        },
        {
            id: '3',
            title: 'Новые технологии печати',
            slug: 'printing-tech',
            author: { name: 'Михаил Кузнецов' },
            category: 'technology',
            isPublished: false,
            views: 0,
            comments: 0
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPosts.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredPosts.map(p => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleDelete = (ids: string[]) => {
    if (!confirm('Вы уверены?')) return
    setPosts(posts.filter(p => !ids.includes(p.id)))
    setSelectedIds([])
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Блог</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте статьями и публикациями
          </p>
        </div>
        <Link href="/admin/blog/editor">
          <Button className="bg-accent text-white hover:bg-accent/90 shadow-lg">
            <Plus className="mr-2 h-4 w-4" /> Новая статья
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Всего статей</CardTitle>
            <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{posts.length}</div>
            <p className="text-xs text-blue-600 mt-1 font-medium">В базе данных</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow border-2 border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Просмотры</CardTitle>
                <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
                  <Eye className="h-4 w-4 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-green-900">{posts.reduce((acc, p) => acc + p.views, 0).toLocaleString()}</div>
                <p className="text-xs text-green-600 mt-1 font-medium">Всего просмотров</p>
            </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow border-2 border-purple-200 bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Комментарии</CardTitle>
                <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-purple-900">{posts.reduce((acc, p) => acc + p.comments, 0)}</div>
                <p className="text-xs text-purple-600 mt-1 font-medium">Всего комментариев</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Статьи</CardTitle>
            <div className="flex items-center gap-2">
              {selectedIds.length > 0 && (
                 <div className="flex items-center gap-2 mr-4 bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm animate-in fade-in">
                   <span className="font-medium">{selectedIds.length} выбрано</span>
                   <Button 
                     variant="ghost" 
                     size="sm" 
                     onClick={() => handleDelete(selectedIds)}
                     className="h-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                   >
                     <Trash2 className="mr-2 h-3 w-3" />
                   </Button>
                 </div>
              )}
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Поиск..." 
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
          <div className="rounded-md border-2 border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow className="border-b-2 border-gray-200 hover:bg-gray-100">
                  <TableHead className="w-[50px] border-r border-gray-200">
                    <Checkbox 
                      checked={selectedIds.length === filteredPosts.length && filteredPosts.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 border-r border-gray-200">Заголовок</TableHead>
                  <TableHead className="font-semibold text-gray-600 border-r border-gray-200">Автор</TableHead>
                  <TableHead className="font-semibold text-gray-600 border-r border-gray-200">Категория</TableHead>
                  <TableHead className="font-semibold text-gray-600 border-r border-gray-200">Статус</TableHead>
                  <TableHead className="font-semibold text-gray-600 border-r border-gray-200">Дата</TableHead>
                  <TableHead className="text-right font-semibold text-gray-600">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">Загрузка...</TableCell>
                  </TableRow>
                ) : filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">Статей не найдено.</TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id} className="border-b border-gray-200">
                      <TableCell className="border-r border-gray-100">
                        <Checkbox 
                          checked={selectedIds.includes(post.id)}
                          onCheckedChange={() => toggleSelect(post.id)}
                        />
                      </TableCell>
                      <TableCell className="border-r border-gray-100">
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>/{post.slug}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
                        </div>
                      </TableCell>
                      <TableCell className="border-r border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                                {post.author.name.charAt(0)}
                            </div>
                            <span className="text-sm">{post.author.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="border-r border-gray-100">
                        <Badge variant="outline" className="bg-gray-50">{post.category}</Badge>
                      </TableCell>
                      <TableCell className="border-r border-gray-100">
                         {post.isPublished ? (
                            <Badge variant="default" className="bg-green-500 hover:bg-green-600">Опубликовано</Badge>
                         ) : (
                            <Badge variant="secondary">Черновик</Badge>
                         )}
                      </TableCell>
                      <TableCell className="border-r border-gray-100">
                        <div className="text-sm">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/blog/editor?id=${post.id}`}>
                                <Edit className="mr-2 h-4 w-4" /> Редактировать
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
                              <ExternalLink className="mr-2 h-4 w-4" /> Просмотр
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete([post.id])}
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
