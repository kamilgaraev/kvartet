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
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Блог</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте статьями и публикациями
          </p>
        </div>
        <Link href="/admin/blog/editor">
          <Button className="bg-primary text-white hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Новая статья
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего статей</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Просмотры</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{posts.reduce((acc, p) => acc + p.views, 0).toLocaleString()}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Комментарии</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{posts.reduce((acc, p) => acc + p.comments, 0)}</div>
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedIds.length === filteredPosts.length && filteredPosts.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Автор</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
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
                    <TableRow key={post.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedIds.includes(post.id)}
                          onCheckedChange={() => toggleSelect(post.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>/{post.slug}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                                {post.author.name.charAt(0)}
                            </div>
                            <span className="text-sm">{post.author.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">{post.category}</Badge>
                      </TableCell>
                      <TableCell>
                         {post.isPublished ? (
                            <Badge variant="default" className="bg-green-500 hover:bg-green-600">Опубликовано</Badge>
                         ) : (
                            <Badge variant="secondary">Черновик</Badge>
                         )}
                      </TableCell>
                      <TableCell>
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
