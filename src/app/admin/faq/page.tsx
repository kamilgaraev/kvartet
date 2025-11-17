'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2 } from 'lucide-react'

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

  if (loading) return <div>Загрузка...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">FAQ</h1>
        <button
          onClick={() => {
            setEditingItem(null)
            setIsEditing(true)
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить вопрос</span>
        </button>
      </div>

      {isEditing ? (
        <FAQForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false)
            setEditingItem(null)
          }}
        />
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-700 mb-2">{item.answer}</p>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => { setEditingItem(item); setIsEditing(true); }} className="p-2 text-gray-600 hover:text-primary">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-600 hover:text-red-500">
                    <Trash2 className="w-5 h-5" />
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
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{item ? 'Редактировать' : 'Новый вопрос'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Вопрос *</label>
          <input
            required
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Ответ *</label>
          <textarea
            required
            rows={4}
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Категория</label>
            <input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Порядок</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="w-4 h-4"
          />
          <span>Активен</span>
        </label>
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 border rounded-lg">Отмена</button>
          <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg">Сохранить</button>
        </div>
      </form>
    </div>
  )
}

