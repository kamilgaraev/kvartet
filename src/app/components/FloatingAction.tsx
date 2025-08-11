'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Phone, 
  X, 
  Zap,
  ArrowUp,
  Mail
} from 'lucide-react'

export default function FloatingAction() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const actions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'bg-green-600 hover:bg-green-700',
      action: () => window.open('https://wa.me/79871234567', '_blank')
    },
    {
      icon: Phone,
      label: 'Позвонить',
      color: 'bg-primary hover:bg-primary-dark',
      action: () => window.open('tel:+79871234567', '_blank')
    },
    {
      icon: Mail,
      label: 'Email',
        color: 'bg-pink-500 hover:opacity-90',
      action: () => window.open('mailto:info@kvartett-ufa.ru', '_blank')
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 50, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 50, 
                  scale: 0,
                  transition: { delay: (actions.length - index - 1) * 0.05 }
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`group flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300`}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-body-sm weight-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 bg-gradient-primary text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6" />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ backgroundColor: 'var(--color-warning-light)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-primary rounded-full"
        />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute right-20 bottom-4 bg-gray-900 text-white text-body-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
          >
            Связаться с нами
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45 -translate-y-1/2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}