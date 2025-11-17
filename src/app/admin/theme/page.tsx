'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RotateCcw, Eye, Palette } from 'lucide-react'
import ColorPicker from '../components/ColorPicker'
import FontSelector from '../components/FontSelector'

interface ThemeSettings {
  id?: string
  colorPrimary: string
  colorPrimaryDark: string
  colorPrimaryLight: string
  colorPrimaryBg: string
  colorAccent: string
  colorTextDark: string
  colorSuccess: string
  colorWarning: string
  fontHeading: string
  fontBody: string
  fontSizeBase: string
  fontSizeH1: string
  fontSizeH2: string
  fontSizeH3: string
  borderRadiusBase: string
  borderRadiusLg: string
  borderRadiusXl: string
  themeName: string
}

const defaultTheme: ThemeSettings = {
  colorPrimary: '#2F4454',
  colorPrimaryDark: '#1C3334',
  colorPrimaryLight: '#DA7B93',
  colorPrimaryBg: '#f8f5f6',
  colorAccent: '#376E6F',
  colorTextDark: '#2E151B',
  colorSuccess: '#10B981',
  colorWarning: '#F59E0B',
  fontHeading: 'Inter',
  fontBody: 'Inter',
  fontSizeBase: '16px',
  fontSizeH1: '3rem',
  fontSizeH2: '2.25rem',
  fontSizeH3: '1.875rem',
  borderRadiusBase: '0.5rem',
  borderRadiusLg: '1rem',
  borderRadiusXl: '1.5rem',
  themeName: 'default',
}

const presetThemes = [
  {
    name: 'Драматичная (По умолчанию)',
    colors: {
      colorPrimary: '#2F4454',
      colorPrimaryDark: '#1C3334',
      colorPrimaryLight: '#DA7B93',
      colorAccent: '#376E6F',
    }
  },
  {
    name: 'Спокойная',
    colors: {
      colorPrimary: '#7395AE',
      colorPrimaryDark: '#557A95',
      colorPrimaryLight: '#B1A296',
      colorAccent: '#379683',
    }
  },
  {
    name: 'Синяя',
    colors: {
      colorPrimary: '#3B82F6',
      colorPrimaryDark: '#1E40AF',
      colorPrimaryLight: '#93C5FD',
      colorAccent: '#0EA5E9',
    }
  },
]

