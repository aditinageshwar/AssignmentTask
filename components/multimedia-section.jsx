'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const videos = [
  {
    id: '1',
    title: 'Inside the AI Labs: How GPT-5 Was Built',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop',
    duration: '12:34',
    views: '1.2M',
  },
  {
    id: '2',
    title: 'Artemis III: The Journey to the Moon',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format&fit=crop',
    duration: '8:45',
    views: '856K',
  },
  {
    id: '3',
    title: 'Champions League Preview: City vs Madrid',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop',
    duration: '5:22',
    views: '2.1M',
  },
  {
    id: '4',
    title: 'The Future of Electric Vehicles',
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&auto=format&fit=crop',
    duration: '15:10',
    views: '543K',
  },
]

const photos = [
  {
    id: '1',
    title: 'Breaking: Global Climate Summit',
    src: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Tech Innovation Awards 2024',
    src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Space Exploration Milestones',
    src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'World Economic Forum',
    src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Medical Research Breakthroughs',
    src: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&auto=format&fit=crop',
  },
]

export function MultimediaSection() {
  const [currentVideo, setCurrentVideo] = useState(0)

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Video Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Play className="h-4 w-4 text-red-400" />
              </div>
              <h2 className="text-lg font-semibold">Video</h2>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={prevVideo} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextVideo} className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Featured Video */}
          <div className="glass-card rounded-xl overflow-hidden mb-4 group cursor-pointer">
            <div className="relative aspect-video">
              <Image
                src={videos[currentVideo].thumbnail}
                alt={videos[currentVideo].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="h-8 w-8 text-black ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white">
                {videos[currentVideo].duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {videos[currentVideo].title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {videos[currentVideo].views} views
              </p>
            </div>
          </div>

          {/* Video Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setCurrentVideo(index)}
                className={`relative aspect-video rounded-lg overflow-hidden ${
                  index === currentVideo ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <ImageIcon className="h-4 w-4 text-accent" />
            </div>
            <h2 className="text-lg font-semibold">Photo Gallery</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Large featured photo */}
            <Link href="#" className="col-span-2 glass-card rounded-xl overflow-hidden group">
              <div className="relative aspect-[2/1]">
                <Image
                  src={photos[0].src}
                  alt={photos[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium">{photos[0].title}</p>
                </div>
              </div>
            </Link>

            {/* Smaller photos */}
            {photos.slice(1).map((photo) => (
              <Link key={photo.id} href="#" className="glass-card rounded-lg overflow-hidden group">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
