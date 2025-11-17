'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
  maxSize?: number // в МБ
  accept?: string
}

export default function ImageUpload({ 
  label, 
  value, 
  onChange, 
  maxSize = 5,
  accept = 'image/*'
}: ImageUploadProps) {
  const [preview, setPreview] = useState(value)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file) return

    // Валидация размера
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Файл слишком большой. Максимальный размер: ${maxSize}МБ`)
      return
    }

    // Валидация типа
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение')
      return
    }

    setIsUploading(true)

    try {
      // Создать preview
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onChange(result)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)

      // TODO: В будущем можно добавить загрузку на Cloudinary или другой сервис
      // const formData = new FormData()
      // formData.append('file', file)
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // })
      // const data = await response.json()
      // onChange(data.url)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Ошибка при загрузке изображения')
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemove = () => {
    setPreview('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {preview ? (
        /* Preview */
        <div className="relative group">
          <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-300">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity" />
          </div>
          
          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Change Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 px-4 py-2 bg-white text-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 text-sm font-semibold shadow-lg"
          >
            Изменить
          </button>
        </div>
      ) : (
        /* Upload Area */
        <motion.div
          whileHover={{ scale: 1.01 }}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragging
              ? 'border-primary bg-primary-bg'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-sm text-gray-600">Загрузка...</p>
            </div>
          ) : (
            <>
              <motion.div
                animate={{ y: isDragging ? -5 : 0 }}
                className="w-16 h-16 bg-primary-bg rounded-full flex items-center justify-center mb-4"
              >
                {isDragging ? (
                  <Upload className="w-8 h-8 text-primary" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-primary" />
                )}
              </motion.div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                {isDragging ? 'Отпустите файл' : 'Нажмите или перетащите изображение'}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF до {maxSize}МБ
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {/* URL Input */}
      <div className="mt-3">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Или вставьте URL изображения:
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setPreview(e.target.value)
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        />
      </div>
    </div>
  )
}

