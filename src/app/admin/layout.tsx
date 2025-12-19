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
  Briefcase,
  ChevronRight
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 relative overflow-hidden">
      {/* Abstract Background Pattern with green accent */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="flex items-center h-20 px-6 border-b border-slate-800/50 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-[#2a5859] rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 ring-1 ring-white/10">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-tight leading-none">Kvartett</span>
            <span className="text-xs text-slate-500 font-medium tracking-wider">ADMIN PANEL</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto z-10 custom-scrollbar">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-2">Основное</p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden ${
                isActive
                  ? 'text-white shadow-lg shadow-accent/10 border border-accent/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-accent to-[#2a5859] opacity-100"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon
                className={`relative z-10 mr-3 w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-white group-hover:scale-110'
                }`}
              />
              <span className="relative z-10">{item.name}</span>
              {isActive && <ChevronRight className="relative z-10 ml-auto w-4 h-4 text-white/50" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 z-10 bg-slate-900/50 backdrop-blur-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-slate-800 transition-colors text-left group">
              <Avatar className="h-10 w-10 border-2 border-slate-700 group-hover:border-primary transition-colors">
                <AvatarImage src={session?.user?.image || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                  {session?.user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">
                  {session?.user?.name || 'Администратор'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {session?.user?.email}
                </p>
              </div>
              <Settings className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} className="text-red-600 cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            className="fixed inset-0 z-40 lg:hidden bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 shadow-2xl shadow-slate-200 z-30">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 shadow-2xl"
      >
        <div className="absolute top-4 right-4 lg:hidden z-20">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <SidebarContent />
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
        {/* Top header */}
        <header className={`sticky top-0 z-20 transition-all duration-200 ${scrolled ? 'bg-white/70 backdrop-blur-xl shadow-sm' : 'bg-transparent backdrop-blur-sm'}`}>
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden -ml-2 text-gray-500 hover:text-accent"
              >
                <Menu className="w-6 h-6" />
              </Button>
              
              <div className="hidden md:flex items-center text-sm text-muted-foreground">
                <span className="hover:text-accent transition-colors cursor-pointer">Admin</span>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-medium text-gray-900">{navigation.find(n => n.href === pathname)?.name || 'Dashboard'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-accent transition-colors" />
                <Input
                  type="text"
                  placeholder="Поиск..."
                  className="pl-10 h-10 w-[200px] lg:w-[300px] bg-white/80 border-gray-200 shadow-sm focus:border-accent/30 hover:bg-white transition-all focus:w-[320px] focus:shadow-md focus:ring-accent/20"
                />
              </div>

              <div className="w-px h-6 bg-gray-200/50 mx-2 hidden md:block"></div>

              <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-white/80 hover:text-accent rounded-full transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
