'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import { Plus, Edit2, Trash2, ExternalLink, Eye, EyeOff, GripVertical, Image as ImageIcon, Check, X, Users, Globe, FileText, AlertCircle } from 'lucide-react'
import ImageUpload from '../components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

interface Partner {
  id: string
  name: string
  logo: string
  website?: string
  description?: string
  active: boolean
  order: number
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<Partner | null>(null)

  useEffect(() => {
    loadPartners()
  }, [])

  const loadPartners = async () => {
    try {
      const response = await fetch('/api/admin/partners')
      if (response.ok) {
        setPartners(await response.json())
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: Partial<Partner>) => {
    const url = '/api/admin/partners'
    const method = editingItem ? 'PUT' : 'POST'
    const body = editingItem ? { ...data, id: editingItem.id } : data

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      await loadPartners()
      setIsEditing(false)
      setEditingItem(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить клиента?')) return
    await fetch(`/api/admin/partners?id=${id}`, { method: 'DELETE' })
    await loadPartners()
  }

  const handleReorder = async (newOrder: Partner[]) => {
    setPartners(newOrder)
    
    const updates = newOrder.map((partner, index) => ({
      id: partner.id,
      order: newOrder.length - index
    }))

    try {
      await Promise.all(
        updates.map(update =>
          fetch('/api/admin/partners', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update),
          })
        )
      )
    } catch (error) {
      console.error('Error updating order:', error)
      await loadPartners()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Клиенты и партнеры</h1>
          <p className="text-gray-600 text-lg">Управление логотипами клиентов, отображаемыми на главной странице и в портфолио</p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null)
            setIsEditing(true)
          }}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Всего клиентов</CardTitle>
            <Users className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{partners.length}</div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              ✓ Активных: {partners.filter(p => p.active).length}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">С логотипами</CardTitle>
            <ImageIcon className="w-5 h-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{partners.filter(p => p.logo).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Без логотипа: {partners.filter(p => !p.logo).length}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">С сайтами</CardTitle>
            <Globe className="w-5 h-5 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{partners.filter(p => p.website).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              С описанием: {partners.filter(p => p.description).length}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow border-2 border-orange-200 bg-orange-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Неактивных</CardTitle>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {partners.filter(p => !p.active).length}
            </div>
            <p className="text-xs text-orange-600/70 mt-1 font-medium">
              Скрытых на сайте
            </p>
          </CardContent>
        </Card>
      </div>

      {isEditing ? (
        <PartnerForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false)
            setEditingItem(null)
          }}
        />
      ) : (
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Список клиентов</CardTitle>
                <CardDescription className="mt-1">
                  Перетаскивайте карточки для изменения порядка отображения на сайте
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {partners.length} {partners.length === 1 ? 'клиент' : partners.length < 5 ? 'клиента' : 'клиентов'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Reorder.Group 
              axis="y" 
              values={partners} 
              onReorder={handleReorder}
              className="space-y-3"
            >
              {partners.map((partner) => (
                <Reorder.Item 
                  key={partner.id} 
                  value={partner}
                  className="bg-white rounded-2xl border-2 border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="cursor-move hover:bg-gray-100 p-2 rounded-lg transition-colors">
                        <GripVertical className="w-6 h-6 text-gray-400" />
                      </div>
                      
                      <div className="w-32 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border-2 border-gray-100">
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain p-3"
                          />
                        ) : (
                          <ImageIcon className="w-10 h-10 text-gray-300" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {partner.name}
                          </h3>
                          {partner.active ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-300">
                              <Eye className="w-3 h-3 mr-1" />
                              Активен
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100">
                              <EyeOff className="w-3 h-3 mr-1" />
                              Скрыт
                            </Badge>
                          )}
                        </div>
                        
                        {partner.description && (
                          <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                            {partner.description}
                          </p>
                        )}

                        {partner.website && (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark hover:underline font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="truncate max-w-[300px]">{partner.website}</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <Button
                          variant="outline"
                          size="default"
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingItem(partner)
                            setIsEditing(true)
                          }}
                          className="hover:bg-accent hover:text-white hover:border-accent transition-all"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Редактировать
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(partner.id)
                          }}
                          className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {partners.length === 0 && (
              <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-2xl bg-gray-50">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-xl font-bold text-gray-900 mb-2">Нет клиентов</p>
                <p className="text-sm mb-6">Добавьте первого клиента, чтобы начать</p>
                <Button
                  onClick={() => {
                    setEditingItem(null)
                    setIsEditing(true)
                  }}
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Добавить первого клиента
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PartnerForm({ item, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: '',
    active: true,
    order: 0,
  })

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        logo: item.logo || '',
        website: item.website || '',
        description: item.description || '',
        active: item.active !== undefined ? item.active : true,
        order: item.order || 0,
      })
    } else {
      setFormData({
        name: '',
        logo: '',
        website: '',
        description: '',
        active: true,
        order: 0,
      })
    }
  }, [item])

  return (
    <Card className="shadow-xl border-2">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary-light/5 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{item ? 'Редактировать клиента' : 'Новый клиент'}</CardTitle>
            <CardDescription className="mt-1">
              {item ? `Обновите информацию о клиенте "${item.name}"` : 'Заполните информацию о новом клиенте/партнере'}
            </CardDescription>
          </div>
          {item && (
            <Badge variant="outline" className="text-sm">
              ID: {item.id.substring(0, 8)}...
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Название компании <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ООО Сбербанк, Газпром, Роснефть..."
                className="text-base h-12"
              />
              <p className="text-xs text-muted-foreground">
                Полное или сокращенное название компании-клиента
              </p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                Логотип компании <span className="text-red-500">*</span>
              </Label>
              <ImageUpload
                label=""
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
              />
              {formData.logo ? (
                <div className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">
                  <p className="text-sm font-medium text-gray-600">Предпросмотр логотипа:</p>
                  <img
                    src={formData.logo}
                    alt="Предпросмотр"
                    className="max-w-[250px] max-h-[120px] object-contain"
                  />
                  <Badge variant="outline" className="text-xs">
                    Так логотип будет выглядеть на сайте
                  </Badge>
                </div>
              ) : (
                <div className="mt-4 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm text-gray-500">Загрузите логотип компании</p>
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website" className="text-base font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Сайт компании
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.website || ''}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
                className="text-base h-12"
              />
              <p className="text-xs text-muted-foreground">
                Ссылка на официальный сайт компании (необязательно)
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Описание
              </Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Краткое описание компании, сферы деятельности или характера партнерства..."
                className="text-base resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Краткое описание для внутреннего использования (не отображается на сайте)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Порядок сортировки</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
              <p className="text-xs text-muted-foreground">
                Чем больше число, тем выше в списке
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: !!checked })}
              />
              <Label htmlFor="active" className="font-normal cursor-pointer">
                Отображать на сайте
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-8 border-t-2">
            <Button type="button" variant="outline" onClick={onCancel} size="lg" className="min-w-[120px]">
              <X className="w-4 h-4 mr-2" />
              Отмена
            </Button>
            <Button type="submit" size="lg" className="min-w-[150px] shadow-lg">
              <Check className="w-4 h-4 mr-2" />
              {item ? 'Обновить' : 'Создать'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

