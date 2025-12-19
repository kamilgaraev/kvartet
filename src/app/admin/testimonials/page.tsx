'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Star, Video, Eye, Users, MessageSquare } from 'lucide-react'
import ImageUpload from '../components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Testimonial {
  id: string
  name: string
  position: string
  rating: number
  text: string
  imageUrl?: string
  project: string
  result: string
  budget: string
  videoReview: boolean
  videoUrl?: string
  active: boolean
  order: number
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error loading testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: Partial<Testimonial>) => {
    try {
      const url = '/api/admin/testimonials'
      const method = editingItem ? 'PUT' : 'POST'
      const body = editingItem ? { ...data, id: editingItem.id } : data

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        await loadTestimonials()
        setIsEditing(false)
        setEditingItem(null)
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
      alert('Ошибка при сохранении')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этот отзыв?')) return

    try {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await loadTestimonials()
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const activeCount = testimonials.filter(t => t.active).length
  const withVideo = testimonials.filter(t => t.videoReview).length
  const avgRating = testimonials.length > 0 
    ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
    : 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Отзывы</h1>
          <p className="text-muted-foreground mt-2">
            Управление отзывами клиентов
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
          Добавить отзыв
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Всего отзывов</CardTitle>
            <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{testimonials.length}</div>
            <p className="text-xs text-blue-600 mt-1 font-medium">
              В базе данных
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Активных</CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{activeCount}</div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              Отображается на сайте
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Видео отзывов</CardTitle>
            <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg">
              <Video className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{withVideo}</div>
            <p className="text-xs text-purple-600 mt-1 font-medium">
              С видео материалом
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-amber-200 bg-amber-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Средний рейтинг</CardTitle>
            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-amber-600 mt-1 font-medium">
              Из 5 возможных
            </p>
          </CardContent>
        </Card>
      </div>

      {isEditing ? (
        <TestimonialForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false)
            setEditingItem(null)
          }}
        />
      ) : (
        <div className="grid gap-6">
          {testimonials.length === 0 ? (
            <Card className="border-2">
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20 text-muted-foreground" />
                <p className="text-lg font-medium text-muted-foreground">Нет отзывов</p>
                <p className="text-sm text-muted-foreground mt-1">Добавьте первый отзыв</p>
              </CardContent>
            </Card>
          ) : (
            testimonials.map((item, index) => (
              <TestimonialCard
                key={item.id}
                item={item}
                index={index}
                onEdit={() => {
                  setEditingItem(item)
                  setIsEditing(true)
                }}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

function TestimonialCard({
  item,
  index,
  onEdit,
  onDelete,
}: {
  item: Testimonial
  index: number
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all"
    >
      <div className="flex items-start space-x-4">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-20 rounded-xl object-cover ring-2 ring-gray-200"
          />
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.position}</p>
            </div>
            <div className="flex items-center gap-2">
              {item.videoReview && (
                <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/30">
                  <Video className="w-3 h-3 mr-1" />
                  Видео
                </Badge>
              )}
              {!item.active && (
                <Badge variant="secondary">
                  Неактивен
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
                className="hover:bg-accent hover:text-white"
              >
                <Edit2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                className="hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-1 mb-3">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
            ))}
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">{item.text}</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
              <p className="text-xs text-blue-600 mb-1 font-medium">Проект</p>
              <p className="text-sm font-bold text-blue-900">{item.project}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border-2 border-green-200">
              <p className="text-xs text-green-600 mb-1 font-medium">Результат</p>
              <p className="text-sm font-bold text-green-900">{item.result}</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border-2 border-amber-200">
              <p className="text-xs text-amber-600 mb-1 font-medium">Бюджет</p>
              <p className="text-sm font-bold text-amber-900">{item.budget}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TestimonialForm({
  item,
  onSave,
  onCancel,
}: {
  item: Testimonial | null
  onSave: (data: Partial<Testimonial>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Testimonial>>(
    item ? {
      ...item,
      imageUrl: item.imageUrl || '',
      videoUrl: item.videoUrl || '',
    } : {
      name: '',
      position: '',
      rating: 5,
      text: '',
      imageUrl: '',
      project: '',
      result: '',
      budget: '',
      videoReview: false,
      videoUrl: '',
      active: true,
      order: 0,
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 border-b">
        <CardTitle className="text-2xl">{item ? 'Редактировать отзыв' : 'Новый отзыв'}</CardTitle>
        <CardDescription>
          {item ? 'Обновите информацию об отзыве' : 'Добавьте новый отзыв клиента'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Имя клиента *
            </label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-gray-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Должность *
            </label>
            <input
              type="text"
              required
              value={formData.position || ''}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-gray-900 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Отзыв *
          </label>
          <textarea
            required
            rows={4}
            value={formData.text || ''}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-gray-900 bg-white resize-none"
          />
        </div>

        <ImageUpload
          label="Фото клиента"
          value={formData.imageUrl || ''}
          onChange={(url) => setFormData({ ...formData, imageUrl: url })}
        />

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Проект *
            </label>
            <input
              type="text"
              required
              value={formData.project || ''}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Результат *
            </label>
            <input
              type="text"
              required
              value={formData.result || ''}
              onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="+250% узнаваемости"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Бюджет *
            </label>
            <input
              type="text"
              required
              value={formData.budget || ''}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="150 000 ₽"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Рейтинг
            </label>
            <select
              value={formData.rating || 5}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} звезд
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Порядок
            </label>
            <input
              type="number"
              value={formData.order || 0}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div className="flex items-center space-x-4 pt-8">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active ?? true}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-semibold text-gray-700">Активен</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.videoReview ?? false}
                onChange={(e) => setFormData({ ...formData, videoReview: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-semibold text-gray-700">Видео отзыв</span>
            </label>
          </div>
        </div>

        {formData.videoReview && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL видео
            </label>
            <input
              type="url"
              value={formData.videoUrl || ''}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="https://youtube.com/..."
            />
          </div>
        )}

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

