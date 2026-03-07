'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bookmark, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { ReadingProgress } from '@/components/reading-progress'
import { useNewsStore } from '@/lib/store'
import { mockArticles } from '@/lib/mock-data'

export default function BookmarksPage() {
  const { bookmarkedArticles, isAuthenticated } = useNewsStore()

  const bookmarked = useMemo(() => {
    return mockArticles.filter((article) =>
      bookmarkedArticles.includes(article.id)
    )
  }, [bookmarkedArticles])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <ReadingProgress />
        <Header />
        
        <main className="container mx-auto px-4 pt-36 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Bookmark className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Sign in to view bookmarks</h1>
            <p className="text-muted-foreground mb-6">
              Create an account or sign in to save articles and access them from any device.
            </p>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      
      <main className="container mx-auto px-4 pt-36 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Your Bookmarks</h1>
              <p className="text-muted-foreground">
                {bookmarked.length} saved article{bookmarked.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {bookmarked.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarked.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <Bookmark className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
              <p className="text-muted-foreground mb-6">
                Save articles to read later by clicking the bookmark icon.
              </p>
              <Link href="/">
                <Button>
                  Browse Articles
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
