'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { Award, TrendingUp } from 'lucide-react'
import Image from 'next/image'

export default function Clients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    fetch('/api/partners')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setClients(data)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch clients:', error)
        setLoading(false)
      })
  }, [])

  if (loading || !Array.isArray(clients) || clients.length === 0) {
    return null
  }

  return (
    <section className="section-padding-y bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
      
      <div className="relative container-adaptive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-10 to-primary-dark-10 rounded-full px-6 py-2 mb-6"
          >
            <Award className="w-5 h-5 text-primary-dark" />
            <span className="text-body-sm weight-semibold text-muted">Нам доверяют</span>
          </motion.div>

          <h2 className="text-display-2 text-primary-dark mb-6 leading-tight-kw weight-bold">
            В числе наших{' '}
            <span className="relative inline-block">
              <span className="gradient-kvartett-text">клиентов</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary opacity-30 rounded-full"
              />
            </span>
          </h2>
          <p className="text-body-xl text-muted max-w-3xl mx-auto leading-relaxed-kw">
            С нами работают крупнейшие компании России. Нам доверяют свой имидж лидеры рынка.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl flex items-center justify-center aspect-[4/3]"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-300 group-hover:text-primary transition-colors">
                      {client.name}
                    </div>
                  </div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary-light/5 rounded-2xl pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="text-center p-8 bg-gradient-to-br from-primary-05 to-primary-10 rounded-3xl border border-primary/20"
          >
            <div className="text-display-3 weight-black text-primary mb-2">500+</div>
            <div className="text-body text-muted">Выполненных проектов</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="text-center p-8 bg-gradient-to-br from-primary-dark-05 to-primary-dark-10 rounded-3xl border border-primary-dark/20"
          >
            <div className="text-display-3 weight-black text-primary-dark mb-2">15+</div>
            <div className="text-body text-muted">Лет на рынке</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="text-center p-8 bg-gradient-to-br from-accent/10 to-accent/20 rounded-3xl border border-accent/20"
          >
            <div className="text-display-3 weight-black text-accent mb-2">98%</div>
            <div className="text-body text-muted">Довольных клиентов</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

