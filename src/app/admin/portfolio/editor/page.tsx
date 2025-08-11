'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Save,
  Eye,
  Settings,
  Image as ImageIcon,
  FileText,
  Tag,
  Globe,
  Clock,
  Bold,
  Italic,
  Underline,
  List,
  Quote,
  Link as LinkIcon,
  Palette,
  ArrowLeft,
  Wand2,
  Copy,
  RefreshCw,
  Download
} from 'lucide-react'

interface ProjectTemplate {
  id: string
  name: string
  description: string
  content: string
  category: string
  features: string[]
  tags: string[]
}

const projectTemplates: ProjectTemplate[] = [
  {
    id: 'advertising',
    name: 'Рекламная кампания',
    description: 'Шаблон для описания рекламной кампании',
    category: 'advertising',
    content: `<h2>🎯 Цель проекта</h2>
<p>Описание основных целей и задач рекламной кампании...</p>

<h2>🎨 Креативная концепция</h2>
<p>Основная идея и творческий подход...</p>

<h2>📊 Результаты</h2>
<ul>
  <li><strong>Охват:</strong> количество человек</li>
  <li><strong>CTR:</strong> процент кликов</li>
  <li><strong>Конверсия:</strong> результат</li>
</ul>

<h2>🛠 Использованные технологии</h2>
<p>Перечень инструментов и платформ...</p>`,
    features: ['Креативная концепция', 'Медиапланирование', 'Аналитика'],
    tags: ['реклама', 'маркетинг', 'креатив']
  },
  {
    id: 'branding',
    name: 'Брендинг проект',
    description: 'Шаблон для проектов по брендингу',
    category: 'branding',
    content: `<h2>🏢 О бренде</h2>
<p>Краткая информация о компании и её позиционировании...</p>

<h2>🎯 Задачи брендинга</h2>
<p>Основные цели и задачи проекта по созданию/обновлению бренда...</p>

<h2>🎨 Фирменный стиль</h2>
<ul>
  <li><strong>Логотип:</strong> концепция и варианты</li>
  <li><strong>Цветовая палитра:</strong> основные и дополнительные цвета</li>
  <li><strong>Типографика:</strong> фирменные шрифты</li>
  <li><strong>Фирменные элементы:</strong> паттерны, иконки</li>
</ul>

<h2>📋 Фирменные носители</h2>
<p>Разработанные материалы: визитки, бланки, презентации...</p>`,
    features: ['Логотип', 'Фирменный стиль', 'Брендбук', 'Гайдлайны'],
    tags: ['брендинг', 'логотип', 'фирменный стиль']
  },
  {
    id: 'web',
    name: 'Веб-проект',
    description: 'Шаблон для веб-разработки',
    category: 'web',
    content: `<h2>💻 О проекте</h2>
<p>Описание веб-проекта и его особенностей...</p>

<h2>🎯 Техническое задание</h2>
<p>Основные требования и функциональность...</p>

<h2>🎨 Дизайн и UX</h2>
<ul>
  <li><strong>Дизайн-система:</strong> компоненты и стили</li>
  <li><strong>Адаптивность:</strong> мобильная версия</li>
  <li><strong>UX-исследования:</strong> пользовательский опыт</li>
</ul>

<h2>⚙️ Технологии</h2>
<p>Используемый стек технологий...</p>

<h2>📈 Результаты</h2>
<p>Метрики производительности и пользовательской активности...</p>`,
    features: ['Дизайн', 'Разработка', 'Тестирование', 'Оптимизация'],
    tags: ['веб-дизайн', 'разработка', 'сайт']
  }
]

