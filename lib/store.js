import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useNewsStore = create(
  persist(
    (set, get) => ({
      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Categories
      activeCategory: 'all',
      setActiveCategory: (category) => set({ activeCategory: category }),
      
      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, bookmarkedArticles: [] }),
      
      // Bookmarks
      bookmarkedArticles: [],
      toggleBookmark: (articleId) => {
        const { bookmarkedArticles } = get()
        if (bookmarkedArticles.includes(articleId)) {
          set({ bookmarkedArticles: bookmarkedArticles.filter(id => id !== articleId) })
        } else {
          set({ bookmarkedArticles: [...bookmarkedArticles, articleId] })
        }
      },
      isBookmarked: (articleId) => get().bookmarkedArticles.includes(articleId),
      
      // Reading Progress
      readingProgress: 0,
      setReadingProgress: (progress) => set({ readingProgress: progress }),
      
      // UI State
      isSearchOpen: false,
      setIsSearchOpen: (open) => set({ isSearchOpen: open }),
      isAuthModalOpen: false,
      setIsAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      authMode: 'login',
      setAuthMode: (mode) => set({ authMode: mode }),
    }),
    {
      name: 'pulsenews-storage',
      partialize: (state) => ({
        bookmarkedArticles: state.bookmarkedArticles,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