export default function ThemeEditorPage() {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    try {
      const response = await fetch('/api/admin/theme')
      if (response.ok) {
        const data = await response.json()
        setTheme(data)
        applyThemeToPreview(data)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyThemeToPreview = (themeData: ThemeSettings) => {
    if (showPreview) {
      const root = document.documentElement
      root.style.setProperty('--color-primary', themeData.colorPrimary)
      root.style.setProperty('--color-primary-dark', themeData.colorPrimaryDark)
      root.style.setProperty('--color-primary-light', themeData.colorPrimaryLight)
      root.style.setProperty('--color-primary-bg', themeData.colorPrimaryBg)
      root.style.setProperty('--color-accent', themeData.colorAccent)
      root.style.setProperty('--color-text-dark', themeData.colorTextDark)
      root.style.setProperty('--color-success', themeData.colorSuccess)
      root.style.setProperty('--color-warning', themeData.colorWarning)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme),
      })

      if (response.ok) {
        alert('Тема успешно сохранена!')
        applyThemeToPreview(theme)
      } else {
        throw new Error('Failed to save theme')
      }
    } catch (error) {
      console.error('Error saving theme:', error)
      alert('Ошибка при сохранении темы')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm('Вы уверены, что хотите сбросить настройки темы?')) {
      setTheme(defaultTheme)
      applyThemeToPreview(defaultTheme)
    }
  }

  const applyPreset = (preset: typeof presetThemes[0]) => {
    setTheme((prev) => ({
      ...prev,
      ...preset.colors,
    }))
    applyThemeToPreview({ ...theme, ...preset.colors })
  }

  useEffect(() => {
    applyThemeToPreview(theme)
  }, [theme, showPreview])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Настройки темы</h1>
          <p className="text-gray-600 mt-1">
            Настройте цвета и шрифты вашего сайта
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showPreview
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-5 h-5" />
            <span>{showPreview ? 'Превью вкл' : 'Превью выкл'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Сбросить</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Сохранение...' : 'Сохранить'}</span>
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-gray-900">Готовые темы</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {presetThemes.map((preset, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => applyPreset(preset)}
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary transition-all"
            >
              <div className="flex items-center space-x-2 mb-3">
                {Object.values(preset.colors).map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-700">{preset.name}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Colors */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Цвета</h2>
          
          <ColorPicker
            label="Основной цвет"
            value={theme.colorPrimary}
            onChange={(color) => setTheme({ ...theme, colorPrimary: color })}
          />

          <ColorPicker
            label="Темный основной"
            value={theme.colorPrimaryDark}
            onChange={(color) => setTheme({ ...theme, colorPrimaryDark: color })}
          />

          <ColorPicker
            label="Светлый основной"
            value={theme.colorPrimaryLight}
            onChange={(color) => setTheme({ ...theme, colorPrimaryLight: color })}
          />

          <ColorPicker
            label="Фон основной"
            value={theme.colorPrimaryBg}
            onChange={(color) => setTheme({ ...theme, colorPrimaryBg: color })}
          />

          <ColorPicker
            label="Акцентный цвет"
            value={theme.colorAccent}
            onChange={(color) => setTheme({ ...theme, colorAccent: color })}
          />

          <ColorPicker
            label="Цвет текста"
            value={theme.colorTextDark}
            onChange={(color) => setTheme({ ...theme, colorTextDark: color })}
          />

          <ColorPicker
            label="Цвет успеха"
            value={theme.colorSuccess}
            onChange={(color) => setTheme({ ...theme, colorSuccess: color })}
          />

          <ColorPicker
            label="Цвет предупреждения"
            value={theme.colorWarning}
            onChange={(color) => setTheme({ ...theme, colorWarning: color })}
          />
        </div>

        {/* Fonts & Typography */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Шрифты и типографика</h2>
          
          <FontSelector
            label="Шрифт заголовков"
            value={theme.fontHeading}
            onChange={(font) => setTheme({ ...theme, fontHeading: font })}
          />

          <FontSelector
            label="Шрифт текста"
            value={theme.fontBody}
            onChange={(font) => setTheme({ ...theme, fontBody: font })}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Базовый размер шрифта
            </label>
            <input
              type="text"
              value={theme.fontSizeBase}
              onChange={(e) => setTheme({ ...theme, fontSizeBase: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Размер H1
            </label>
            <input
              type="text"
              value={theme.fontSizeH1}
              onChange={(e) => setTheme({ ...theme, fontSizeH1: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Размер H2
            </label>
            <input
              type="text"
              value={theme.fontSizeH2}
              onChange={(e) => setTheme({ ...theme, fontSizeH2: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Размер H3
            </label>
            <input
              type="text"
              value={theme.fontSizeH3}
              onChange={(e) => setTheme({ ...theme, fontSizeH3: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Скругления</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Базовое скругление
                </label>
                <input
                  type="text"
                  value={theme.borderRadiusBase}
                  onChange={(e) => setTheme({ ...theme, borderRadiusBase: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Большое скругление
                </label>
                <input
                  type="text"
                  value={theme.borderRadiusLg}
                  onChange={(e) => setTheme({ ...theme, borderRadiusLg: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Очень большое скругление
                </label>
                <input
                  type="text"
                  value={theme.borderRadiusXl}
                  onChange={(e) => setTheme({ ...theme, borderRadiusXl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Превью</h2>
          <div className="space-y-4">
            <div style={{ fontFamily: theme.fontHeading }}>
              <h1 style={{ fontSize: theme.fontSizeH1, color: theme.colorPrimaryDark }}>
                Заголовок H1
              </h1>
              <h2 style={{ fontSize: theme.fontSizeH2, color: theme.colorPrimary }}>
                Заголовок H2
              </h2>
              <h3 style={{ fontSize: theme.fontSizeH3, color: theme.colorAccent }}>
                Заголовок H3
              </h3>
            </div>
            <p style={{ fontFamily: theme.fontBody, fontSize: theme.fontSizeBase, color: theme.colorTextDark }}>
              Это пример текста с выбранным шрифтом. Рекламное агентство "Квартет" предлагает полный спектр услуг.
            </p>
            <div className="flex space-x-3">
              <button
                style={{ 
                  backgroundColor: theme.colorPrimary,
                  borderRadius: theme.borderRadiusBase,
                  color: 'white',
                  padding: '0.5rem 1rem'
                }}
              >
                Кнопка Primary
              </button>
              <button
                style={{ 
                  backgroundColor: theme.colorAccent,
                  borderRadius: theme.borderRadiusLg,
                  color: 'white',
                  padding: '0.5rem 1rem'
                }}
              >
                Кнопка Accent
              </button>
              <button
                style={{ 
                  backgroundColor: theme.colorSuccess,
                  borderRadius: theme.borderRadiusXl,
                  color: 'white',
                  padding: '0.5rem 1rem'
                }}
              >
                Кнопка Success
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

