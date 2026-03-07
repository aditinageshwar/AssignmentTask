'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Bookmark, BookmarkCheck, Share2, Zap, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNewsStore } from '@/lib/store'
import { formatDistanceToNow } from '@/lib/date-utils'

export function NewsCard({ article, variant = 'default', index = 0 }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const { toggleBookmark, isBookmarked, isAuthenticated, setIsAuthModalOpen } = useNewsStore()
  const bookmarked = isBookmarked(article.id)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = (y - centerY) / 20
    const rotateYValue = (centerX - x) / 20
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      setIsAuthModalOpen(true)
      return
    }
    toggleBookmark(article.id)
  }

  const handleShare = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.description,
        url: `/article/${article.id}`,
      })
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

  if (variant === 'featured') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="card-3d"
      >
        <Link href={`/article/${article.id}`}>
          <article className="glass-card rounded-2xl overflow-hidden group cursor-pointer h-full">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                {article.isBreaking && (
                  <Badge className="bg-red-500 text-white border-none flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Breaking
                  </Badge>
                )}
                {article.isLive && (
                  <Badge className="bg-red-500 text-white border-none flex items-center gap-1 animate-pulse">
                    <Radio className="h-3 w-3" />
                    Live
                  </Badge>
                )}
                <Badge className={`border ${categoryColors[article.category]}`}>
                  {article.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 text-balance">
                  {article.title}
                </h2>
                <p className="text-white/80 text-sm line-clamp-2 mb-3">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <span>{article.source}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min read
                  </span>
                  <span>{formatDistanceToNow(article.publishedAt)}</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>
    )
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Link href={`/article/${article.id}`}>
          <article className="group flex gap-3 py-3 border-b border-border last:border-0 hover:bg-secondary/30 px-2 -mx-2 rounded-lg transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {article.isLive && (
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {article.category}
                </Badge>
              </div>
              <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(article.publishedAt)}
              </p>
            </div>
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </article>
        </Link>
      </motion.div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="card-3d"
      >
        <Link href={`/article/${article.id}`}>
          <article className="glass-card rounded-xl overflow-hidden group cursor-pointer flex">
            <div className="relative w-48 flex-shrink-0">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`border text-xs ${categoryColors[article.category]}`}>
                    {article.category}
                  </Badge>
                </div>
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{article.source}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className="h-8 w-8"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="card-3d h-full"
    >
      <Link href={`/article/${article.id}`}>
        <article className="glass-card rounded-xl overflow-hidden group cursor-pointer h-full flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              {article.isBreaking && (
                <Badge className="bg-red-500 text-white border-none flex items-center gap-1 text-xs">
                  <Zap className="h-3 w-3" />
                  Breaking
                </Badge>
              )}
              {article.isLive && (
                <Badge className="bg-red-500 text-white border-none flex items-center gap-1 text-xs animate-pulse">
                  <Radio className="h-3 w-3" />
                  Live
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white h-8 w-8"
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <Badge className={`border w-fit mb-2 text-xs ${categoryColors[article.category]}`}>
              {article.category}
            </Badge>
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2 flex-1">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
              <span>{article.source}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
              <span>{formatDistanceToNow(article.publishedAt)}</span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
