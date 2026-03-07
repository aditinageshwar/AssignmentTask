'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Bookmark, 
  LogOut,
  ChevronDown,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNewsStore } from '@/lib/store'
import { categories } from '@/lib/mock-data'
import { SearchModal } from './search-modal'
import { AuthModal } from './auth-modal'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { 
    isAuthenticated, 
    user, 
    logout,
    setIsSearchOpen,
    setIsAuthModalOpen,
    bookmarkedArticles
  } = useNewsStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainCategories = categories.slice(0, 6)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass py-3'
            : 'bg-transparent py-4'
        }`}
      >
        {/* Breaking News Ticker */}
        <div className="bg-primary/90 text-primary-foreground text-sm py-1.5 overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              BREAKING: AI Revolution continues with GPT-5 announcement
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              Markets rally as Fed signals potential rate cuts
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              NASA announces Artemis III crew for historic Moon mission
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              BREAKING: AI Revolution continues with GPT-5 announcement
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              Markets rally as Fed signals potential rate cuts
            </span>
          </motion.div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Pulse<span className="text-primary">News</span>
                <span className="text-accent text-sm ml-1">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainCategories.map((category) => (
                <Link
                  key={category.id}
                  href={category.id === 'all' ? '/' : `/?category=${category.id}`}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {category.name}
                </Link>
              ))}
              <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50 flex items-center gap-1">
                More
                <ChevronDown className="h-3 w-3" />
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link href="/bookmarks">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground relative"
                    >
                      <Bookmark className="h-5 w-5" />
                      {bookmarkedArticles.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center text-primary-foreground">
                          {bookmarkedArticles.length}
                        </span>
                      )}
                      <span className="sr-only">Bookmarks</span>
                    </Button>
                  </Link>
                  <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-medium text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={logout}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="sr-only">Logout</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass border-t border-border"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.id === 'all' ? '/' : `/?category=${category.id}`}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchModal />
      <AuthModal />
    </>
  )
}
