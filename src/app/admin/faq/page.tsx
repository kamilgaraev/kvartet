'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, HelpCircle, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  active: boolean
  order: number
}

export default function FAQPage() {
  const [items, setItems] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<FAQ | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const response = await fetch('/api/admin/faq')
      if (response.ok) {
        setItems(await response.json())
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: Partial<FAQ>) => {
    const url = '/api/admin/faq'
    const method = editingItem ? 'PUT' : 'POST'
    const body = editingItem ? { ...data, id: editingItem.id } : data

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      await loadItems()
      setIsEditing(false)
      setEditingItem(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить?')) return
    await fetch(`/api/admin/faq?id=${id}`, { method: 'DELETE' })
    await loadItems()
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(items.map(i => i.category)))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ</h1>
          <p className="text-muted-foreground mt-2">
            Управление часто задаваемыми вопросами
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null)
            setIsEditing(true)
          }}
          className="bg-accent hover:bg-accent/90 text-white shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить вопрос
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Всего вопросов</CardTitle>
            <HelpCircle className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{items.length}</div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              ✓ Активных: {items.filter(i => i.active).length}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Категории</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Badge key={cat} variant="outline" className="bg-gray-50">
                  {cat} ({items.filter(i => i.category === cat).length})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {!isEditing && (
        <Card className="border-2">
          <CardHeader className="border-b bg-gray-50/50">
            <div className="flex items-center justify-between">
              <CardTitle>Список вопросов</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Поиск..."
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                  <option value="all">Все категории</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-accent/30 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20">
                          {item.category}
                        </Badge>
                        {!item.active && (
                          <Badge variant="secondary" className="bg-gray-100">
                            Скрыт
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => { setEditingItem(item); setIsEditing(true); }}
                        className="text-gray-600 hover:text-accent hover:bg-accent/10"
                      >
                        <Edit2 className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-600 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">Вопросы не найдены</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {isEditing && (
        <FAQForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}

function FAQForm({ item, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(
    item || {
      question: '',
      answer: '',
      category: 'general',
      active: true,
      order: 0,
    }
  )

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 border-b">
        <CardTitle className="text-2xl">{item ? 'Редактировать вопрос' : 'Новый вопрос'}</CardTitle>
        <CardDescription>
          {item ? 'Обновите информацию о вопросе' : 'Добавьте новый вопрос в базу знаний'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question" className="text-base font-semibold">
              Вопрос <span className="text-red-500">*</span>
            </Label>
            <Input
              id="question"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="h-12 text-base"
              placeholder="Например: Как оформить заказ?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer" className="text-base font-semibold">
              Ответ <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="answer"
              required
              rows={6}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="text-base resize-none"
              placeholder="Подробный ответ на вопрос..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold">Категория</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="h-12"
                placeholder="general, услуги, оплата..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order" className="text-base font-semibold">Порядок</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="h-12"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: !!checked })}
            />
            <Label htmlFor="active" className="font-normal cursor-pointer">
              Показывать на сайте
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t-2">
            <Button type="button" variant="outline" onClick={onCancel} size="lg" className="min-w-[120px]">
              Отмена
            </Button>
            <Button type="submit" size="lg" className="min-w-[150px] bg-accent hover:bg-accent/90 text-white shadow-lg">
              {item ? 'Обновить' : 'Создать'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
