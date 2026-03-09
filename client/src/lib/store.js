import { create } from 'zustand';

export const useStore = create((set) => ({
  // Auth state
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  // Articles state
  articles: [],
  selectedArticle: null,
  categories: [],
  activeCategory: null,
  searchQuery: '',

  // Bookmarks state
  bookmarks: [],
  bookmarkedArticleIds: new Set(),

  // Actions
  setUser: (user, token) => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    set({ user, token });
  },

  setArticles: (articles) => set({ articles }),
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  setCategories: (categories) => set({ categories }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setBookmarks: (bookmarks) => set({ 
    bookmarks,
    bookmarkedArticleIds: new Set(bookmarks.map(b => b._id))
  }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Helper methods
  toggleBookmark: (articleId) => set((state) => {
    const newIds = new Set(state.bookmarkedArticleIds);
    if (newIds.has(articleId)) {
      newIds.delete(articleId);
    } else {
      newIds.add(articleId);
    }
    return { bookmarkedArticleIds: newIds };
  }),

  isArticleBookmarked: (articleId) => {
    const state = useStore.getState();
    return state.bookmarkedArticleIds.has(articleId);
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      bookmarks: [],
      bookmarkedArticleIds: new Set(),
      selectedArticle: null,
      searchQuery: '',
      activeCategory: null
    });
  }
}));
