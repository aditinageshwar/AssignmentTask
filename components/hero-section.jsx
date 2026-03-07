'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { NewsCard } from './news-card'

export function HeroSection({ featuredArticle, trendingArticles }) {
  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-6"
      >
        <Badge className="bg-primary/20 text-primary border-primary/30 flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Top Stories
        </Badge>
        <span className="text-sm text-muted-foreground">
          Updated moments ago
        </span>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Main Featured Article */}
        <div className="lg:col-span-3">
          <NewsCard article={featuredArticle} variant="featured" />
        </div>

        {/* Trending Sidebar */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl p-4 h-full">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <TrendingUp className="h-4 w-4 text-accent" />
              <h2 className="font-semibold">Trending Now</h2>
            </div>
            <div className="space-y-1">
              {trendingArticles.map((article, index) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="compact"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
