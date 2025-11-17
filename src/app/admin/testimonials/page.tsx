'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Star, Video, Eye } from 'lucide-react'
import ImageUpload from '../components/ImageUpload'

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Отзывы</h1>
          <p className="text-gray-600 mt-1">Управление отзывами клиентов</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null)
            setIsEditing(true)
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить отзыв</span>
        </button>
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
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              item={item}
              onEdit={() => {
                setEditingItem(item)
                setIsEditing(true)
              }}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TestimonialCard({
  item,
  onEdit,
  onDelete,
}: {
  item: Testimonial
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start space-x-4">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.position}</p>
            </div>
            <div className="flex items-center space-x-2">
              {item.videoReview && (
                <span className="flex items-center space-x-1 text-sm text-primary bg-primary-bg px-2 py-1 rounded-full">
                  <Video className="w-4 h-4" />
                  <span>Видео</span>
                </span>
              )}
              {!item.active && (
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Неактивен
                </span>
              )}
              <button
                onClick={onEdit}
                className="p-2 text-gray-600 hover:text-primary hover:bg-primary-bg rounded-lg transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-1 mb-3">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-warning fill-current" />
            ))}
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">{item.text}</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary-bg rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Проект</p>
              <p className="text-sm font-semibold text-gray-900">{item.project}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Результат</p>
              <p className="text-sm font-semibold text-success">{item.result}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Бюджет</p>
              <p className="text-sm font-semibold text-gray-900">{item.budget}</p>
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
    item || {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {item ? 'Редактировать отзыв' : 'Новый отзыв'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Имя клиента *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Должность *
            </label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
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
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
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
              value={formData.project}
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
              value={formData.result}
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
              value={formData.budget}
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
              value={formData.rating}
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
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div className="flex items-center space-x-4 pt-8">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-semibold text-gray-700">Активен</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.videoReview}
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
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              placeholder="https://youtube.com/..."
            />
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Сохранить
          </button>
        </div>
      </form>
    </motion.div>
  )
}

