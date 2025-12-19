'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import { Plus, Edit2, Trash2, ExternalLink, Eye, EyeOff, GripVertical, Image as ImageIcon, Check, X } from 'lucide-react'
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
    if (!confirm('Удалить?')) return
    await fetch(`/api/admin/partners?id=${id}`, { method: 'DELETE' })
    await loadPartners()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Клиенты и партнеры</h1>
          <p className="text-muted-foreground mt-1">Управление логотипами клиентов, отображаемыми на сайте</p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null)
            setIsEditing(true)
          }}
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего клиентов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Активных: {partners.filter(p => p.active).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">С логотипами</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.filter(p => p.logo).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Без логотипа: {partners.filter(p => !p.logo).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">С сайтами</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.filter(p => p.website).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              С описанием: {partners.filter(p => p.description).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Неактивных</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {partners.filter(p => !p.active).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
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
        <Card>
          <CardHeader>
            <CardTitle>Список клиентов</CardTitle>
            <CardDescription>
              Перетаскивайте карточки для изменения порядка отображения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Reorder.Group 
              axis="y" 
              values={partners} 
              onReorder={setPartners}
              className="space-y-4"
            >
              {partners.map((partner) => (
                <Reorder.Item 
                  key={partner.id} 
                  value={partner}
                  className="bg-white rounded-xl border-2 border-gray-100 hover:border-primary transition-all cursor-move"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-5 h-5 text-gray-400 shrink-0" />
                      
                      <div className="w-24 h-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain p-2"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {partner.name}
                          </h3>
                          {partner.active ? (
                            <Badge variant="default" className="shrink-0">
                              <Eye className="w-3 h-3 mr-1" />
                              Активен
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="shrink-0">
                              <EyeOff className="w-3 h-3 mr-1" />
                              Скрыт
                            </Badge>
                          )}
                        </div>
                        
                        {partner.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {partner.description}
                          </p>
                        )}

                        {partner.website && (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark mt-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="truncate">{partner.website}</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingItem(partner)
                            setIsEditing(true)
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(partner.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {partners.length === 0 && (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Нет клиентов</p>
                <p className="text-sm mt-1">Добавьте первого клиента, чтобы начать</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PartnerForm({ item, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(
    item || {
      name: '',
      logo: '',
      website: '',
      description: '',
      active: true,
      order: 0,
    }
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item ? 'Редактировать клиента' : 'Новый клиент'}</CardTitle>
        <CardDescription>
          {item ? 'Обновите информацию о клиенте' : 'Добавьте нового клиента/партнера'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">
                Название компании <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ООО Сбербанк"
              />
            </div>

            <div className="md:col-span-2">
              <ImageUpload
                label="Логотип компании *"
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
              />
              {formData.logo && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-center">
                  <img
                    src={formData.logo}
                    alt="Предпросмотр"
                    className="max-w-[200px] max-h-[100px] object-contain"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website">Сайт компании</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Краткое описание компании или партнерства..."
              />
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

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Отмена
            </Button>
            <Button type="submit">
              <Check className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

