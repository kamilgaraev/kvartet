'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { ArrowUpRight, Monitor, Printer, Palette, Layers, Star } from 'lucide-react'
import Image from 'next/image'

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  
  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 })
  
  const cardRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 })
  const cardRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 })

  return (
    <div 
      ref={ref}
      className="relative w-full h-[600px] flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Glow */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary-light/20 blur-3xl rounded-full opacity-50"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main 3D Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[420px] h-[520px] md:w-[520px] md:h-[640px]"
      >
        {/* Floating Elements - Back Layer */}
        <motion.div 
          style={{ z: -50 }}
          className="absolute -top-10 -left-10 w-24 h-24 bg-primary-light/30 rounded-full blur-xl"
        />

        {/* Card 1 - Bottom Card (Portfolio Item) */}
        <motion.div
          style={{ 
            z: 20, 
            rotateX: cardRotateX,
            rotateY: cardRotateY,
            x: useTransform(mouseX, [-0.5, 0.5], [25, -25]),
            y: useTransform(mouseY, [-0.5, 0.5], [25, -25])
          }}
          className="absolute top-12 right-[-25px] w-full h-full bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col transform rotate-6 opacity-60 scale-95 origin-bottom-right"
        >
          <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6" />
          <div className="space-y-3">
            <div className="h-5 w-3/4 bg-gray-100 rounded-lg" />
            <div className="h-4 w-1/2 bg-gray-100 rounded-lg" />
          </div>
        </motion.div>

        {/* Card 2 - Middle Card (Portfolio Item) */}
        <motion.div
          style={{ 
            z: 40,
            rotateX: cardRotateX,
            rotateY: cardRotateY,
            x: useTransform(mouseX, [-0.5, 0.5], [-25, 25]),
            y: useTransform(mouseY, [-0.5, 0.5], [-15, 15])
          }}
          className="absolute top-6 left-[-15px] w-full h-full bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col transform -rotate-3 opacity-80 scale-95 origin-bottom-left"
        >
          <div className="h-52 bg-gradient-to-br from-primary-light/20 to-primary/10 rounded-2xl mb-6 flex items-center justify-center">
            <Palette className="w-16 h-16 text-primary/40" />
          </div>
          <div className="space-y-3">
            <div className="h-5 w-3/4 bg-gray-100 rounded-lg" />
            <div className="h-4 w-1/2 bg-gray-100 rounded-lg" />
          </div>
        </motion.div>

        {/* Card 3 - Main Front Card (Interactive Showcase) */}
        <motion.div
          style={{ 
            z: 60,
            rotateX: cardRotateX,
            rotateY: cardRotateY,
          }}
          className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Топ проект</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Вывеска "Lounge Bar"</h3>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
          </div>

          {/* Visual Content Placeholder */}
          <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl mb-6 relative overflow-hidden group cursor-pointer min-h-[280px]">
             <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Monitor className="w-20 h-20 text-white/20 group-hover:text-white/40 transition-colors" />
             </div>
             <motion.div 
               className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10"
               initial={{ y: 20, opacity: 0 }}
               whileHover={{ y: 0, opacity: 1 }}
             >
               <div className="flex justify-between items-center">
                 <span className="text-white text-base font-semibold">Объемные буквы с контражуром</span>
                 <ArrowUpRight className="w-5 h-5 text-white" />
               </div>
             </motion.div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
             <div className="text-center p-4 bg-gray-50 rounded-xl">
               <div className="text-2xl font-bold text-gray-900">7</div>
               <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Дней</div>
             </div>
             <div className="text-center p-4 bg-gray-50 rounded-xl">
               <div className="text-2xl font-bold text-gray-900">3г</div>
               <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Гарантия</div>
             </div>
             <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20">
               <div className="text-2xl font-bold text-primary">Топ</div>
               <div className="text-xs text-primary uppercase font-semibold mt-1">Качество</div>
             </div>
          </div>
        </motion.div>

        {/* Floating Badges */}
        <motion.div
          style={{ z: 80, x: useTransform(mouseX, [-0.5, 0.5], [-30, 30]), y: useTransform(mouseY, [-0.5, 0.5], [-30, 30]) }}
          className="absolute -top-8 -right-8 bg-white shadow-xl rounded-2xl p-4 flex items-center space-x-3 border border-gray-100"
        >
          <div className="bg-blue-100 p-2 rounded-xl">
             <Layers className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">Материалы</div>
            <div className="text-xs text-gray-500">Премиум класса</div>
          </div>
        </motion.div>

        <motion.div
          style={{ z: 80, x: useTransform(mouseX, [-0.5, 0.5], [30, -30]), y: useTransform(mouseY, [-0.5, 0.5], [30, -30]) }}
          className="absolute -bottom-10 -left-10 bg-white shadow-xl rounded-2xl p-4 flex items-center space-x-3 border border-gray-100"
        >
          <div className="bg-green-100 p-2 rounded-xl">
             <Printer className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">Печать</div>
            <div className="text-xs text-gray-500">1440 dpi</div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}

