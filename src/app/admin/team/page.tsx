'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Users } from 'lucide-react'
import ImageUpload from '../components/ImageUpload'

interface TeamMember {
  id: string
  name: string
  position: string
  bio?: string
  photo?: string
  email?: string
  phone?: string
  vk?: string
  telegram?: string
  instagram?: string
  linkedin?: string
  active: boolean
  order: number
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null)

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const response = await fetch('/api/admin/team')
      if (response.ok) {
        setMembers(await response.json())
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: Partial<TeamMember>) => {
    const url = '/api/admin/team'
    const method = editingItem ? 'PUT' : 'POST'
    const body = editingItem ? { ...data, id: editingItem.id } : data

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      await loadMembers()
      setIsEditing(false)
      setEditingItem(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить?')) return
    await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' })
    await loadMembers()
  }

  if (loading) return <div>Загрузка...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Команда</h1>
          <p className="text-gray-600 mt-1">Управление членами команды</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null)
            setIsEditing(true)
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить</span>
        </button>
      </div>

      {isEditing ? (
        <TeamMemberForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false)
            setEditingItem(null)
          }}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                {member.photo && (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{member.position}</p>
                {member.bio && (
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{member.bio}</p>
                )}
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.email && (
                    <span className="text-xs bg-primary-bg text-primary px-2 py-1 rounded">📧</span>
                  )}
                  {member.phone && (
                    <span className="text-xs bg-primary-bg text-primary px-2 py-1 rounded">📱</span>
                  )}
                  {member.vk && (
                    <span className="text-xs bg-primary-bg text-primary px-2 py-1 rounded">VK</span>
                  )}
                  {member.telegram && (
                    <span className="text-xs bg-primary-bg text-primary px-2 py-1 rounded">TG</span>
                  )}
                  {member.instagram && (
                    <span className="text-xs bg-primary-bg text-primary px-2 py-1 rounded">IG</span>
                  )}
                </div>

                <div className="flex space-x-2 w-full">
                  <button
                    onClick={() => {
                      setEditingItem(member)
                      setIsEditing(true)
                    }}
                    className="flex-1 p-2 text-gray-600 hover:text-primary hover:bg-primary-bg rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
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

function TeamMemberForm({ item, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(
    item || {
      name: '',
      position: '',
      bio: '',
      photo: '',
      email: '',
      phone: '',
      vk: '',
      telegram: '',
      instagram: '',
      linkedin: '',
      active: true,
      order: 0,
    }
  )

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{item ? 'Редактировать' : 'Новый член команды'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Имя *</label>
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Должность *</label>
            <input
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Биография</label>
          <textarea
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <ImageUpload
          label="Фото"
          value={formData.photo || ''}
          onChange={(url) => setFormData({ ...formData, photo: url })}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Телефон</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Социальные сети</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">VK</label>
              <input
                value={formData.vk}
                onChange={(e) => setFormData({ ...formData, vk: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://vk.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Telegram</label>
              <input
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Instagram</label>
              <input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">LinkedIn</label>
              <input
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
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

