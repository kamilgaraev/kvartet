'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Users } from 'lucide-react'
import ImageUpload from '../components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

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

  const activeMembers = members.filter(m => m.active).length
  const withPhotos = members.filter(m => m.photo).length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Команда</h1>
          <p className="text-muted-foreground mt-2">
            Управление членами команды
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
          Добавить сотрудника
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Всего сотрудников</CardTitle>
            <Users className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{members.length}</div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              ✓ Активных: {activeMembers}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">С фотографиями</CardTitle>
            <Users className="w-5 h-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{withPhotos}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Без фото: {members.length - withPhotos}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">С соц. сетями</CardTitle>
            <Users className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {members.filter(m => m.vk || m.telegram || m.instagram).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Связаны в соц. сетях
            </p>
          </CardContent>
        </Card>
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
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all"
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

                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-accent hover:text-white hover:border-accent"
                    onClick={() => {
                      setEditingItem(member)
                      setIsEditing(true)
                    }}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-red-500 hover:text-white hover:border-red-500"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
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
    <Card className="border-2 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 border-b">
        <CardTitle className="text-2xl">{item ? 'Редактировать сотрудника' : 'Новый член команды'}</CardTitle>
        <CardDescription>
          {item ? `Обновите информацию о ${item.name}` : 'Добавьте нового члена команды'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Имя *</label>
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Должность *</label>
            <input
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Биография</label>
          <textarea
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Телефон</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                placeholder="https://vk.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Telegram</label>
              <input
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Instagram</label>
              <input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">LinkedIn</label>
              <input
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
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

