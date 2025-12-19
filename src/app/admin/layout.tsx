'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Image, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Briefcase
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

const navigation = [
  { name: 'Дашборд', href: '/admin', icon: LayoutDashboard },
  { name: 'Заявки', href: '/admin/leads', icon: MessageSquare },
  { name: 'Услуги', href: '/admin/services', icon: Briefcase },
  { name: 'Портфолио', href: '/admin/portfolio', icon: Image },
  { name: 'Блог', href: '/admin/blog', icon: FileText },
  { name: 'Отзывы', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'FAQ', href: '/admin/faq', icon: FileText },
  { name: 'Команда', href: '/admin/team', icon: Users },
  { name: 'Партнеры', href: '/admin/partners', icon: Users },
  { name: 'Настройки', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [session, status, router, pathname])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session && pathname !== '/admin/login') {
    return null
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      <div className="flex items-center h-16 px-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Kvartett</span>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Меню</p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={`mr-3 w-5 h-5 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <Avatar className="h-9 w-9 border border-slate-700">
            <AvatarImage src={session?.user?.image || undefined} />
            <AvatarFallback className="bg-primary text-white">
              {session?.user?.name?.charAt(0) || 'A'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {session?.user?.name || 'Администратор'}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <Button
          variant="destructive"
          className="w-full justify-start text-red-200 bg-red-900/20 hover:bg-red-900/40 hover:text-red-100 border-none"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 shadow-xl z-30">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 shadow-2xl"
      >
        <div className="absolute top-4 right-4 lg:hidden">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <SidebarContent />
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
        {/* Top header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden -ml-2 text-gray-500 hover:text-primary"
              >
                <Menu className="w-6 h-6" />
              </Button>
              
              <div className="relative hidden md:block max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Поиск по системе..."
                  className="pl-9 h-9 w-[300px] bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
