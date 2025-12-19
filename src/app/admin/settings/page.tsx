'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Edit2, Trash2, Phone, Mail, Globe, Settings, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

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
      const contactsData = await contactsRes.json()
      const socialsData = await socialsRes.json()
      
      setContacts(Array.isArray(contactsData) ? contactsData : [])
      setSocials(Array.isArray(socialsData) ? socialsData : [])
    } catch (error) {
      console.error(error)
      setContacts([])
      setSocials([])
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
          <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
          <p className="text-muted-foreground mt-2">
            Управление контактами и социальными сетями
          </p>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Info className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle>Информация о системе</CardTitle>
                <CardDescription>Общая информация о панели управления</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div className="text-2xl font-bold text-blue-700">{contacts.length}</div>
              <p className="text-sm text-blue-600 mt-1">Контактов</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="text-2xl font-bold text-purple-700">{socials.length}</div>
              <p className="text-sm text-purple-600 mt-1">Соц. сетей</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="text-2xl font-bold text-green-700">v1.0.0</div>
              <p className="text-sm text-green-600 mt-1">Версия</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
              <div className="text-2xl font-bold text-amber-700">✓</div>
              <p className="text-sm text-amber-600 mt-1">Статус OK</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="contacts" className="text-base">
            <Phone className="w-4 h-4 mr-2" />
            Контакты
          </TabsTrigger>
          <TabsTrigger value="socials" className="text-base">
            <Globe className="w-4 h-4 mr-2" />
            Социальные сети
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <Card className="border-2">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center justify-between">
                <CardTitle>Контактная информация</CardTitle>
                <Button
                  onClick={() => setEditingContact({})}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {editingContact ? (
                <ContactForm
                  item={editingContact}
                  onSave={handleSaveContact}
                  onCancel={() => setEditingContact(null)}
                />
              ) : (
                <div className="space-y-3">
                  {Array.isArray(contacts) && contacts.length > 0 ? contacts.map((contact, index) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-accent/30 hover:shadow-md transition-all flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20">
                            {contact.type}
                          </Badge>
                          {!contact.active && <Badge variant="secondary">Неактивен</Badge>}
                        </div>
                        <div className="font-bold text-gray-900 text-lg">{contact.label}</div>
                        <div className="text-gray-700 mt-1">{contact.value}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingContact(contact)}
                          className="hover:bg-accent hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteContact(contact.id)}
                          className="hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Phone className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p className="text-lg font-medium">Нет контактов</p>
                      <p className="text-sm mt-1">Добавьте первый контакт</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="socials">
          <Card className="border-2">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center justify-between">
                <CardTitle>Социальные сети</CardTitle>
                <Button
                  onClick={() => setEditingSocial({})}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {editingSocial ? (
                <SocialForm
                  item={editingSocial}
                  onSave={handleSaveSocial}
                  onCancel={() => setEditingSocial(null)}
                />
              ) : (
                <div className="space-y-3">
                  {Array.isArray(socials) && socials.length > 0 ? socials.map((social, index) => (
                    <motion.div
                      key={social.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-accent/30 hover:shadow-md transition-all flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-lg mb-2">{social.platform}</div>
                        <div className="text-gray-700 break-all">{social.url}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingSocial(social)}
                          className="hover:bg-accent hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSocial(social.id)}
                          className="hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Globe className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p className="text-lg font-medium">Нет социальных сетей</p>
                      <p className="text-sm mt-1">Добавьте первую социальную сеть</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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
    <Card className="border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 border-b">
        <CardTitle>{item.id ? 'Редактировать контакт' : 'Новый контакт'}</CardTitle>
        <CardDescription>
          {item.id ? 'Обновите информацию о контакте' : 'Добавьте новый способ связи'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-base font-semibold">Тип</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-gray-900 bg-white"
            >
              <option value="phone">Телефон</option>
              <option value="email">Email</option>
              <option value="address">Адрес</option>
              <option value="other">Другое</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="label" className="text-base font-semibold">
              Название <span className="text-red-500">*</span>
            </Label>
            <Input
              id="label"
              required
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="h-12 text-base border-2"
              placeholder="Например: Отдел продаж"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="value" className="text-base font-semibold">
              Значение <span className="text-red-500">*</span>
            </Label>
            <Input
              id="value"
              required
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="h-12 text-base border-2"
              placeholder="+7 (999) 123-45-67"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-6 border-t-2">
            <Button type="button" variant="outline" onClick={onCancel} size="lg" className="min-w-[120px]">
              Отмена
            </Button>
            <Button type="submit" size="lg" className="min-w-[150px] bg-accent hover:bg-accent/90 text-white shadow-lg">
              {item.id ? 'Обновить' : 'Создать'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
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
    <Card className="border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 border-b">
        <CardTitle>{item.id ? 'Редактировать соц. сеть' : 'Новая социальная сеть'}</CardTitle>
        <CardDescription>
          {item.id ? 'Обновите ссылку на социальную сеть' : 'Добавьте новую социальную сеть'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platform" className="text-base font-semibold">
              Платформа <span className="text-red-500">*</span>
            </Label>
            <Input
              id="platform"
              required
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="h-12 text-base border-2"
              placeholder="Instagram, VK, Telegram..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url" className="text-base font-semibold">
              URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="url"
              required
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="h-12 text-base border-2"
              placeholder="https://instagram.com/..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order" className="text-base font-semibold">Порядок</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="h-12 text-base border-2"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-6 border-t-2">
            <Button type="button" variant="outline" onClick={onCancel} size="lg" className="min-w-[120px]">
              Отмена
            </Button>
            <Button type="submit" size="lg" className="min-w-[150px] bg-accent hover:bg-accent/90 text-white shadow-lg">
              {item.id ? 'Обновить' : 'Создать'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
