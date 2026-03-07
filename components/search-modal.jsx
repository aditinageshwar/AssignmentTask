'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNewsStore } from '@/lib/store'
import { mockArticles, trendingTopics } from '@/lib/mock-data'

export function SearchModal() {
  const router = useRouter()
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useNewsStore()
  const [localQuery, setLocalQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(localQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [localQuery])

  // Filter results
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    const query = debouncedQuery.toLowerCase()
    return mockArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query))
    ).slice(0, 5)
  }, [debouncedQuery])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(!isSearchOpen)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, setIsSearchOpen])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setIsSearchOpen(false)
    router.push(`/?search=${encodeURIComponent(query)}`)
  }

  const handleArticleClick = (articleId) => {
    setIsSearchOpen(false)
    router.push(`/article/${articleId}`)
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="glass rounded-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or categories..."
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && localQuery.trim()) {
                      handleSearch(localQuery)
                    }
                  }}
                  className="border-0 bg-transparent focus-visible:ring-0 text-lg"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {/* Search Results */}
                {results.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Results
                    </h3>
                    <div className="space-y-2">
                      {results.map((article) => (
                        <button
                          key={article.id}
                          onClick={() => handleArticleClick(article.id)}
                          className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">
                              {article.title}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {article.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Topics */}
                {!debouncedQuery && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Trending Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trendingTopics.map((topic) => (
                          <Badge
                            key={topic}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => handleSearch(topic)}
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Searches
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        No recent searches
                      </div>
                    </div>
                  </>
                )}

                {/* No Results */}
                {debouncedQuery && results.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No results found for "{debouncedQuery}"
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try searching for something else
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px]">Enter</kbd>
                    to search
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px]">Esc</kbd>
                    to close
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px]">Cmd</kbd>
                  <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px]">K</kbd>
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
