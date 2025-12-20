'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Calendar, Award, TrendingUp, ArrowLeft, CheckCircle, Star, Quote, ArrowRight, Clock, Banknote, Layers, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FloatingAction from '@/app/components/FloatingAction'
import { useRef, useState } from 'react'

interface PortfolioItem {
  id: string
  title: string
  slug: string
  description: string // HTML content
  category: string
  image: string
  gallery: string[]
  challenge?: string
  solution?: string
  result: string
  budget: string
  duration: string
  year: number
  rating: number
  features: string[]
  tags: string[]
  clientName?: string
  reviewText?: string
  reviewAuthor?: string
  reviewRole?: string
}

export default function PortfolioClient({ item }: { item: PortfolioItem }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [activeImage, setActiveImage] = useState<string | null>(null)

  return (
    <>
      <Header />
      
      {/* Immersive Hero Section */}
      <section ref={ref} className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 container-adaptive text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Вернуться в портфолио
            </Link>

            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-medium tracking-wide uppercase">
                {item.category}
              </span>
              {item.year && (
                <span className="px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-medium">
                  {item.year}
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
              {item.title}
            </h1>

            {/* Key Metrics Grid */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12">
              {item.result && (
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{item.result}</div>
                  <div className="text-sm text-white/70">Результат</div>
                </div>
              )}
              {item.duration && (
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.duration}</div>
                  <div className="text-sm text-white/70">Срок реализации</div>
                </div>
              )}
              {item.budget && (
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.budget}</div>
                  <div className="text-sm text-white/70">Бюджет</div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      <div className="bg-white">
        {/* Intro / Challenge / Solution */}
        <section className="section-padding-y">
          <div className="container-adaptive">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Left Column: Context */}
              <div className="lg:col-span-4 space-y-12">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Клиент</h3>
                  <div className="text-xl font-semibold text-gray-900">{item.clientName || item.title}</div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Услуги</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.features?.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Технологии</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((t, i) => (
                      <span key={i} className="px-3 py-1 border border-gray-200 text-gray-600 rounded-lg text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Story */}
              <div className="lg:col-span-8 space-y-16">
                {item.challenge && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="prose prose-lg max-w-none"
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Задача</h2>
                    <p className="text-gray-600 leading-relaxed text-xl">{item.challenge}</p>
                  </motion.div>
                )}

                {item.solution && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="prose prose-lg max-w-none"
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Решение</h2>
                    <p className="text-gray-600 leading-relaxed text-xl">{item.solution}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Description */}
        {item.description && item.description.trim() !== '' && item.description !== '<p></p>' && (
          <section className="section-padding-y bg-white">
            <div className="container-adaptive max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">О проекте</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </section>
        )}

        {/* Gallery Grid - Enhanced */}
        {item.gallery && item.gallery.length > 0 && (
          <section className="section-padding-y bg-gradient-to-b from-gray-50 to-white">
            <div className="container-adaptive">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Галерея проекта</h2>
                <p className="text-xl text-gray-600">Наглядные результаты нашей работы</p>
                <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto mt-6 rounded-full"></div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {item.gallery.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group ${
                      index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                    }`}
                    onClick={() => setActiveImage(img)}
                  >
                    <div className={`relative ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                      <img 
                        src={img} 
                        alt={`${item.title} - Изображение ${index + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <motion.div
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1 }}
                          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40"
                        >
                          <Eye className="w-8 h-8 text-white" />
                        </motion.div>
                      </div>
                      
                      {/* Image Number Badge */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                        {index + 1}/{item.gallery.length}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Gallery Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <p className="text-gray-600">
                  <span className="font-bold text-2xl text-accent">{item.gallery.length}</span> изображений в галерее
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Review Section */}
        {item.reviewText && (
          <section className="section-padding-y bg-primary-dark text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-32 opacity-10">
                <Quote size={400} />
             </div>
             <div className="container-adaptive relative z-10 text-center max-w-4xl mx-auto">
                <div className="mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="inline-block w-6 h-6 text-accent fill-current mx-1" />
                    ))}
                </div>
                <blockquote className="text-3xl md:text-4xl font-serif italic leading-relaxed mb-12">
                    "{item.reviewText}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                    <div className="text-right">
                        <div className="text-xl font-bold">{item.reviewAuthor}</div>
                        <div className="text-white/60">{item.reviewRole}</div>
                    </div>
                </div>
             </div>
          </section>
        )}

        {/* Next Project & CTA */}
        <section className="section-padding-y bg-white text-center">
            <div className="container-adaptive max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Вам нужен подобный проект?</h2>
                <p className="text-xl text-gray-600 mb-12">
                    Мы готовы обсудить ваши задачи и предложить лучшее решение.
                </p>
                <Link 
                    href="/contacts"
                    className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-dark hover:scale-105 transition-all shadow-xl hover:shadow-primary/25"
                >
                    Обсудить проект <ArrowRight className="ml-2" />
                </Link>
            </div>
        </section>
      </div>

      <Footer />
      <FloatingAction />

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-7xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeImage} 
                alt="Full screen preview" 
                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" 
              />
              
              {/* Navigation Buttons */}
              {item.gallery && item.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = item.gallery.indexOf(activeImage)
                      const prevIndex = currentIndex === 0 ? item.gallery.length - 1 : currentIndex - 1
                      setActiveImage(item.gallery[prevIndex])
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = item.gallery.indexOf(activeImage)
                      const nextIndex = currentIndex === item.gallery.length - 1 ? 0 : currentIndex + 1
                      setActiveImage(item.gallery[nextIndex])
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
              
              {/* Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-16 right-0 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Image Counter */}
              {item.gallery && (
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium">
                  {item.gallery.indexOf(activeImage) + 1} / {item.gallery.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

