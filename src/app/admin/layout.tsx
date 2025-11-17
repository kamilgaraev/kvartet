'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
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
  Search
} from 'lucide-react'
import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Заявки', href: '/admin/leads', icon: MessageSquare },
  { name: 'Услуги', href: '/admin/services', icon: FileText },
  { name: 'Портфолио', href: '/admin/portfolio', icon: Image },
  { name: 'Блог', href: '/admin/blog', icon: FileText },
  { name: 'Пользователи', href: '/admin/users', icon: Users },
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
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
    <>
      <div className="flex items-center justify-between h-16 px-6 bg-gradient-primary">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-lg">K</span>
          </div>
          <span className="text-white font-bold text-lg">Квартет Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 mt-8 px-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'bg-primary-10 text-gray-900 border border-primary/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={`mr-3 w-5 h-5 transition-colors ${
                  isActive ? 'text-accent' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 w-1 h-8 bg-gradient-primary rounded-r-lg"
                />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <img
               src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}&background=376E6F&color=fff`}
              alt={session?.user?.name || 'User'}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </button>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </motion.div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white shadow-lg">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
      >
        <div className="flex-1 flex flex-col min-h-0">
          <SidebarContent />
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                 className="lg:hidden text-gray-500 hover:text-primary"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Поиск..."
                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                 <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                 src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}&background=376E6F&color=fff`}
                  alt={session?.user?.name || 'User'}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 