'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react'
import ImageUpload from '../components/ImageUpload'

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

  if (loading) return <div>Загрузка...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Партнеры</h1>
          <p className="text-gray-600 mt-1">Управление партнерами и клиентами</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null)
            setIsEditing(true)
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить партнера</span>
        </button>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center">
                {partner.logo && (
                  <div className="w-full h-32 flex items-center justify-center mb-4 bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain p-4"
                    />
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{partner.name}</h3>
                
                {partner.description && (
                  <p className="text-sm text-gray-600 text-center mb-3 line-clamp-2">
                    {partner.description}
                  </p>
                )}

                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-primary hover:text-primary-dark mb-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Сайт</span>
                  </a>
                )}

                {!partner.active && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mb-3">
                    Неактивен
                  </span>
                )}

                <div className="flex space-x-2 w-full mt-auto">
                  <button
                    onClick={() => {
                      setEditingItem(partner)
                      setIsEditing(true)
                    }}
                    className="flex-1 p-2 text-gray-600 hover:text-primary hover:bg-primary-bg rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="flex-1 p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{item ? 'Редактировать партнера' : 'Новый партнер'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Название *</label>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <ImageUpload
          label="Логотип *"
          value={formData.logo}
          onChange={(url) => setFormData({ ...formData, logo: url })}
        />

        <div>
          <label className="block text-sm font-semibold mb-2">Сайт</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Описание</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Порядок</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Активен</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button type="button" onClick={onCancel} className="px-6 py-2 border rounded-lg">Отмена</button>
          <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg">Сохранить</button>
        </div>
      </form>
    </div>
  )
}

