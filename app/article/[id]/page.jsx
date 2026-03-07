'use client'

import { use, useMemo } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { ReadingProgress } from '@/components/reading-progress'
import { useNewsStore } from '@/lib/store'
import { mockArticles } from '@/lib/mock-data'
import { formatDate, formatTime } from '@/lib/date-utils'

export default function ArticlePage({ params }) {
  const { id } = use(params)
  const { toggleBookmark, isBookmarked, isAuthenticated, setIsAuthModalOpen } = useNewsStore()

  const article = mockArticles.find((a) => a.id === id)
  const bookmarked = article ? isBookmarked(article.id) : false

  const relatedArticles = useMemo(() => {
    if (!article) return []
    return mockArticles
      .filter((a) => a.category === article.category && a.id !== article.id)
      .slice(0, 4)
  }, [article])

  if (!article) {
    notFound()
  }

  const handleBookmark = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true)
      return
    }
    toggleBookmark(article.id)
  }

  const handleShare = async (platform) => {
    const url = window.location.href
    const title = article.title

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'copy') {
      await navigator.clipboard.writeText(url)
    } else if (navigator.share) {
      await navigator.share({ title, url })
    }
  }

  const categoryColors = {
    technology: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    business: 'bg-green-500/20 text-green-400 border-green-500/30',
    science: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    sports: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    entertainment: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    politics: 'bg-red-500/20 text-red-400 border-red-500/30',
    world: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    lifestyle: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  }

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      
      <main className="pt-36 pb-8">
        <article className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Button>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Category & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className={`border ${categoryColors[article.category]}`}>
                    {article.category}
                  </Badge>
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance leading-tight">
                  {article.title}
                </h1>

                {/* Description */}
                <p className="text-xl text-muted-foreground mb-6">
                  {article.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime} min read
                  </span>
                  <span className="text-foreground font-medium">
                    {article.source}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mb-8">
                  <Button
                    variant="outline"
                    onClick={handleBookmark}
                    className="gap-2"
                  >
                    {bookmarked ? (
                      <>
                        <BookmarkCheck className="h-4 w-4 text-primary" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare()}
                    className="gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Article Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-foreground/90 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <Separator className="my-8" />

                {/* Share Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Share this article</h3>
                    <p className="text-sm text-muted-foreground">
                      Spread the news with your network
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('twitter')}
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('facebook')}
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('linkedin')}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('copy')}
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Comments Placeholder */}
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="h-5 w-5" />
                    <h3 className="font-semibold">Comments</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Comments are currently disabled. Check back later for updates.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-36"
              >
                {/* Related Articles */}
                <div className="glass-card rounded-xl p-4">
                  <h3 className="font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle, index) => (
                      <NewsCard
                        key={relatedArticle.id}
                        article={relatedArticle}
                        variant="compact"
                        index={index}
                      />
                    ))}
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="glass-card rounded-xl p-4 mt-6">
                  <h3 className="font-semibold mb-2">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest news delivered to your inbox daily.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Subscribe to Newsletter
                  </Button>
                </div>
              </motion.div>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
