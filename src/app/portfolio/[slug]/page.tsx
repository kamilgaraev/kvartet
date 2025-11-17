'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Award, TrendingUp, ArrowLeft, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FloatingAction from '@/app/components/FloatingAction'

export default function PortfolioItemPage() {
  const params = useParams()
  const slug = params.slug as string
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetch(`/api/portfolio/${slug}`)
        .then(res => res.json())
        .then(data => {
          setItem(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [slug])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-gray-600">Загрузка...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (!item) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Проект не найден</h1>
            <Link href="/portfolio" className="text-primary hover:underline">
              Вернуться к портфолио
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      
      {/* Hero Section with Gradient */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-accent overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-light opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent opacity-20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-adaptive py-20">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link href="/portfolio" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к портфолио
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-6 flex justify-center items-center space-x-3">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                {item.category}
              </span>
              {item.rating === 5 && (
                <span className="bg-gradient-to-r from-warning to-accent text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30 backdrop-blur-sm">
                  <Star className="w-4 h-4 inline mr-1 fill-current" />
                  ТОП проект
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {item.title}
            </h1>

            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              {item.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6 min-w-[140px]"
              >
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{item.result}</div>
                <div className="text-sm text-white/80">Результат</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6 min-w-[140px]"
              >
                <Award className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{item.budget}</div>
                <div className="text-sm text-white/80">Бюджет</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6 min-w-[140px]"
              >
                <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{item.duration}</div>
                <div className="text-sm text-white/80">Срок</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <article className="section-padding-y bg-white">
        <div className="container-adaptive">

          {/* Main Image */}
          {item.image && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="-mt-32 mb-20 relative z-10"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          )}

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">О проекте</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p>{item.description}</p>
                </div>
              </motion.div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Технологии</h3>
                  <div className="flex flex-wrap gap-3">
                    {item.tags.map((tag: string, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-primary-05 to-primary-10 text-primary px-5 py-2.5 rounded-xl text-sm font-semibold border border-primary-20 hover:shadow-md transition-all cursor-pointer"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features */}
              {item.features && item.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-12 pt-8 border-t border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Особенности</h3>
                  <div className="grid gap-4">
                    {item.features.map((feature: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ x: 5 }}
                        className="flex items-start bg-gradient-to-r from-primary-05 to-transparent p-4 rounded-xl border border-primary-10 hover:border-primary-20 transition-all"
                      >
                        <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-primary-05 to-primary-10 rounded-3xl p-8 sticky top-24 border border-primary-20"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Детали проекта</h3>
                
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-primary-10"
                  >
                    <div className="text-sm text-gray-600 mb-2 font-medium">Категория</div>
                    <div className="font-bold text-gray-900">{item.category}</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-primary-10"
                  >
                    <div className="text-sm text-gray-600 mb-2 font-medium">Год</div>
                    <div className="font-bold text-gray-900">{item.year}</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-primary-10"
                  >
                    <div className="text-sm text-gray-600 mb-2 font-medium">Результат</div>
                    <div className="font-bold text-primary text-xl">{item.result}</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-primary-10"
                  >
                    <div className="text-sm text-gray-600 mb-2 font-medium">Бюджет</div>
                    <div className="font-bold text-gray-900">{item.budget}</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-primary-10"
                  >
                    <div className="text-sm text-gray-600 mb-2 font-medium">Срок реализации</div>
                    <div className="font-bold text-gray-900">{item.duration}</div>
                  </motion.div>
                </div>

                <div className="mt-8">
                  <Link href="/contacts">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
                    >
                      Заказать похожий проект
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 p-12 bg-gradient-to-r from-primary to-primary-dark rounded-2xl text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Хотите такой же результат?</h2>
            <p className="text-xl mb-8 opacity-90">Свяжитесь с нами и получите бесплатную консультацию</p>
            <Link
              href="/contacts"
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-shadow"
            >
              Получить консультацию
            </Link>
          </motion.div>
        </div>
      </article>

      <Footer />
      <FloatingAction />
    </>
  )
}
