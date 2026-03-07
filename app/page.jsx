'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { CategorySection } from '@/components/category-section'
import { CategoryFilter } from '@/components/category-filter'
import { MultimediaSection } from '@/components/multimedia-section'
import { NewsCard } from '@/components/news-card'
import { ReadingProgress } from '@/components/reading-progress'
import { HeroSkeleton, CategorySectionSkeleton } from '@/components/skeleton-loader'
import { mockArticles } from '@/lib/mock-data'

function HomeContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchQuery = searchParams.get('search')

  const filteredArticles = useMemo(() => {
    let articles = [...mockArticles]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    if (categoryParam && categoryParam !== 'all') {
      articles = articles.filter((article) => article.category === categoryParam)
    }

    return articles
  }, [categoryParam, searchQuery])

  const featuredArticle = filteredArticles.find((a) => a.isBreaking) || filteredArticles[0]
  const trendingArticles = filteredArticles.slice(1, 6)

  const techArticles = mockArticles.filter((a) => a.category === 'technology')
  const businessArticles = mockArticles.filter((a) => a.category === 'business')
  const scienceArticles = mockArticles.filter((a) => a.category === 'science')
  const sportsArticles = mockArticles.filter((a) => a.category === 'sports')
  const entertainmentArticles = mockArticles.filter((a) => a.category === 'entertainment')

  const isFiltered = categoryParam || searchQuery

  return (
    <>
      {/* Category Filter */}
      <CategoryFilter />

      {/* Search Results Header */}
      {searchQuery && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Search results for "{searchQuery}"
          </h1>
          <p className="text-muted-foreground">
            {filteredArticles.length} articles found
          </p>
        </div>
      )}

      {/* Category Header */}
      {categoryParam && !searchQuery && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold capitalize">
            {categoryParam} News
          </h1>
          <p className="text-muted-foreground">
            Latest {categoryParam} stories and updates
          </p>
        </div>
      )}

      {isFiltered ? (
        // Filtered View - Grid of all matching articles
        <section className="mb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArticles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </section>
      ) : (
        // Default Home View
        <>
          {/* Hero Section */}
          {featuredArticle && (
            <HeroSection
              featuredArticle={featuredArticle}
              trendingArticles={trendingArticles}
            />
          )}

          {/* Technology Section */}
          {techArticles.length > 0 && (
            <CategorySection
              title="Technology"
              category="technology"
              articles={techArticles}
            />
          )}

          {/* Business Section */}
          {businessArticles.length > 0 && (
            <CategorySection
              title="Business"
              category="business"
              articles={businessArticles}
            />
          )}

          {/* Multimedia Section */}
          <MultimediaSection />

          {/* Science Section */}
          {scienceArticles.length > 0 && (
            <CategorySection
              title="Science"
              category="science"
              articles={scienceArticles}
            />
          )}

          {/* Sports Section */}
          {sportsArticles.length > 0 && (
            <CategorySection
              title="Sports"
              category="sports"
              articles={sportsArticles}
            />
          )}

          {/* Entertainment Section */}
          {entertainmentArticles.length > 0 && (
            <CategorySection
              title="Entertainment"
              category="entertainment"
              articles={entertainmentArticles}
            />
          )}
        </>
      )}
    </>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      
      <main className="container mx-auto px-4 pt-36 pb-8">
        <Suspense fallback={
          <div className="space-y-12">
            <HeroSkeleton />
            <CategorySectionSkeleton />
            <CategorySectionSkeleton />
          </div>
        }>
          <HomeContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
