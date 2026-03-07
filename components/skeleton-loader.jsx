'use client'

export function NewsCardSkeleton({ variant = 'default' }) {
  if (variant === 'featured') {
    return (
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="relative aspect-[16/9] skeleton" />
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-3 py-3 border-b border-border last:border-0">
        <div className="flex-1">
          <div className="h-3 w-16 skeleton rounded mb-2" />
          <div className="h-4 w-full skeleton rounded mb-1" />
          <div className="h-4 w-3/4 skeleton rounded mb-2" />
          <div className="h-3 w-20 skeleton rounded" />
        </div>
        <div className="w-16 h-16 skeleton rounded-lg flex-shrink-0" />
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-4">
        <div className="h-4 w-20 skeleton rounded mb-3" />
        <div className="h-5 w-full skeleton rounded mb-2" />
        <div className="h-5 w-4/5 skeleton rounded mb-4" />
        <div className="flex gap-3">
          <div className="h-3 w-16 skeleton rounded" />
          <div className="h-3 w-16 skeleton rounded" />
          <div className="h-3 w-16 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="aspect-[16/9] skeleton" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-border last:border-0">
            <div className="flex-1">
              <div className="h-3 w-16 skeleton rounded mb-2" />
              <div className="h-4 w-full skeleton rounded mb-1" />
              <div className="h-4 w-3/4 skeleton rounded" />
            </div>
            <div className="w-16 h-16 skeleton rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CategorySectionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 skeleton rounded" />
        <div className="h-8 w-20 skeleton rounded" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card rounded-xl overflow-hidden">
            <div className="aspect-[16/10] skeleton" />
            <div className="p-4">
              <div className="h-4 w-20 skeleton rounded mb-3" />
              <div className="h-5 w-full skeleton rounded mb-2" />
              <div className="h-5 w-4/5 skeleton rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
