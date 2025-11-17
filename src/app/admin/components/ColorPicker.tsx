'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
  presets?: string[]
}

export default function ColorPicker({ label, value, onChange, presets }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const defaultPresets = presets || [
    '#2F4454', '#1C3334', '#DA7B93', '#376E6F', '#2E151B',
    '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899',
    '#14B8A6', '#F97316', '#EF4444', '#6366F1', '#A855F7',
    '#06B6D4', '#84CC16', '#F43F5E', '#0EA5E9', '#22C55E',
  ]

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="flex items-center space-x-3">
        {/* Current Color Display */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-primary transition-colors shadow-md relative overflow-hidden group"
          style={{ backgroundColor: value }}
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>

        {/* Color Input */}
        <div className="flex-1 flex items-center space-x-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono text-gray-900 bg-white"
            placeholder="#000000"
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-10 cursor-pointer rounded-lg overflow-hidden border border-gray-300"
          />
        </div>
      </div>

      {/* Presets Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50"
          >
            <p className="text-xs font-semibold text-gray-600 mb-3">Предустановки</p>
            <div className="grid grid-cols-10 gap-2">
              {defaultPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    onChange(preset)
                    setIsOpen(false)
                  }}
                  className="w-8 h-8 rounded-lg border-2 hover:border-primary transition-colors shadow-sm hover:scale-110 transform"
                  style={{ backgroundColor: preset }}
                  title={preset}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

