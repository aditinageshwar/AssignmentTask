'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Cpu, TrendingUp, FlaskConical, Trophy, Clapperboard, Landmark, Globe, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NewsCard } from './news-card'

const categoryIcons = {
  technology: Cpu,
  business: TrendingUp,
  science: FlaskConical,
  sports: Trophy,
  entertainment: Clapperboard,
  politics: Landmark,
  world: Globe,
  lifestyle: Heart,
}

const categoryColors = {
  technology: 'from-blue-500 to-blue-600',
  business: 'from-green-500 to-green-600',
  science: 'from-purple-500 to-purple-600',
  sports: 'from-orange-500 to-orange-600',
  entertainment: 'from-pink-500 to-pink-600',
  politics: 'from-red-500 to-red-600',
  world: 'from-cyan-500 to-cyan-600',
  lifestyle: 'from-amber-500 to-amber-600',
}

export function CategorySection({ title, category, articles, showViewAll = true }) {
  const Icon = categoryIcons[category] || Cpu
  const gradient = categoryColors[category] || 'from-primary to-accent'

  if (articles.length === 0) return null

  const featuredArticle = articles[0]
  const secondaryArticles = articles.slice(1, 5)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {showViewAll && (
          <Link href={`/?category=${category}`}>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground group">
              View All
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Featured article for this category */}
        <div className="lg:col-span-1">
          <NewsCard article={featuredArticle} index={0} />
        </div>

        {/* Secondary articles grid */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            {secondaryArticles.map((article, index) => (
              <NewsCard
                key={article.id}
                article={article}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
