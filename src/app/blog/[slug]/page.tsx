'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Eye, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FloatingAction from '@/app/components/FloatingAction'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetch(`/api/blog/${slug}`)
        .then(res => res.json())
        .then(data => {
          setPost(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

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

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Статья не найдена</h1>
            <Link href="/blog" className="text-primary hover:underline">
              Вернуться к блогу
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
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-light opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-dark opacity-20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-adaptive max-w-4xl py-16">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link href="/blog" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к блогу
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 pb-6">
              <div className="flex items-center space-x-2 text-white/80">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span>{post.readingTime} мин чтения</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Eye className="w-5 h-5" />
                <span>{post.views} просмотров</span>
              </div>
              <div className="ml-auto flex items-center space-x-3">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-colors border border-white/20"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-colors border border-white/20"
                >
                  <Bookmark className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <article className="section-padding-y bg-white">
        <div className="container-adaptive max-w-4xl">

          {/* Featured Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="-mt-32 mb-16 relative z-10"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-xl max-w-none"
          >
            <div className="text-gray-800 leading-loose text-lg whitespace-pre-wrap">
              {post.content}
            </div>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 pt-8 border-t border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Теги</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-primary-05 to-primary-10 text-primary px-5 py-2.5 rounded-xl text-sm font-semibold border border-primary-20 hover:shadow-md transition-all cursor-pointer"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 p-10 bg-gradient-to-br from-primary via-primary-dark to-primary-light rounded-3xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Понравилась статья?</h3>
              <p className="text-xl mb-8 text-white/90">Поделитесь с коллегами и друзьями!</p>
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:shadow-2xl transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Поделиться</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/30"
                >
                  <Bookmark className="w-5 h-5" />
                  <span>Сохранить</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
      <FloatingAction />
    </>
  )
}