export default function PortfolioEditor() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('id')
  
  const [activeTab, setActiveTab] = useState('content')
  const [saving, setSaving] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDesc: '',
    category: '',
    tags: '',
    image: '',
    gallery: '',
    budget: '',
    year: new Date().getFullYear().toString(),
    clientName: '',
    clientWebsite: '',
    features: '',
    popular: false,
    active: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline'
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg'
        }
      }),
      Placeholder.configure({
        placeholder: 'Начните писать описание проекта...'
      })
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4 bg-white rounded-lg border'
      }
    }
  })

  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .replace(/[^а-яёa-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }, [])

  const handleTitleChange = useCallback((title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      metaTitle: title.length <= 60 ? title : title.substring(0, 57) + '...'
    }))
  }, [generateSlug])

  const applyTemplate = useCallback((template: ProjectTemplate) => {
    editor?.commands.setContent(template.content)
    setFormData(prev => ({
      ...prev,
      category: template.category,
      features: template.features.join(', '),
      tags: template.tags.join(', ')
    }))
    setShowTemplates(false)
  }, [editor])

  const compressImage = useCallback((file: File, maxWidth = 400, quality = 0.5): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new window.Image()
      
      img.onload = () => {
        // Вычисляем новые размеры
        let { width, height } = img
        
        // Более агрессивное уменьшение размера
        const maxDimension = Math.max(width, height)
        if (maxDimension > maxWidth) {
          const ratio = maxWidth / maxDimension
          width = Math.floor(width * ratio)
          height = Math.floor(height * ratio)
        }
        
        canvas.width = width
        canvas.height = height
        
        // Рисуем сжатое изображение
        ctx?.drawImage(img, 0, 0, width, height)
        
        // Конвертируем в data URL с сильным сжатием
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
        const sizeReduction = ((file.size - compressedDataUrl.length) / file.size * 100).toFixed(1)
        
        console.log(`📦 Сжатие: ${file.name}`)
        console.log(`📏 Размеры: ${img.width}x${img.height} → ${width}x${height}`)
        console.log(`💾 Размер: ${file.size} bytes → ${compressedDataUrl.length} chars (${sizeReduction}% сжатие)`)
        
        // Проверяем итоговый размер
        if (compressedDataUrl.length > 100000) { // Если больше 100KB в виде строки
          console.warn('⚠️ Изображение всё ещё слишком большое, применяем дополнительное сжатие')
          const extraCompressed = canvas.toDataURL('image/jpeg', 0.3)
          resolve(extraCompressed)
        } else {
          resolve(compressedDataUrl)
        }
      }
      
      img.onerror = () => reject(new Error('Ошибка загрузки изображения'))
      img.src = URL.createObjectURL(file)
    })
  }, [])

  const handleMainImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5МБ')
        return
      }

      console.log('Загружаем файл:', file.name, 'Размер:', file.size, 'Тип:', file.type)

      try {
        const compressedUrl = await compressImage(file, 400, 0.4) // Главное изображение: 400px, 40% качества
        setFormData(prev => ({ ...prev, image: compressedUrl }))
      } catch (error) {
        console.error('Ошибка при сжатии главного изображения:', error)
        alert('Ошибка при обработке изображения')
      }
    }
  }, [compressImage])

  const handleGalleryUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Файл ${file.name} слишком большой. Максимальный размер: 5МБ`)
          return false
        }
        return true
      })

      if (validFiles.length === 0) return

      console.log('Загружаем файлы в галерею:', validFiles.map(f => `${f.name} (${f.size} bytes)`))

      try {
        const galleryUrls: string[] = []
        
        for (const file of validFiles) {
          const compressedUrl = await compressImage(file, 600, 0.7) // Меньший размер для галереи
          galleryUrls.push(compressedUrl)
        }

        const existingGallery = formData.gallery ? formData.gallery.split(',').map(url => url.trim()).filter(Boolean) : []
        const newGallery = [...existingGallery, ...galleryUrls].join(', ')
        console.log('Обновляем галерею, количество изображений:', galleryUrls.length)
        setFormData(prev => ({ ...prev, gallery: newGallery }))
      } catch (error) {
        console.error('Ошибка при сжатии изображений:', error)
        alert('Ошибка при обработке изображений')
      }
    }
  }, [formData.gallery, compressImage])

  const handleEditorImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5МБ')
        return
      }

      try {
        const compressedUrl = await compressImage(file, 600, 0.7)
        editor?.chain().focus().setImage({ src: compressedUrl }).run()
      } catch (error) {
        console.error('Ошибка при сжатии изображения для редактора:', error)
        alert('Ошибка при обработке изображения')
      }
    }
  }, [editor, compressImage])

  const saveProject = useCallback(async (isDraft = false) => {
    if (!formData.title || !editor?.getHTML()) return

    setSaving(true)
    try {
      const projectData = {
        ...formData,
        description: editor.getHTML(),
        shortDesc: formData.shortDesc || editor.getText().substring(0, 150),
        gallery: formData.gallery.split(',').map(url => url.trim()).filter(Boolean),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        year: parseInt(formData.year),
        active: !isDraft && formData.active
      }

      const response = await fetch('/api/admin/portfolio', {
        method: projectId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectId ? { id: projectId, ...projectData } : projectData)
      })

      if (response.ok) {
        setLastSaved(new Date())
        if (!projectId && !isDraft) {
          router.push('/admin/portfolio')
        }
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error)
    } finally {
      setSaving(false)
    }
  }, [formData, editor, projectId, router])

  // Автосохранение
  useEffect(() => {
    if (!autoSave || !formData.title) return

    const timer = setTimeout(() => {
      saveProject(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [formData, editor?.getHTML(), autoSave, saveProject])

  const EditorToolbar = () => (
    <div className="flex flex-wrap items-center gap-1 p-3 border-b bg-gray-50 rounded-t-lg">
      <button
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
      >
        <Bold className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${editor?.isActive('strike') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
      >
        <Underline className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      <select
        onChange={(e) => {
          const level = parseInt(e.target.value)
          if (level === 0) {
            editor?.chain().focus().setParagraph().run()
          } else {
            editor?.chain().focus().toggleHeading({ level: level as any }).run()
          }
        }}
        className="px-3 py-1 rounded border text-sm"
      >
        <option value="0">Обычный текст</option>
        <option value="1">Заголовок 1</option>
        <option value="2">Заголовок 2</option>
        <option value="3">Заголовок 3</option>
      </select>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      <button
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
      >
        <List className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor?.isActive('blockquote') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleEditorImageUpload}
          className="hidden"
          id="editor-image-upload"
        />
        <label
          htmlFor="editor-image-upload"
          className="p-2 rounded hover:bg-gray-200 cursor-pointer flex items-center justify-center"
          title="Вставить изображение"
        >
          <ImageIcon className="w-4 h-4" />
        </label>
      </div>

      <button
        onClick={() => {
          const url = prompt('URL ссылки:')
          if (url) {
            editor?.chain().focus().setLink({ href: url }).run()
          }
        }}
        className="p-2 rounded hover:bg-gray-200"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/portfolio')}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <h1 className="text-xl font-semibold text-gray-900">
                {projectId ? 'Редактировать проект' : 'Новый проект'}
              </h1>

              {lastSaved && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Сохранено {lastSaved.toLocaleTimeString()}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="mr-2"
                />
                Автосохранение
              </label>

              <button
                onClick={() => setShowTemplates(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Wand2 className="w-4 h-4" />
                <span>Шаблоны</span>
              </button>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Eye className="w-4 h-4" />
                <span>Предпросмотр</span>
              </button>

              <button
                onClick={() => saveProject(true)}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${saving ? 'animate-spin' : ''}`} />
                <span>Черновик</span>
              </button>

              <button
                onClick={() => saveProject(false)}
                disabled={saving || !formData.title}
                className="flex items-center space-x-2 px-4 py-2 bg-[#1FCAD4] text-white rounded-lg hover:bg-[#16a5ae] disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Опубликовать</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="flex border-b">
                {[
                  { id: 'content', label: 'Содержимое', icon: FileText },
                  { id: 'media', label: 'Медиа', icon: ImageIcon },
                  { id: 'seo', label: 'SEO', icon: Globe },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#1FCAD4] text-[#1FCAD4]'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Название проекта *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                        placeholder="Введите название проекта..."
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL (автоматически)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                        placeholder="url-proekta"
                      />
                    </div>

                    {/* Rich Text Editor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Описание проекта *
                      </label>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <EditorToolbar />
                        <EditorContent editor={editor} />
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Краткое описание
                      </label>
                      <textarea
                        value={formData.shortDesc}
                        onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                        placeholder="Краткое описание для карточки проекта..."
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="space-y-6">
                    {/* Main Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Главное изображение
                      </label>
                      
                      {/* Upload Button */}
                      <div className="mb-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMainImageUpload}
                          className="hidden"
                          id="main-image-upload"
                        />
                        <label
                          htmlFor="main-image-upload"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1FCAD4] text-white rounded-lg hover:bg-[#16a5ae] cursor-pointer transition-colors"
                        >
                          <ImageIcon className="w-4 h-4" />
                          <span>Загрузить изображение</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Поддерживаются форматы: JPG, PNG, GIF (макс. 5МБ)</p>
                      </div>

                      {/* URL Input */}
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Или введите URL:</label>
                        <div className="flex space-x-2">
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop' }))}
                            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                            title="Тестовое изображение"
                          >
                            🖼️ Тест
                          </button>
                        </div>
                      </div>

                      {/* Preview */}
                      {formData.image && (
                        <div className="mt-4">
                          <div className="relative w-64 h-40 bg-gray-100 rounded-lg border flex items-center justify-center overflow-hidden">
                            <img 
                              src={formData.image} 
                              alt="Предпросмотр" 
                              className="w-full h-full object-cover"
                              onLoad={(e) => {
                                console.log('Главное изображение загружено успешно')
                                e.currentTarget.style.display = 'block'
                                const parent = e.currentTarget.parentElement
                                const loadingDiv = parent?.querySelector('.loading-placeholder')
                                if (loadingDiv) loadingDiv.remove()
                              }}
                              onError={(e) => {
                                console.error('Ошибка загрузки главного изображения:', formData.image.substring(0, 100))
                                const target = e.currentTarget
                                target.style.display = 'none'
                                const parent = target.parentElement as HTMLElement
                                if (parent) {
                                  const loadingDiv = parent.querySelector('.loading-placeholder')
                                  if (loadingDiv) {
                                    loadingDiv.innerHTML = `
                                      <div class="text-gray-500 text-center">
                                        <div class="text-2xl">⚠️</div>
                                        <div class="text-sm">Ошибка загрузки</div>
                                        <div class="text-xs mt-1">${formData.image.startsWith('data:') ? 'Data URL' : 'URL'}</div>
                                      </div>
                                    `
                                  }
                                }
                              }}
                              style={{ display: 'none' }}
                            />
                            <div className="loading-placeholder text-gray-400 text-center">
                              <div className="text-2xl">📷</div>
                              <div className="text-sm">Загрузка...</div>
                            </div>
                            <button
                              onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border border-white"
                              title="Удалить изображение"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gallery */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Галерея проекта
                      </label>
                      
                      {/* Upload Multiple */}
                      <div className="mb-4">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryUpload}
                          className="hidden"
                          id="gallery-upload"
                        />
                        <label
                          htmlFor="gallery-upload"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
                        >
                          <ImageIcon className="w-4 h-4" />
                          <span>Добавить в галерею</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Можно выбрать несколько изображений</p>
                      </div>

                      {/* Gallery URLs */}
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Или URL изображений (через запятую):</label>
                        <div className="space-y-2">
                          <textarea
                            value={formData.gallery}
                            onChange={(e) => setFormData(prev => ({ ...prev, gallery: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const testUrls = [
                                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
                                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
                                'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop'
                              ]
                              const existing = formData.gallery ? formData.gallery.split(',').map(url => url.trim()).filter(Boolean) : []
                              const newGallery = [...existing, ...testUrls].join(', ')
                              setFormData(prev => ({ ...prev, gallery: newGallery }))
                            }}
                            className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                            title="Добавить тестовые изображения"
                          >
                            🖼️ Добавить тестовые
                          </button>
                        </div>
                      </div>

                      {/* Gallery Preview */}
                      {formData.gallery && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 mb-2">Предпросмотр галереи:</p>
                          <div className="grid grid-cols-3 gap-2">
                            {formData.gallery.split(',').map((url, index) => {
                              const trimmedUrl = url.trim()
                              if (!trimmedUrl) return null
                              return (
                                <div key={index} className="relative">
                                  <div className="w-full h-20 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                                    <img 
                                      src={trimmedUrl} 
                                      alt={`Галерея ${index + 1}`}
                                      className="w-full h-full object-cover"
                                      onLoad={(e) => {
                                        console.log(`Изображение галереи ${index + 1} загружено успешно`)
                                        e.currentTarget.style.display = 'block'
                                      }}
                                      onError={(e) => {
                                        console.error(`Ошибка загрузки изображения галереи ${index + 1}:`, trimmedUrl.substring(0, 100))
                                        const target = e.currentTarget
                                        target.style.display = 'none'
                                        const parent = target.parentElement as HTMLElement
                                        if (parent) {
                                          parent.innerHTML = `
                                            <div class="text-xs text-gray-500 text-center">
                                              <div>⚠️</div>
                                              <div>Ошибка</div>
                                              <div class="text-xs">${trimmedUrl.startsWith('data:') ? 'Data URL' : 'URL'}</div>
                                            </div>
                                          `
                                        }
                                      }}
                                      style={{ display: 'none' }}
                                    />
                                    <div className="text-xs text-gray-400 text-center">
                                      <div>📷</div>
                                      <div>Загрузка...</div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const urls = formData.gallery.split(',').map(u => u.trim()).filter(Boolean)
                                      urls.splice(index, 1)
                                      setFormData(prev => ({ ...prev, gallery: urls.join(', ') }))
                                    }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors border border-white"
                                    title="Удалить из галереи"
                                  >
                                    ×
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    {/* Meta Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title ({formData.metaTitle.length}/60)
                      </label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        maxLength={60}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                        placeholder="SEO заголовок страницы"
                      />
                    </div>

                    {/* Meta Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description ({formData.metaDescription.length}/160)
                      </label>
                      <textarea
                        value={formData.metaDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        maxLength={160}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                        placeholder="Описание страницы для поисковых систем"
                      />
                    </div>

                    {/* Meta Keywords */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ключевые слова
                      </label>
                      <input
                        type="text"
                        value={formData.metaKeywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                        placeholder="ключевое слово, другое слово, третье слово"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Детали проекта</h3>
              
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                  >
                    <option value="">Выберите категорию</option>
                    <option value="advertising">Наружная реклама</option>
                    <option value="branding">Брендинг</option>
                    <option value="web">Веб-дизайн</option>
                    <option value="print">Полиграфия</option>
                  </select>
                </div>

                {/* Client */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Клиент
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                    placeholder="Название компании"
                  />
                </div>

                {/* Year & Budget */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Год
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Бюджет
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                      placeholder="50 000 ₽"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Теги
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                    placeholder="тег1, тег2, тег3"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Особенности
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FCAD4] focus:border-transparent"
                    placeholder="особенность1, особенность2"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData(prev => ({ ...prev, popular: e.target.checked }))}
                      className="w-4 h-4 text-[#1FCAD4] border-gray-300 rounded focus:ring-[#1FCAD4]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Рекомендуемый проект</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                      className="w-4 h-4 text-[#1FCAD4] border-gray-300 rounded focus:ring-[#1FCAD4]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Активный</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Шаблоны проектов</h2>
                  <button
                    onClick={() => setShowTemplates(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectTemplates.map(template => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#1FCAD4] transition-colors">
                      <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => applyTemplate(template)}
                        className="w-full px-4 py-2 bg-[#1FCAD4] text-white rounded-lg hover:bg-[#16a5ae] transition-colors"
                      >
                        Использовать шаблон
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Предпросмотр проекта</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {formData.image && (
                  <img 
                    src={formData.image} 
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title}</h1>
                
                {formData.shortDesc && (
                  <p className="text-xl text-gray-600 mb-6">{formData.shortDesc}</p>
                )}
                
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
} 