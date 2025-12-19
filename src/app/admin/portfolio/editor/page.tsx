'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Save, Eye, ArrowLeft, Image as ImageIcon,
  Bold, Italic, Underline, List, Quote, Link as LinkIcon,
  GripVertical, X, Upload, Trash2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner' // Assuming sonner or similar is used, or replace with console/alert

export default function PortfolioEditor() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('id')
  
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!!projectId)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDesc: '',
    description: '',
    category: '',
    tags: '',
    image: '',
    gallery: [] as string[],
    budget: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    clientName: '',
    clientWebsite: '',
    features: '', // Comma separated for UI
    
    // New fields
    challenge: '',
    solution: '',
    reviewText: '',
    reviewAuthor: '',
    reviewRole: '',
    result: '',

    popular: false,
    active: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  })

  // Fetch data if editing
  useEffect(() => {
    if (projectId) {
      setLoading(true)
      fetch(`/api/admin/portfolio/${projectId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load project')
          return res.json()
        })
        .then(data => {
          setFormData({
            ...data,
            // Ensure null strings are converted to empty strings to prevent runtime errors
            title: data.title || '',
            slug: data.slug || '',
            shortDesc: data.shortDesc || '',
            description: data.description || '',
            category: data.category || '',
            image: data.image || '',
            budget: data.budget || '',
            clientName: data.clientName || '',
            clientWebsite: data.clientWebsite || '',
            
            tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
            features: Array.isArray(data.features) ? data.features.join(', ') : data.features || '',
            year: data.year?.toString() || new Date().getFullYear().toString(),
            gallery: data.gallery || [],
            challenge: data.challenge || '',
            solution: data.solution || '',
            reviewText: data.reviewText || '',
            reviewAuthor: data.reviewAuthor || '',
            reviewRole: data.reviewRole || '',
            result: data.result || '',
            duration: data.duration || '',
            
            // Meta fields
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            metaKeywords: data.metaKeywords || ''
          })
          editor?.commands.setContent(data.description || '')
        })
        .catch(err => {
          console.error(err)
          alert('Ошибка при загрузке проекта')
        })
        .finally(() => setLoading(false))
    }
  }, [projectId])

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension.configure({ HTMLAttributes: { class: 'rounded-lg' } }),
      Placeholder.configure({ placeholder: 'Полное описание проекта...' })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4'
      }
    },
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, description: editor.getHTML() }))
    }
  }, [])

  // Sync editor content when loaded
  useEffect(() => {
    if (editor && formData.description && editor.isEmpty) {
       // Only set if editor is empty to avoid loop, though initial load handles it differently
       // actually the useEffect [projectId] handles the initial setContent
    }
  }, [editor, formData.description])

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^а-яёa-z0-9\s-]/g, '') // Remove invalid chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .replace(/^-|-$/g, '') // Remove starting/ending -
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !projectId ? generateSlug(title) : prev.slug, // Only auto-gen slug on new projects
      metaTitle: !projectId ? title.substring(0, 60) : prev.metaTitle
    }))
  }

  const compressImage = async (file: File): Promise<string> => {
    // In a real app, upload to Cloudinary/S3 here
    // For now, we'll keep using base64 but warn about size
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files
    if (!files?.length) return

    try {
      if (isGallery) {
        const newUrls = []
        for (let i = 0; i < files.length; i++) {
          const url = await compressImage(files[i])
          newUrls.push(url)
        }
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...newUrls] }))
      } else {
        const url = await compressImage(files[0])
        console.log('Image uploaded:', url.substring(0, 50) + '...')
        setFormData(prev => ({ ...prev, image: url }))
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Ошибка загрузки изображения')
    } finally {
      e.target.value = ''
    }
  }

  const saveProject = async () => {
    setSaving(true)
    
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        features: formData.features.split(',').map(t => t.trim()).filter(Boolean),
        description: editor?.getHTML() || formData.description
      }

      const url = projectId 
        ? `/api/admin/portfolio/${projectId}` 
        : '/api/admin/portfolio'
      
      const method = projectId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Failed to save')

      const savedData = await res.json()
      setLastSaved(new Date())
      
      if (!projectId) {
        router.push(`/admin/portfolio/editor?id=${savedData.id}`)
      } else {
        // Optional: show toast
      }
    } catch (error) {
      console.error(error)
      alert('Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const deleteProject = async () => {
    if (!confirm('Вы уверены? Это действие нельзя отменить.')) return
    
    try {
      const res = await fetch(`/api/admin/portfolio/${projectId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete')
      router.push('/admin/portfolio')
    } catch (error) {
      alert('Ошибка удаления')
    }
  }

  const EditorToolbar = () => (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
      <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBold().run()}>
        <Bold className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleItalic().run()}>
        <Italic className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-gray-200 mx-2" />
      <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
        <List className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
        <Quote className="w-4 h-4" />
      </Button>
    </div>
  )

  if (loading) return <div className="p-8 text-center">Загрузка...</div>

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Назад
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
                {projectId ? 'Редактировать проект' : 'Новый проект'}
              </h1>
            {lastSaved && <p className="text-xs text-muted-foreground">Сохранено: {lastSaved.toLocaleTimeString()}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
            {projectId && (
                <Button variant="destructive" size="icon" onClick={deleteProject}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            )}
          <Button variant="outline" onClick={() => window.open(`/portfolio/${formData.slug}`, '_blank')}>
            <Eye className="w-4 h-4 mr-2" /> Предпросмотр
          </Button>
          <Button onClick={saveProject} disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Название</Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Введите название проекта"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input 
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Краткое описание (для карточки)</Label>
                <Textarea 
                  value={formData.shortDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Case Study Section */}
          <Card>
            <CardHeader>
              <CardTitle>Case Study</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-base font-semibold">Задача (Challenge)</Label>
                <Textarea 
                  className="min-h-[100px]"
                  value={formData.challenge}
                  onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                  placeholder="Опишите проблему, с которой пришел клиент..."
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-semibold">Решение (Solution)</Label>
                <Textarea 
                  className="min-h-[150px]"
                  value={formData.solution}
                  onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                  placeholder="Опишите, как вы решили проблему..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Полное описание (Контент)</CardTitle>
            </CardHeader>
            <CardContent className="p-0 border-t">
              {editor && (
                <>
                  <EditorToolbar />
                  <EditorContent editor={editor} />
                </>
              )}
            </CardContent>
          </Card>

          {/* Review Section */}
          <Card>
            <CardHeader>
              <CardTitle>Отзыв клиента</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Текст отзыва</Label>
                <Textarea 
                  value={formData.reviewText}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviewText: e.target.value }))}
                  placeholder="Прекрасная работа..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Автор</Label>
                    <Input 
                        value={formData.reviewAuthor}
                        onChange={(e) => setFormData(prev => ({ ...prev, reviewAuthor: e.target.value }))}
                        placeholder="Иван Иванов"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Должность</Label>
                    <Input 
                        value={formData.reviewRole}
                        onChange={(e) => setFormData(prev => ({ ...prev, reviewRole: e.target.value }))}
                        placeholder="Директор"
                    />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Галерея</CardTitle>
              <div className="relative">
                <Input 
                  type="file"
                  accept="image/*"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={(e) => handleImageUpload(e, true)}
                />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" /> Добавить фото
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Reorder.Group axis="y" values={formData.gallery} onReorder={(newOrder) => setFormData(prev => ({ ...prev, gallery: newOrder }))} className="space-y-2">
                {formData.gallery.map((url, index) => (
                  <Reorder.Item key={url} value={url}>
                    <div className="flex items-center gap-4 p-2 bg-white border rounded-lg shadow-sm cursor-move group">
                      <GripVertical className="text-gray-400" />
                      <img src={url} className="w-16 h-12 object-cover rounded" />
                      <div className="flex-1 truncate text-xs text-gray-500">{url.substring(0, 50)}...</div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setFormData(prev => ({ ...prev, gallery: prev.gallery.filter(g => g !== url) }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
              {formData.gallery.length === 0 && (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  Нет изображений в галерее
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input 
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground text-right">{formData.metaTitle.length}/60</p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea 
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground text-right">{formData.metaDescription.length}/160</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Статус</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="active" 
                  checked={formData.active} 
                  onCheckedChange={(c) => setFormData(prev => ({ ...prev, active: !!c }))}
                />
                <Label htmlFor="active">Опубликован</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="popular" 
                  checked={formData.popular}
                  onCheckedChange={(c) => setFormData(prev => ({ ...prev, popular: !!c }))}
                />
                <Label htmlFor="popular">В избранном (На главной)</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Главное изображение</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Главное изображение проекта" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Label htmlFor="main-image" className="cursor-pointer text-white flex flex-col items-center">
                            <Upload className="w-6 h-6 mb-2" />
                            <span className="text-sm font-medium">Изменить</span>
                        </Label>
                    </div>
                  </>
                ) : (
                  <Label htmlFor="main-image" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-primary">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span>Загрузить</span>
                  </Label>
                )}
                <Input 
                    id="main-image" 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={(e) => handleImageUpload(e)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Детали проекта</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Категория</Label>
                <Input 
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="branding, web..." 
                />
              </div>
              <div className="space-y-2">
                <Label>Клиент</Label>
                <Input 
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Год</Label>
                  <Input 
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Бюджет</Label>
                  <Input 
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Срок (Duration)</Label>
                    <Input 
                        value={formData.duration}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="2 недели"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Результат (кратко)</Label>
                    <Input 
                        value={formData.result}
                        onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value }))}
                        placeholder="+200% лидов"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Теги</Label>
                <Input 
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Через запятую"
                />
              </div>
              <div className="space-y-2">
                <Label>Особенности (Features)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="Через запятую: Адаптивность, SEO, Скорость"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
