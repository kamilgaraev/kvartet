'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Building, 
  Star, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Award,
  Target,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FloatingAction from '../../components/FloatingAction'

interface PortfolioProject {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  category: string
  image: string
  gallery: string[]
  budget: string
  year: number
  clientName: string
  clientWebsite: string
  rating: number
  features: string[]
  tags: string[]
  popular: boolean
  active: boolean
  metaTitle?: string
  metaDescription?: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [project, setProject] = useState<PortfolioProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchProject()
    }
  }, [slug])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/portfolio/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
        
        // SEO meta tags
        if (data.metaTitle) {
          document.title = data.metaTitle
        } else {
          document.title = `${data.title} - Портфолио KVARTETT`
        }
        
        const metaDescription = data.metaDescription || data.shortDesc || data.description.substring(0, 160)
        const metaDescElement = document.querySelector('meta[name="description"]')
        if (metaDescElement) {
          metaDescElement.setAttribute('content', metaDescription)
        }
      } else {
        console.error('Project not found')
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      advertising: 'Наружная реклама',
      branding: 'Брендинг',
      print: 'Полиграфия',
      web: 'Веб-дизайн'
    }
    return categoryMap[category] || 'Реклама'
  }

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      advertising: 'bg-primary',
      branding: 'bg-warning',
      print: 'bg-success',
      web: 'bg-purple-500'
    }
    return colorMap[category] || 'bg-gray-500'
  }

  const allImages = project ? [project.image, ...project.gallery].filter(Boolean) : []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Проект не найден</h1>
            <Link 
              href="/portfolio"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Вернуться к портфолио</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              href="/portfolio"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Назад к портфолио</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 ${getCategoryColor(project.category)} text-white text-sm rounded-full font-medium`}>
                  {getCategoryName(project.category)}
                </span>
                {project.popular && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm rounded-full font-medium flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>ТОП</span>
                  </span>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {project.title}
              </h1>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {project.shortDesc || project.description.substring(0, 200)}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center space-x-2 text-white/70 mb-2">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">Клиент</span>
                  </div>
                  <p className="text-white font-medium">{project.clientName}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 text-white/70 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Год</span>
                  </div>
                  <p className="text-white font-medium">{project.year}</p>
                </div>

                {project.budget && (
                  <div>
                    <div className="flex items-center space-x-2 text-white/70 mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Бюджет</span>
                    </div>
                    <p className="text-white font-medium">{project.budget}</p>
                  </div>
                )}

                <div>
                  <div className="flex items-center space-x-2 text-white/70 mb-2">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Рейтинг</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < project.rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                      />
                    ))}
                    <span className="text-white font-medium ml-2">{project.rating}</span>
                  </div>
                </div>
              </div>

              {project.clientWebsite && (
                <a
                  href={project.clientWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Посетить сайт клиента</span>
                </a>
              )}
            </motion.div>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 relative group cursor-pointer">
                <img 
                  src={allImages[currentImageIndex] || project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onClick={() => setIsGalleryOpen(true)}
                />
                
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  <Eye className="w-3 h-3 inline mr-1" />
                  {currentImageIndex + 1} из {allImages.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${project.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              О проекте
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Особенности проекта
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Теги
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-4xl w-full">
            <img 
              src={allImages[currentImageIndex]} 
              alt={project.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} из {allImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingAction />
    </div>
  )
}