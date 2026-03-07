'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Newspaper, Cpu, TrendingUp, FlaskConical, Trophy, Clapperboard, Landmark, Globe, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', name: 'All News', icon: Newspaper },
  { id: 'technology', name: 'Technology', icon: Cpu },
  { id: 'business', name: 'Business', icon: TrendingUp },
  { id: 'science', name: 'Science', icon: FlaskConical },
  { id: 'sports', name: 'Sports', icon: Trophy },
  { id: 'entertainment', name: 'Entertainment', icon: Clapperboard },
  { id: 'politics', name: 'Politics', icon: Landmark },
  { id: 'world', name: 'World', icon: Globe },
  { id: 'lifestyle', name: 'Lifestyle', icon: Heart },
]

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      router.push('/')
    } else {
      router.push(`/?category=${categoryId}`)
    }
  }

  return (
    <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 min-w-max"
      >
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-card hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}
