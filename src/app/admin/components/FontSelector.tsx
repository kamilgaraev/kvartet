'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Search } from 'lucide-react'

interface FontSelectorProps {
  label: string
  value: string
  onChange: (font: string) => void
}

const popularFonts = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Nunito',
  'Ubuntu',
  'Playfair Display',
  'Merriweather',
  'PT Sans',
  'Oswald',
  'Source Sans Pro',
  'Noto Sans',
  'Rubik',
  'Work Sans',
  'Crimson Text',
  'Libre Baskerville',
  'Fira Sans',
]

export default function FontSelector({ label, value, onChange }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set(['Inter']))

  const filteredFonts = popularFonts.filter((font) =>
    font.toLowerCase().includes(search.toLowerCase())
  )

  const loadFont = (fontFamily: string) => {
    if (!loadedFonts.has(fontFamily)) {
      const link = document.createElement('link')
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@400;600;700&display=swap`
      link.rel = 'stylesheet'
      document.head.appendChild(link)
      setLoadedFonts((prev) => new Set(prev).add(fontFamily))
    }
  }

  useEffect(() => {
    // Load current font
    if (value) {
      loadFont(value)
    }
  }, [value])

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {/* Selected Font Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-primary transition-colors text-left flex items-center justify-between"
      >
        <span style={{ fontFamily: value }} className="font-semibold">
          {value || 'Выберите шрифт'}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 flex flex-col"
          >
            {/* Search */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск шрифтов..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Font List */}
            <div className="overflow-y-auto flex-1">
              {filteredFonts.map((font) => (
                <button
                  key={font}
                  type="button"
                  onClick={() => {
                    onChange(font)
                    loadFont(font)
                    setIsOpen(false)
                  }}
                  onMouseEnter={() => loadFont(font)}
                  className="w-full px-4 py-3 hover:bg-primary-bg transition-colors text-left flex items-center justify-between group"
                >
                  <span style={{ fontFamily: font }} className="font-semibold text-lg">
                    {font}
                  </span>
                  {value === font && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </button>
              ))}
              {filteredFonts.length === 0 && (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Шрифты не найдены
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

