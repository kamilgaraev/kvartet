'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Edit2, Trash2 } from 'lucide-react'

interface ContactInfo {
  id: string
  type: string
  label: string
  value: string
  icon?: string
  active: boolean
  order: number
}

interface SocialLink {
  id: string
  platform: string
  url: string
  icon?: string
  active: boolean
  order: number
}

export default function SettingsPage() {
  const [contacts, setContacts] = useState<ContactInfo[]>([])
  const [socials, setSocials] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [editingContact, setEditingContact] = useState<any>(null)
  const [editingSocial, setEditingSocial] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [contactsRes, socialsRes] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/social-links'),
      ])
      setContacts(await contactsRes.json())
      setSocials(await socialsRes.json())
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveContact = async (data: any) => {
    const method = editingContact?.id ? 'PUT' : 'POST'
    const body = editingContact?.id ? { ...data, id: editingContact.id } : data

    await fetch('/api/admin/contacts', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    
    setEditingContact(null)
    await loadData()
  }

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Удалить контакт?')) return
    await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' })
    await loadData()
  }

  const handleSaveSocial = async (data: any) => {
    const method = editingSocial?.id ? 'PUT' : 'POST'
    const body = editingSocial?.id ? { ...data, id: editingSocial.id } : data

    await fetch('/api/admin/social-links', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    
    setEditingSocial(null)
    await loadData()
  }

  const handleDeleteSocial = async (id: string) => {
    if (!confirm('Удалить социальную сеть?')) return
    await fetch(`/api/admin/social-links?id=${id}`, { method: 'DELETE' })
    await loadData()
  }

  if (loading) return <div>Загрузка...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-600 mt-1">Управление контактами и социальными сетями</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contacts */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Контактная информация</h2>
            <button
              onClick={() => setEditingContact({})}
              className="p-2 text-primary hover:bg-primary-bg rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {editingContact ? (
            <ContactForm
              item={editingContact}
              onSave={handleSaveContact}
              onCancel={() => setEditingContact(null)}
            />
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-start hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{contact.label}</div>
                    <div className="text-sm text-gray-600">{contact.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{contact.type}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => setEditingContact(contact)} className="p-1 text-gray-600 hover:text-primary transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteContact(contact.id)} className="p-1 text-gray-600 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Социальные сети</h2>
            <button
              onClick={() => setEditingSocial({})}
              className="p-2 text-primary hover:bg-primary-bg rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {editingSocial ? (
            <SocialForm
              item={editingSocial}
              onSave={handleSaveSocial}
              onCancel={() => setEditingSocial(null)}
            />
          ) : (
            <div className="space-y-3">
              {socials.map((social) => (
                <div key={social.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-start hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{social.platform}</div>
                    <div className="text-sm text-gray-600 break-all">{social.url}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => setEditingSocial(social)} className="p-1 text-gray-600 hover:text-primary transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteSocial(social.id)} className="p-1 text-gray-600 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ContactForm({ item, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(
    item.id ? item : {
      type: 'phone',
      label: '',
      value: '',
      icon: 'Phone',
      active: true,
      order: 0,
    }
  )

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4 border-t pt-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Тип</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="phone">Телефон</option>
          <option value="email">Email</option>
          <option value="address">Адрес</option>
          <option value="other">Другое</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Название *</label>
        <input
          required
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="Например: Отдел продаж"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Значение *</label>
        <input
          required
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="+7 (999) 123-45-67"
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          Отмена
        </button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Сохранить
        </button>
      </div>
    </form>
  )
}

function SocialForm({ item, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(
    item.id ? item : {
      platform: '',
      url: '',
      icon: '',
      active: true,
      order: 0,
    }
  )

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4 border-t pt-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Платформа *</label>
        <input
          required
          value={formData.platform}
          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="Instagram, VK, Telegram..."
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">URL *</label>
        <input
          required
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="https://instagram.com/..."
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Порядок</label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          Отмена
        </button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Сохранить
        </button>
      </div>
    </form>
  )
}
