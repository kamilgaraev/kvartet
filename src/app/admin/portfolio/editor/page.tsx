'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { createLowlight } from 'lowlight'
import { 
  Save, Eye, ArrowLeft, Image as ImageIcon,
  Bold, Italic, Underline as UnderlineIcon, List, Quote, Link as LinkIcon,
  GripVertical, X, Upload, Trash2, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Code, Table as TableIcon, Strikethrough, Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
  CheckSquare, Heading1, Heading2, Heading3, Palette, Highlighter, Undo, Redo, Minus,
  Plus, Columns, Rows, Trash, Merge
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { useMemo } from 'react'

let lowlightInstance: ReturnType<typeof createLowlight> | null = null

function getLowlightInstance() {
  if (!lowlightInstance) {
    try {
      lowlightInstance = createLowlight()
    } catch (error) {
      console.error('Error creating lowlight:', error)
      lowlightInstance = createLowlight()
    }
  }
  return lowlightInstance
}

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
    features: '',
    
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

  const lowlightInstance = useMemo(() => getLowlightInstance(), [])

  const extensions = useMemo(() => {
    const baseExtensions: any[] = []
    
    if (StarterKit) {
      baseExtensions.push(
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        })
      )
    }
    
    if (LinkExtension) {
      baseExtensions.push(
        LinkExtension.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-primary underline hover:text-primary-dark',
          },
        })
      )
    }
    
    if (ImageExtension) {
      baseExtensions.push(
        ImageExtension.configure({
          HTMLAttributes: {
            class: 'rounded-lg max-w-full h-auto',
          },
          inline: false,
        })
      )
    }
    
    if (Placeholder) {
      baseExtensions.push(
        Placeholder.configure({
          placeholder: 'Начните писать полное описание проекта...',
        })
      )
    }
    
    if (Table && TableRow && TableCell && TableHeader) {
      baseExtensions.push(
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'border-collapse border border-gray-300 w-full my-4',
          },
        }),
        TableRow.configure({
          HTMLAttributes: {
            class: 'border border-gray-300',
          },
        }),
        TableHeader.configure({
          HTMLAttributes: {
            class: 'border border-gray-300 bg-gray-100 px-4 py-2 font-bold',
          },
        }),
        TableCell.configure({
          HTMLAttributes: {
            class: 'border border-gray-300 px-4 py-2',
          },
        })
      )
    }

    if (CodeBlockLowlight && lowlightInstance) {
      baseExtensions.push(
        CodeBlockLowlight.configure({
          lowlight: lowlightInstance,
          HTMLAttributes: {
            class: 'bg-gray-900 text-gray-100 rounded-lg p-4 my-4 font-mono text-sm overflow-x-auto',
          },
        })
      )
    }

    if (TextAlign) {
      baseExtensions.push(
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        })
      )
    }
    
    if (Underline) baseExtensions.push(Underline)
    if (Strike) baseExtensions.push(Strike)
    if (Subscript) baseExtensions.push(Subscript)
    if (Superscript) baseExtensions.push(Superscript)
    if (Color) baseExtensions.push(Color)
    if (TextStyle) baseExtensions.push(TextStyle)
    
    if (Highlight) {
      baseExtensions.push(
        Highlight.configure({
          multicolor: true,
          HTMLAttributes: {
            class: 'bg-yellow-200',
          },
        })
      )
    }
    
    if (Typography) baseExtensions.push(Typography)
    
    if (TaskList && TaskItem) {
      baseExtensions.push(
        TaskList.configure({
          HTMLAttributes: {
            class: 'list-none pl-0 my-4',
          },
        }),
        TaskItem.configure({
          nested: true,
          HTMLAttributes: {
            class: 'flex items-start gap-2 my-2',
          },
        })
      )
    }

    return baseExtensions
  }, [lowlightInstance])

  const editor = useEditor({
    extensions,
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[400px] p-6 text-gray-900 [&_p]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_img]:my-4'
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setFormData(prev => ({ ...prev, description: html }))
    }
  })

  useEffect(() => {
    if (projectId && editor) {
      setLoading(true)
      fetch(`/api/admin/portfolio/${projectId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load project')
          return res.json()
        })
        .then(data => {
          console.log('Loaded project data:', data)
          setFormData({
            ...data,
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
            
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            metaKeywords: data.metaKeywords || ''
          })
          
          if (data.description && editor) {
            console.log('Setting editor content:', data.description.substring(0, 100))
            editor.commands.setContent(data.description)
          }
        })
        .catch(err => {
          console.error(err)
          alert('Ошибка при загрузке проекта')
        })
        .finally(() => setLoading(false))
    }
  }, [projectId, editor])

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
      if (!editor) {
        alert('Редактор не инициализирован')
        return
      }

      const editorContent = editor.getHTML()
      console.log('Editor content:', {
        length: editorContent.length,
        isEmpty: editor.isEmpty,
        preview: editorContent.substring(0, 200)
      })
      
      if (!editorContent || editorContent === '<p></p>' || editorContent.trim() === '') {
        console.warn('Description is empty!')
      }
      
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        features: formData.features.split(',').map(t => t.trim()).filter(Boolean),
        description: editorContent
      }

      console.log('Saving payload:', {
        title: payload.title,
        descriptionLength: payload.description?.length || 0,
        challenge: payload.challenge?.length || 0,
        solution: payload.solution?.length || 0
      })

      const url = projectId 
        ? `/api/admin/portfolio/${projectId}` 
        : '/api/admin/portfolio'
      
      const method = projectId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const errorData = await res.text()
        console.error('Server error:', errorData)
        throw new Error('Failed to save')
      }

      const savedData = await res.json()
      console.log('Saved successfully with description length:', savedData.description?.length)
      setLastSaved(new Date())
      
      if (!projectId) {
        router.push(`/admin/portfolio/editor?id=${savedData.id}`)
      } else {
        alert('Проект успешно сохранен!')
      }
    } catch (error) {
      console.error('Save error:', error)
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

  const insertImage = () => {
    const url = window.prompt('Введите URL изображения:')
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const addColumnBefore = () => {
    editor?.chain().focus().addColumnBefore().run()
  }

  const addColumnAfter = () => {
    editor?.chain().focus().addColumnAfter().run()
  }

  const deleteColumn = () => {
    editor?.chain().focus().deleteColumn().run()
  }

  const addRowBefore = () => {
    editor?.chain().focus().addRowBefore().run()
  }

  const addRowAfter = () => {
    editor?.chain().focus().addRowAfter().run()
  }

  const deleteRow = () => {
    editor?.chain().focus().deleteRow().run()
  }

  const deleteTable = () => {
    editor?.chain().focus().deleteTable().run()
  }

  const mergeCells = () => {
    editor?.chain().focus().mergeCells().run()
  }

  const splitCell = () => {
    editor?.chain().focus().splitCell().run()
  }

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const setColor = (color: string) => {
    editor?.chain().focus().setColor(color).run()
  }

  const EditorToolbar = () => {
    if (!editor) return null

    return (
      <div className="border-b bg-gray-50 p-2">
        <div className="flex flex-wrap items-center gap-1">
          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Отменить"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Повторить"
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button
              variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              title="Заголовок 1"
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              title="Заголовок 2"
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              title="Заголовок 3"
            >
              <Heading3 className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button
              variant={editor.isActive('bold') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Жирный"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('italic') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Курсив"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('underline') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Подчеркнутый"
            >
              <UnderlineIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('strike') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Зачеркнутый"
            >
              <Strikethrough className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button
              variant={editor.isActive('subscript') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              title="Подстрочный"
            >
              <SubscriptIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('superscript') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              title="Надстрочный"
            >
              <SuperscriptIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('highlight') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              title="Выделение"
            >
              <Highlighter className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button
              variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              title="По левому краю"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              title="По центру"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              title="По правому краю"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              title="По ширине"
            >
              <AlignJustify className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button
              variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Маркированный список"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Нумерованный список"
            >
              <List className="w-4 h-4 rotate-90" />
            </Button>
            <Button
              variant={editor.isActive('taskList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              title="Список задач"
            >
              <CheckSquare className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Цитата"
            >
              <Quote className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button
              variant={editor.isActive('code') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleCode().run()}
              title="Инлайн код"
            >
              <Code className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              title="Блок кода"
            >
              <Code className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={setLink}
              title="Вставить ссылку"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertImage}
              title="Вставить изображение"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
          </div>

          {editor.isActive('table') && (
            <div className="flex items-center gap-1 border-r pr-2 mr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={addColumnBefore}
                title="Добавить столбец слева"
              >
                <Columns className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={addColumnAfter}
                title="Добавить столбец справа"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={deleteColumn}
                title="Удалить столбец"
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-200 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={addRowBefore}
                title="Добавить строку сверху"
              >
                <Rows className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={addRowAfter}
                title="Добавить строку снизу"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={deleteRow}
                title="Удалить строку"
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-200 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={mergeCells}
                title="Объединить ячейки"
              >
                <Merge className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={splitCell}
                title="Разделить ячейку"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={deleteTable}
                title="Удалить таблицу"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          )}

          {!editor.isActive('table') && (
            <div className="flex items-center gap-1 border-r pr-2 mr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={insertTable}
                title="Вставить таблицу"
              >
                <TableIcon className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 border rounded px-2 py-1">
              <Palette className="w-4 h-4 text-gray-500" />
              <input
                type="color"
                onChange={(e) => setColor(e.target.value)}
                className="w-6 h-6 border-0 cursor-pointer bg-transparent"
                title="Цвет текста"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                  <div className="relative">
                    <EditorContent editor={editor} />
                    <style jsx global>{`
                      .ProseMirror {
                        outline: none;
                      }
                      .ProseMirror table {
                        border-collapse: collapse;
                        margin: 1rem 0;
                        table-layout: fixed;
                        width: 100%;
                      }
                      .ProseMirror table td,
                      .ProseMirror table th {
                        min-width: 1em;
                        border: 1px solid #d1d5db;
                        padding: 0.5rem;
                        vertical-align: top;
                        box-sizing: border-box;
                        position: relative;
                      }
                      .ProseMirror table th {
                        font-weight: bold;
                        text-align: left;
                        background-color: #f3f4f6;
                      }
                      .ProseMirror table .selectedCell:after {
                        z-index: 2;
                        position: absolute;
                        content: "";
                        left: 0; right: 0; top: 0; bottom: 0;
                        background: rgba(200, 200, 255, 0.4);
                        pointer-events: none;
                      }
                      .ProseMirror table .column-resize-handle {
                        position: absolute;
                        right: -2px;
                        top: 0;
                        bottom: -2px;
                        width: 4px;
                        background-color: #adf;
                        pointer-events: none;
                      }
                      .ProseMirror table p {
                        margin: 0;
                      }
                      .ProseMirror ul[data-type="taskList"] {
                        list-style: none;
                        padding: 0;
                      }
                      .ProseMirror ul[data-type="taskList"] li {
                        display: flex;
                        align-items: flex-start;
                        gap: 0.5rem;
                      }
                      .ProseMirror ul[data-type="taskList"] li > label {
                        flex: 0 0 auto;
                        margin-right: 0.5rem;
                        user-select: none;
                      }
                      .ProseMirror ul[data-type="taskList"] li > div {
                        flex: 1 1 auto;
                      }
                    `}</style>
                  </div>
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
